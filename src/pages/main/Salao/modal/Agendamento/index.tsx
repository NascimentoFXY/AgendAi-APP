
import React, { useRef, useState } from 'react';
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
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors from '../../../../../configs/colors'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import Rating from '../../Avaliacoes';
import ProfessionalCard from '../../../../../components/Salao/EspecialistaScreen';

const DayItems: any = [];
for (let i = 0; i < 30; i++) {
    DayItems.push(
        <View style={{ backgroundColor: colors.primary, width: 100, height: 70, borderRadius: 10 }}>
            <Text>Dia</Text>
            <Text>{i + 1} de Jun</Text>
        </View>
    )
}
const HourItems: any = []
const parsedHour = (i: any) => {
    if (i < 10) return "0" + i;
    else return i;


}
for (let i = 6; i < 20; i++) {
    HourItems.push(
        <View style={{ backgroundColor: colors.primary, width: 100, height: 70, borderRadius: 10 }}>
            <Text>Horário</Text>
            <Text>{parsedHour(i)}:00</Text>
        </View>
    )
}
const especialistas: any = []
for (let i = 6; i < 20; i++) {
    especialistas.push(
        <ProfessionalCard cardWidth={(Dimensions.get("window").width / 2) - 40} /> // Calcula a largura dos cards com base na largura da tela}/>
    )
}
export default function ScheduleModal() {
    return (

        <View style={styles.container}>

            <View style={styles.modalContainer}>
                <View style={styles.SalaoInfoText}>
                    <Text style={styles.SalaoNome}>La Mar</Text>
                    <Text style={styles.SalaoSubTitle}>Cortes de Cabelo, Maquiagem, Massagem</Text>
                </View>
                <View style={styles.SalaoLocContainer}>
                    <View style={styles.SalaoLocText}><MaterialIcons name='location-on' size={20} color={colors.primary} /><Text> Rua Euclides Zalgo, Endereço 0293</Text></View>
                    <View style={styles.SalaoLocText}><FontAwesome5 name='clock' size={20} color={colors.primary} /><Text>30 min  3.8km*Sab Dom | 06 da manhã - 11 da tarde</Text></View>
                </View>

            </View>
            <View>
                <Text>Agendamento</Text>

                <View>
                    <Text>Dia</Text>

                    <ScrollView horizontal
                        snapToInterval={110}
                        style={{
                        }}
                        contentContainerStyle={{ gap: 10, paddingRight: 20, paddingLeft: 20 }}>
                        {/* conteudos */}
                        {DayItems}
                    </ScrollView>
                </View>
                <View>
                    <Text>Horario</Text>
                    <ScrollView
                        horizontal
                        snapToInterval={110}
                        contentContainerStyle={{ gap: 10, paddingRight: 20, paddingLeft: 20 }}>
                        {HourItems}
                    </ScrollView>
                </View>
                <View>
                    <Text>Especialistas</Text>
                    <ScrollView>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            width: "100%",
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}>
                            {especialistas}
                        </View>
                    </ScrollView>
                </View>

            </View>
        </View>



    )
}
