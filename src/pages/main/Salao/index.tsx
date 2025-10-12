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
    Image
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './style'
import CustomButton from '../../../components/customButton';
import MainModal from './modal/mainContent';
import ScheduleModal from './modal/Agendamento';
import { SalonContext } from '../../../context/salonContext';


const width = Dimensions.get("window").width;

export default function SalaoScreen({ navigation }: any) {
    const [isScheduling, setScheduling] = useState(false);
    const {salon} = useContext(SalonContext)!
    return (
        <SafeAreaView style={styles.container}>
            {/* Imagem principal */}
            <View style={styles.SalaoImagem}>
                <Image source={{uri:salon?.image }} style={{width: "100%", height: "100%"}}/>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                    border='Circle'
                    type='absolute'
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                    onPress={() => isScheduling ? setScheduling(false) : (navigation.goBack(), setScheduling(false))}
                />

            </View>
            {/* modal com informaçoes do salao */}

            
                <MainModal navigation={navigation}/>
            

            <View style={styles.Tab}>
                <TouchableOpacity
                    onPress={() => isScheduling? navigation.navigate('Scheduling'): setScheduling(true)}
                    style={styles.TabBarButton}>
                    <Text style={{ color: "#fff" }}>Reserve um Horário</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )

}
