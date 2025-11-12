
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
    ScrollViewProps,
    Image
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors, { font } from '../../../../../configs/theme'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services/services';
import SalaoEspecialistas from '../../Especialistas/salaoEspecialistas';
import Rating from '../../Avaliacoes';
import ProfessionalCard from '../../../../../components/Salao/EspecialistaScreen';
import { SalonContext, Services } from '../../../../../context/salonContext';
import { ScheduleContext, ScheduleParams } from 'context/scheduleContext';
import TabBarButton from 'components/TabBar';
import CustomButton from 'components/customButton';
import { AuthContext } from 'context/auth';
import { Specialist } from "context/salonContext"
import { formatCurrency } from 'configs/utils';
import { useAlert } from 'context/alertContext';

const scrollProps = {
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    snapToInterval: 110,
}
export default function Scheduling({ navigation, route }: any) {
    // Contexts
    const { salon, loading, specialistList, promoList } = useContext(SalonContext)!;
    const { user } = useContext(AuthContext)!;
    const { cancelSchedule, confirmActions } = useContext(ScheduleContext)!;
    const alert = useAlert().showAlert;
    const { specialist: selectedFromInfo, service } = route.params || {};

    // States
    const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(
        selectedFromInfo || null
    );
    const [selectedService, setSelectedService] = useState<Services["types"][0] | null>(
        service || null
    );
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const [finalScheduleValue, setFinalScheduleValue] = useState<any>();

    const [selectedSchedule, setSelectedSchedule] = useState<Partial<ScheduleParams> | null>({
        salonName: salon?.name || "undefined",
        salonId: salon?.id || "undefined",
        userId: user?.id || "undefined",
        userName: user?.name || "undefined",
        address: salon?.addres || "undefined",
        status: "active",
        specialist: selectedSpecialist || undefined,
    });

    // Derived values
    const serviceDuration = selectedService?.itemDuration
        ? parseInt(selectedService?.itemDuration)
        : 20; // padrão 20 min se nada vier
    const start = (salon?.opHour).split("-")[0] || "08:00";
    const end = (salon?.opHour).split("-")[1] || "18:00";
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;
    const interval = serviceDuration;
    const HourItems: any = [];
    const now = new Date();
    const currentTotal = now.getHours() * 60 + now.getMinutes();
    console.log("[Service]", selectedService);

    // Effects
    useEffect(() => {
        try {

            if (!selectedService) return;
            setSelectedSchedule(prev => ({
                ...prev,
                service: {
                    ...selectedService,
                    itemPrice: finalScheduleValue,
                }
            }) as any);
        } catch (er) {
            console.error(er)
        }
    }, [selectedService]);

    // 1️⃣ Adicione um novo useEffect para recalcular o preço final sempre que o serviço mudar
    useEffect(() => {

        try {


            if (!selectedService) return;

            // Função interna que aplica as promoções
            const calcPromoValue = (price: any, serviceName: string) => {
                let finalPrice = parseFloat(price);
                const applicablePromos = promoList.filter(
                    (promo) => promo.aplicableTo === "all" || promo.service === serviceName
                );

                applicablePromos.forEach((promo) => {
                    const promoValue = parseFloat(promo.valor);
                    const isPercent = promo.tipoValor === "porcentagem";

                    if (isPercent) {
                        finalPrice -= finalPrice * (promoValue / 100);
                    } else {
                        finalPrice -= promoValue;
                    }

                    if (finalPrice < 0) finalPrice = 0;
                });

                return finalPrice;
            };

            // 2️⃣ Calcula o preço com desconto
            const discountedValue = calcPromoValue(selectedService.itemPrice, selectedService.itemName);

            // 3️⃣ Atualiza o estado do valor final
            setFinalScheduleValue(discountedValue);

            // 4️⃣ Atualiza também o agendamento com o valor final já descontado
            setSelectedSchedule((prev) =>
                prev
                    ? {
                        ...prev,
                        service: {
                            ...selectedService,
                            itemPrice: discountedValue,
                        },
                    } as any
                    : null
            );
        } catch (er) {
            console.error(er)
        }
    }, [selectedService, promoList]);



    const today = new Date();
    const isTodaySelected = selectedDay === 0;
    for (let t = startTotal; t <= endTotal; t += interval) {
        if (isTodaySelected) {
            const currentTotal = today.getHours() * 60 + today.getMinutes();
            if (t < currentTotal) continue;
        } // pula horários já passados
        const hours = Math.floor(t / 60);
        const minutes = t % 60;
        const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        const isSelected = selectedTime === formattedTime;
        HourItems.push({
            id: `HI-${t}`,
            content:
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setSelectedTime(formattedTime);
                        setSelectedSchedule((prev) => prev && ({
                            ...prev,
                            time: `${formattedTime}`, // salva o dia formatado
                        }));
                    }} // seleciona o horário
                    style={[
                        styles.cards,
                        {
                            backgroundColor: isSelected ? colors.primary : "#FFF",
                            borderColor: isSelected ? "#c16765ff" : colors.transparentLightGray,
                            borderWidth: 2,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.cardsText,
                            { color: isSelected ? "#FFF" : "#000" }, // texto branco se selecionado
                        ]}
                    >
                        {formattedTime}
                    </Text>
                </TouchableOpacity>
        }
        )
    }
    const DayItems: any[] = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const day = date.getDate();
        const month = date.toLocaleString("pt-BR", { month: "short" }); // "out", "nov", etc
        const weekDay = date.toLocaleString("pt-BR", { weekday: "short" }); // seg, ter, dom...
        const isSelected = selectedDay === i;

        const workSchedule = salon?.workSchedule || "1-5";
        const weekDayNumber = date.getDay();
        const [startDay, endDay] = workSchedule.split("-").map(Number);

        let isDisabled = false;

        if (startDay === endDay) {
            isDisabled = false;
        } else if (startDay < endDay) {
            // Horário contínuo normal (ex: 1-5)
            isDisabled = weekDayNumber < startDay || weekDayNumber > endDay;
        } else {
            // Wrap-around (ex: 5-1)
            isDisabled = weekDayNumber < startDay && weekDayNumber > endDay; // caso wrap-around, ex: 5-1
        }
        DayItems.push({
            id: `DI-${i}`,
            content: (
                <TouchableOpacity
                    disabled={isDisabled} // desabilita domingos
                    key={`DI-${i}`}
                    activeOpacity={0.8}
                    onPress={() => {
                        setSelectedDay(i);
                        setSelectedSchedule((prev) => prev && ({
                            ...prev,
                            date: `${date.getMonth() + day}|${weekDay} ${day} de ${month}`, // salva o dia formatado
                        }));
                    }}
                    style={[
                        styles.cards,
                        {
                            backgroundColor: isDisabled
                                ? "#949494ff" // cinza (indisponível)
                                : isSelected ? colors.primary : "#FFF",
                            borderColor: isSelected ? "#c16765ff" : colors.transparentLightGray,
                            borderWidth: 2,
                        },
                    ]}
                >
                    <Text style={[
                        styles.cardsText,
                        {
                            color: isDisabled
                                ? "#ffffffff"
                                : isSelected ? "#FFF" : "#000"
                        },
                    ]}>
                        {weekDay}
                    </Text>
                    <Text
                        style={[
                            styles.cardsText,
                            {
                                color: isDisabled
                                    ? "#ffffffff"
                                    : isSelected ? "#FFF" : "#000"
                            },
                        ]}
                    >
                        {day} de {month}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }

    const selectSpecialist = (specialist: Specialist) => {
        const specialistObject = {
            ...specialist
        }
        setSelectedSpecialist(specialistObject);
        setSelectedSchedule((prev) => prev && ({
            ...prev,
            specialist: specialistObject as any
        }))
    }
    const calcPromo = (price: any, serviceName: string) => {
        const isInPromo = promoList.some((promo) => promo.aplicableTo == "all" || promo.service == serviceName)
        try {
            if (!isInPromo) return formatCurrency(price);
            let finalPrice = parseFloat(price);
            const applicablePromos = promoList.filter(
                (promo) => promo.aplicableTo === "all" || promo.service === serviceName
            );

            // Aplicar cada promoção em sequência
            applicablePromos.forEach((promo) => {
                const promoValue = parseFloat(promo.valor);
                const isPercent = promo.tipoValor === "porcentagem";

                if (isPercent) {
                    finalPrice -= finalPrice * (promoValue / 100);
                } else {
                    finalPrice -= promoValue;
                }

                // Evitar preço negativo
                if (finalPrice < 0) finalPrice = 0;
            });

            return formatCurrency(finalPrice);

        } catch (error) {
            console.error("Erro ao calcular promoção:", error);
            return formatCurrency(price);
        }
    };
    const handleConfirm = () => {
        if (!selectedSchedule || !selectedService || !selectedDay || !selectedTime || !selectedSpecialist) {
            alert("Preeencha todos os campos.", "success")
            return;
        }
        confirmActions(selectedSchedule as any);
        navigation.navigate("ScheduleFinal")
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Imagem principal */}
            <View style={styles.SalaoImagem}>
                <Image source={{ uri: salon?.image }} style={{ width: "100%", height: "100%" }} />
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                    border='Circle'
                    type='absolute'
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                    onPress={() => (navigation.goBack())}
                />

            </View>

            <View style={styles.modalContainer}>
                <View style={styles.SalaoInfoText}>
                    <Text style={styles.SalaoNome}>
                        {salon?.name}
                    </Text>
                    <Text style={styles.SalaoSubTitle}>{salon?.description}</Text>
                </View>
                <View style={styles.SalaoLocContainer}>
                    <View style={styles.SalaoLocText}>
                        <MaterialIcons name='location-on' size={20} color={colors.primary} />
                        <Text> {salon?.addres}</Text>
                    </View>
                    <View style={styles.SalaoLocText}>
                        <FontAwesome5 name='clock' size={20} color={colors.primary} />
                        <Text>30 min  3.8km*Sab Dom | Opera entre {salon?.opHour}</Text>
                    </View>
                </View>

            </View>








            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.subTitle}>Agendamento</Text>
                {selectedService && (
                    <TouchableOpacity key={selectedService.itemId}
                        style={{ padding: 20, backgroundColor: "white", margin: 5, outlineColor: colors.primary, outlineWidth: 1 }}
                        onPress={() => setSelectedService(null)}
                    >
                        <Text style={{ fontSize: 18, fontFamily: font.poppins.bold }}>{selectedService.itemName}</Text>
                        <Text>{selectedService.itemDescription}</Text>
                        {(() => {
                            const originalPrice = formatCurrency(selectedService.itemPrice);
                            const finalPrice = calcPromo(selectedService.itemPrice, selectedService.itemName);
                            const hasDiscount = originalPrice !== finalPrice;

                            return (
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    {hasDiscount && (
                                        <Text
                                            style={{
                                                textDecorationLine: "line-through",
                                                color: colors.lightGray,
                                                fontFamily: font.poppins.medium,
                                                fontSize: 14,
                                            }}
                                        >
                                            {originalPrice}
                                        </Text>
                                    )}
                                    <Text
                                        style={{
                                            color: colors.primary,
                                            fontFamily: font.poppins.bold,
                                            fontSize: 16,
                                        }}
                                    >
                                        {finalPrice}
                                    </Text>
                                </View>
                            );
                        })()}
                        <Text>Duração: {selectedService.itemDuration} Minutos</Text>
                    </TouchableOpacity>
                )}

                {selectedSpecialist && selectedService && (
                    <>

                        <View>
                            <Text style={styles.title}>Dia</Text>

                            <ScrollView
                                {...scrollProps}
                                style={{
                                }}
                                contentContainerStyle={{ gap: 10, paddingRight: 20, paddingLeft: 20 }}>
                                {/* conteudos */}
                                {DayItems.map((item: any) => (
                                    <View key={item.id}>
                                        {item.content}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={styles.title}>Horario</Text>
                            <ScrollView
                                {...scrollProps}
                                contentContainerStyle={{ gap: 10, paddingRight: 20, paddingLeft: 20 }}
                            >
                                {HourItems.map((item: any) => (
                                    <View key={item.id}>
                                        {item.content}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                    </>
                )}

                {selectedSpecialist && !selectedService &&
                    <View>
                        {selectedSpecialist?.services.map((item, index) => (
                            <TouchableOpacity key={item.itemId}
                                style={{ padding: 20, backgroundColor: "white", margin: 5 }}
                                onPress={() => setSelectedService(item)}
                            >

                                <Text style={{ fontSize: 18, fontFamily: font.poppins.bold }}>{item.itemName}</Text>
                                <Text>{item.itemDescription}</Text>
                                {(() => {
                                    const originalPrice = formatCurrency(item.itemPrice);
                                    const finalPrice = calcPromo(item.itemPrice, item.itemName);
                                    const hasDiscount = originalPrice !== finalPrice;

                                    return (
                                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                            {hasDiscount && (
                                                <Text
                                                    style={{
                                                        textDecorationLine: "line-through",
                                                        color: colors.lightGray,
                                                        fontFamily: font.poppins.medium,
                                                        fontSize: 14,
                                                    }}
                                                >
                                                    {originalPrice}
                                                </Text>
                                            )}
                                            <Text
                                                style={{
                                                    color: colors.primary,
                                                    fontFamily: font.poppins.bold,
                                                    fontSize: 16,
                                                }}
                                            >
                                                {finalPrice}
                                            </Text>
                                        </View>
                                    );
                                })()}
                                <Text>Duração: {item.itemDuration} Minutos</Text>

                            </TouchableOpacity>
                        ))}
                    </View>
                }

                <View>
                    <Text style={styles.title}>Especialistas</Text>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 150
                    }}>
                        {specialistList.map((item, index) => (
                            <ProfessionalCard key={item.id}
                                containerStyle={{
                                    outlineWidth: selectedSpecialist?.id === specialistList[index].id ? 2 : 0,
                                    outlineColor: colors.primary,
                                }}
                                cardWidth={(Dimensions.get("window").width / 2) - 40}
                                name={item.name}
                                profession={item.profession}
                                userPhoto={item.image}

                                onPress={() => { selectSpecialist(specialistList[index] as any) }} />
                        ))}
                    </View>

                </View>



            </ScrollView>
            <TabBarButton title='Reservar horário' onPress={handleConfirm} />
        </SafeAreaView>



    )
}
