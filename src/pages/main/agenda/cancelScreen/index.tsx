import React, { useContext, useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import { styles } from './style';
import CustomButton from '../../../../components/customButton';
import Checkbox from '../../../../components/checkbox/checkbox';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import colors from '../../../../configs/theme';
import { ScheduleContext } from 'context/scheduleContext';
export default function ScheduleCancelScreen({ navigation }: any) {
    const {cancelSchedule, schedule} = useContext(ScheduleContext)!;
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>

                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={"#fff"} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5" }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Cancelar agendamento</Text>
            </View>

            <Text style={styles.label}> Por favor selecione o motivo do cancelamento</Text>

            <View style={styles.optionsContainer}>
                <View style={styles.options}>
                    <Checkbox /><Text>Mudanças de plano</Text>
                </View>

                <View style={styles.options}>
                    <Checkbox /><Text>Condições climáticas</Text>
                </View>
                <View style={styles.options}>
                    <Checkbox /><Text>Atraso devido ao trânsito</Text>
                </View>
                <View style={styles.options}>
                    <Checkbox  /><Text>Falta de dinheiro </Text>
                </View>
                <View style={styles.options}>
                    <Checkbox /><Text>Possuo uma opção alternativa</Text>
                </View>
                <View style={styles.options}>
                    <Checkbox /><Text>Outro</Text>
                </View>


            </View>

            <View style={styles.others}>
                <Text style={styles.label2}>
        Outro
                </Text>
                <TextInput placeholder='Escreva seu motivo' style={styles.textInput}>

                </TextInput>
            </View>
            {/* TODO: Criar tela de confirmar cancelamento */}
            <View style={styles.Tab}>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('ScheduleCancelConclusion'); cancelSchedule(schedule); console.log("Agendamento cancelado: ", schedule.id)}}
                    style={styles.TabBarButton}>
                    <Text style={{ color: "#fff" }}>Concluir</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};