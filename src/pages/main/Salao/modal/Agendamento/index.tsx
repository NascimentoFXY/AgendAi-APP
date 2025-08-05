
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
                    <ScrollView>
                        {/* conteudos */}
                    </ScrollView>
                </View>
                <View>
                    <Text>Horario</Text>
                    <ScrollView>
                        {/* conteudos */}
                    </ScrollView>
                </View>
                <View>
                    <Text>Especialistas</Text>
                    <ScrollView>
                        {/* conteudos */}
                    </ScrollView>
                </View>

            </View>
        </View>



    )
}
