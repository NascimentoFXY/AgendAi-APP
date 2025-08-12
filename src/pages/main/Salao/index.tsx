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

export default function SalaoScreen({ navigation }: any) {
    const [isScheduling, setScheduling] = useState(true);
    return (
        <SafeAreaView style={styles.container}>
            {/* Imagem principal */}
            <View style={styles.SalaoImagem}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                    border='Circle'
                    width={50}
                    height={50}
                    top={-15}
                    left={20}
                    style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                    onPress={() => isScheduling ? setScheduling(false) : navigation.goBack()}
                />

            </View>
            {/* modal com informaçoes do salao */}

            {
                isScheduling ?
                    <ScheduleModal key={1} /> : <MainModal key={2} />
            }

            <View style={styles.Tab}>
                <TouchableOpacity
                    onPress={() => setScheduling(!isScheduling)}
                    style={styles.TabBarButton}>
                    <Text style={{ color: "#fff" }}>Reserve um Horário</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )

}
