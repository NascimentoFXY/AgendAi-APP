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
    Image,
    Animated
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './style'
import CustomButton from '../../../components/customButton';
import MainModal2 from './modal/mainContent/MainModal';
import ScheduleModal from './modal/Agendamento/agendamento';
import { SalonContext } from '../../../context/salonContext';
import colors from 'configs/theme';
import Icon from 'configs/icons';


const width = Dimensions.get("window").width;

export default function SalaoScreen({ navigation }: any) {
    const [isScheduling, setScheduling] = useState(false);
    const { salon, isOwner } = useContext(SalonContext)!
    console.warn("[Modal do Salão] ID: ",salon?.id )
    return (
        <SafeAreaView style={styles.container}>
            {/* Imagem principal */}
               <View style={{backgroundColor: colors.lightGray }}>

                <View style={{width: width, aspectRatio: 16/9, backgroundColor: colors.debug, padding: 20, alignItems: "center", flexDirection: "row",  }}>
                    <CustomButton
                        Icon={<Icon.Ionicons name="arrow-back" size={24} color="white" />}
                        border='Circle'
                        width={50}
                        height={50}
                        style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                        onPress={() => (navigation.goBack())}
                    />
                </View>
                <Image source={{ uri: salon?.image }} style={{ aspectRatio: 16 / 9, width: width, position: "absolute" }}></Image>
            
            </View>
            {/* modal com informaçoes do salao */}

                <MainModal2 navigation={navigation} />

            {!isOwner && <View style={styles.Tab}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Scheduling')}
                    style={styles.TabBarButton}

                >
                    <Text style={{ color: "#fff" }}>Reserve um Horário</Text>
                </TouchableOpacity>
            </View>}


        </SafeAreaView>
    )

}
