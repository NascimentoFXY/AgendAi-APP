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
import { styles } from './style'
import CustomButton from '../../../components/customButton';
import MainModal from './modal/mainContent';
import ScheduleModal from './modal/Agendamento';


const width = Dimensions.get("window").width;

export default function SalaoScreen() {
    const [isScheduling, setScheduling ]= useState(true);
    return (
        <SafeAreaView style={styles.container}>
            {/* Imagem principal */}
            <CustomButton
                Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                type='absolute'
                top={20}
                left={10}
                border='Circle'
                style={{ zIndex: 3 }}
            />
            <View style={styles.SalaoImagem}>

            </View>
            {/* modal com informaçoes do salao */}

            {
                isScheduling ?
                <ScheduleModal/>:<MainModal />
            }

            <View style={styles.Tab}>
                <TouchableOpacity 
                onPress={()=> setScheduling(!isScheduling)}
                style={styles.TabBarButton}>
                    <Text style={{ color: "#fff" }}>Reserve um Horário</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )

}
