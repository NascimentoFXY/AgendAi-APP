import React, { useContext, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { styles } from './style';
import CustomButton from '../../../../components/customButton';
import Checkbox from '../../../../components/checkbox/checkbox';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../../../configs/theme';
import { ScheduleContext } from 'context/scheduleContext';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from 'services/firebase';

export default function ScheduleCancelScreen({ navigation }: any) {
    const { cancelSchedule, schedule } = useContext(ScheduleContext)!;

    const [cancelMotive, setCancelMotive] = useState<{ motivos: string[], outro?: string }>({
        motivos: [],
        outro: "",
    });

    // alterna motivos selecionados
    const toggleMotivo = (motivo: string) => {
        setCancelMotive(prev => {
            const jaExiste = prev.motivos.includes(motivo);
            const novosMotivos = jaExiste
                ? prev.motivos.filter(m => m !== motivo)
                : [...prev.motivos, motivo];
            return { ...prev, motivos: novosMotivos };
        });
    };

    const confirmHandler = async () => {
        try {
            const scheduleRef = doc(db, "salon", schedule.salonId, "schedules", schedule.id!);

            await updateDoc(scheduleRef, {
                status: "cancelado",
                cancelMotive: cancelMotive.motivos,
                cancelOutro: cancelMotive.outro || null,
                cancelAt: new Date(),
            });

            cancelSchedule(schedule, schedule.salonId);
            console.log("Agendamento cancelado:", schedule.id, cancelMotive);
            navigation.navigate('ScheduleCancelConclusion');
        } catch (err) {
            console.error("Erro ao cancelar agendamento:", err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color="#fff" />}
                    border='Circle'
                    width={50}
                    height={50}
                    style={{
                        zIndex: 3,
                        backgroundColor: colors.primary,
                        borderWidth: 1,
                        borderColor: "#c5c5c5",
                    }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Cancelar agendamento</Text>
            </View>

            <Text style={styles.label}>Por favor, selecione o motivo do cancelamento</Text>

            <View style={styles.optionsContainer}>
                {["mudanças de plano", "condições climáticas", "problemas de saúde", "compromisso inesperado", "outro"].map(
                    (motivo, index) => (
                        <View style={styles.options} key={index}>
                            <Checkbox
                                checked={cancelMotive.motivos.includes(motivo)}
                                onChange={() => toggleMotivo(motivo)}
                            />
                            <Text>{motivo}</Text>
                        </View>
                    )
                )}
            </View>

            {cancelMotive.motivos.includes("outro") && (
                <View style={styles.others}>
                    <Text style={styles.label2}>Outro</Text>
                    <TextInput
                        placeholder="Escreva seu motivo"
                        style={styles.textInput}
                        value={cancelMotive.outro}
                        onChangeText={text => setCancelMotive(prev => ({ ...prev, outro: text }))}
                    />
                </View>
            )}

            <View style={styles.Tab}>
                <TouchableOpacity onPress={confirmHandler} style={styles.TabBarButton}>
                    <Text style={{ color: "#fff" }}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
