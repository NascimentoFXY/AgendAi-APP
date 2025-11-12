import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollViewProps
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';
import colors from '../../../../configs/theme';
import CustomButton from '../../../../components/customButton';
import { ScheduleContext } from 'context/scheduleContext';
import { capitalizeFirstLetter, formatCurrency } from 'configs/utils';
import { Cupon, useSalonContext } from 'context/salonContext';
import { collection, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { db } from 'services/firebase';
import { useAlert } from 'context/alertContext';

export default function ScheduleFinal({ navigation }: any) {
    try {
        const { createSchedule, scheduleData } = useContext(ScheduleContext)!
        const { SalonRef, salon } = useSalonContext()!
        const alert = useAlert();
        const [cupomCode, setCupomCode] = useState("");
        const [cupom, setCupom] = useState<Cupon>();
        const [finalPrice, setFinalPrice] = useState();

        useEffect(() => {
            if (!cupom) return;
            const calcPromo = () => {
                const isPercent = cupom.tipoValor === "porcentagem";
                const currentValue = parseFloat(scheduleData.service.itemPrice);
                const finalValue = isPercent ? currentValue - currentValue * (cupom.valor / 100) : currentValue - cupom.valor;
                setFinalPrice(finalValue as any)
            }
            calcPromo();
            console.log(finalPrice)
        }, [cupom]);
        const searchCupom = async (codigo: any) => {
            try {

                const cupomRef = collection(db, "salon", salon?.id!, "cupons")
                const q = query(cupomRef, where("codigo", "==", codigo));
                const querySnapshot = await getDocs(q)
                if (querySnapshot.empty) {
                    alert.showAlert("Nenhum cupom encontrado com esse código.", "success");
                    return null;
                }

                // Se existir, retorna o primeiro cupom encontrado
                const cupomData: Partial<Cupon> = querySnapshot.docs[0].data();
                console.log("Cupom encontrado:", cupomData);
                let tipoValor = cupomData.tipoValor == "porcentagem" ? "%" : "R$";
                setCupom(cupomData as any);

                alert.showAlert("Cupom de " + cupomData.valor + tipoValor + " Aplicado.", "success");
                return cupomData;
            } catch (er) {
                console.error("[Erro ao buscar cupom", er)
                return null;
            }
        };

        const handleConfirm = () => {
            let parsedData = {
                ...scheduleData
            }
            if(cupom && finalPrice){
                parsedData.service.itemPrice = finalPrice;
            }
            createSchedule(parsedData)
            navigation.navigate('ScheduleConclusion'); 
        }
        return (
            <View style={styles.container}>
                <View style={styles.TopCurve} />
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                    border='Circle'
                    type='absolute'
                    width={50}
                    height={50}
                    top={20}
                    left={20}
                    style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                    onPress={() => navigation.goBack()}
                />

                {/*----------------------- MAIN--------------------- */}
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Salão: </Text>
                            <Text style={styles.label2}>{scheduleData.salonName}</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Endereço: </Text>
                            <Text style={styles.label2} numberOfLines={2}>{`${(scheduleData.address)}`}</Text>

                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Data de Reserva: </Text>
                            <Text style={styles.label2}>{scheduleData.date.split("|")[1]}</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Horario de Reserva:</Text>
                            <Text style={styles.label2}> {scheduleData.time}</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Especialista: </Text>
                            <Text style={styles.label2}> {capitalizeFirstLetter(scheduleData.specialist.name)} </Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Serviço: </Text>
                            <Text style={styles.label2}> {capitalizeFirstLetter(scheduleData.service.itemName)} </Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Valor: </Text>
                            <Text style={styles.label2}> {finalPrice ? formatCurrency(finalPrice) : formatCurrency(scheduleData.service.itemPrice)} </Text>

                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Cupom de desconto: </Text>

                        </View>
                        <View style={styles.labelContainer}>
                            <TextInput placeholder='XXXXXXX' maxLength={7} style={{ borderBottomWidth: 1, width: "25%" }} value={cupomCode} onChangeText={setCupomCode} />
                            <TouchableOpacity style={styles.cupomBtn} onPress={() => searchCupom(cupomCode)}>
                                <Text style={styles.cupomBtnText}>Ativar Cupom</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={styles.Tab}>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        style={styles.TabBarButton}>
                        <Text style={{ color: "#fff" }}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    catch (er) {
        console.error(er)
    }
}