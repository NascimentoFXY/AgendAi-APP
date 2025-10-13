
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
import colors from '../../../../../configs/theme'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import Rating from '../../Avaliacoes';
import ProfessionalCard from '../../../../../components/Salao/EspecialistaScreen';
import { SalonContext } from '../../../../../context/salonContext';
import { ScheduleContext, ScheduleParams } from 'context/scheduleContext';
import TabBarButton from 'components/TabBar';
import CustomButton from 'components/customButton';
import { AuthContext } from 'context/auth';

const scrollProps = {
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    snapToInterval: 110,
}

const especialistas: any = []
for (let i = 6; i < 20; i++) {
    especialistas.push({
        id: i + 1,
        content:
            <ProfessionalCard cardWidth={(Dimensions.get("window").width / 2) - 40} /> // Calcula a largura dos cards com base na largura da tela}/>
    })
}

export default function Scheduling({ navigation }: any) {
    const { salon, loading } = useContext(SalonContext)!
    const { user } = useContext(AuthContext)!
    const { cancelSchedule, confirmActions } = useContext(ScheduleContext)!
    const start = (salon?.opHour).split("-")[0] || "08:00";

    const end = (salon?.opHour).split("-")[1] || "18:00";


    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);
    // converte tudo pra minutos
    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;
    const interval = 20;
    const HourItems: any = []
    const now = new Date();
    const currentTotal = now.getHours() * 60 + now.getMinutes();
    console.log("currentTotla", currentTotal)


    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduleParams>({
        salonName: salon?.name || "undefined",
        salonId: salon?.id || "undefined",
        userId: user?.id || "undefined",
        userName: user?.name || "undefined",
        date: "undefined",
        time: selectedTime || "undefined",
        address: salon?.addres || "undefined",
        status: "active",

    });
    useEffect(() => {
        console.log("selectedSchedule", selectedSchedule)
    }, [selectedSchedule])

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
                        setSelectedSchedule((prev) => ({
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
                        setSelectedSchedule((prev) => ({
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
                        {especialistas.map((item: any) => (
                            <View key={item.id}>{item.content}</View>
                        ))}
                    </View>

                </View>

            </ScrollView>
            <TabBarButton title='Reservar horário' onPress={() => { confirmActions(selectedSchedule); navigation.navigate("ScheduleFinal") }} />
        </SafeAreaView>



    )
}
