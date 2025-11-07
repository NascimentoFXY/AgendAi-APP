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
    const { salon, isOwner,savedList, saveSalon, fetchSaved, removeSalon } = useContext(SalonContext)!
    const isFavorite = savedList?.some((s) => s.id === salon?.id);
    
    console.warn("[Modal do Salão] ID: ", isFavorite)
    return (
        <SafeAreaView style={styles.container}>
            {/* Imagem principal */}
            <View style={{ backgroundColor: colors.lightGray }}>

                <View style={{ width: width, aspectRatio: 16 / 9, backgroundColor: colors.debug, padding: 20, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                    <CustomButton
                        Icon={<Icon.Ionicons name="arrow-back" size={24} color="white" />}
                        border='Circle'
                        width={50}
                        height={50}
                        style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                        onPress={() => (navigation.goBack())}
                    />
                    {isFavorite && 
                    <TouchableOpacity 
                    style={{ zIndex: 1, borderRadius: 200, backgroundColor: "#ffffff90", width: 50, height: 50, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "white" }}
                    onPress={()=>removeSalon(salon?.id!) }
                    >
                        <Icon.FontAwesome6 name='heart-circle-minus' size={33} color={colors.primary} />
                    </TouchableOpacity>}
                    {!isFavorite &&
                        <TouchableOpacity
                            style={{
                                zIndex: 1,
                                borderRadius: 200,
                                backgroundColor: "#ffffff90",
                                width: 50,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "white"
                            }}
                            onPress={async () => {await saveSalon(salon?.id!); await fetchSaved() }}
                        >

                            <Icon.FontAwesome6 name='heart-circle-plus' size={33} color={colors.white} />
                        </TouchableOpacity>}
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
