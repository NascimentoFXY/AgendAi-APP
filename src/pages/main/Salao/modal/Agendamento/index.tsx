
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
    NativeScrollEvent,
    ScrollViewProps
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors from '../../../../../configs/colors'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import Rating from '../../Avaliacoes';
import ProfessionalCard from '../../../../../components/Salao/EspecialistaScreen';
import { SalonContext } from '../../../../../context/salonContext';

const scrollProps = {
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    snapToInterval: 110,
}
const DayItems: any = [];
for (let i = 0; i < 30; i++) {
    DayItems.push({
        id: `DI-${i + 1}`,
        content:
            <TouchableOpacity activeOpacity={0.8} style={styles.cards}>
                <Text style={styles.cardsText}>Dia</Text>
                <Text style={styles.cardsText}>{i + 1} de Jun</Text>
            </TouchableOpacity>
    }

    )
}
const HourItems: any = []
const parsedHour = (i: any) => {
    if (i < 10) return "0" + i;
    else return i;

}
for (let i = 6; i < 20; i++) {
    HourItems.push({
        id: `HI-${i - 5}`,
        content:
            <TouchableOpacity activeOpacity={0.8} style={styles.cards}>
                <Text style={styles.cardsText}>Horário</Text>
                <Text style={styles.cardsText}>{parsedHour(i)}:00</Text>
            </TouchableOpacity>
    }
    )
}
const especialistas: any = []
for (let i = 6; i < 20; i++) {
    especialistas.push({
        id: i + 1,
        content:
            <ProfessionalCard cardWidth={(Dimensions.get("window").width / 2) - 40} /> // Calcula a largura dos cards com base na largura da tela}/>
    })
}

export default function ScheduleModal() {

    const {salon, loading} = useContext(SalonContext)!

    return (
        <View style={styles.container}>

            <View style={styles.modalContainer}>
                <View style={styles.SalaoInfoText}>
                    <Text style={styles.SalaoNome}>
                        {salon?.name}
                    </Text>
                    <Text style={styles.SalaoSubTitle}>Cortes de Cabelo, Maquiagem, Massagem</Text>
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
        </View>



    )
}
