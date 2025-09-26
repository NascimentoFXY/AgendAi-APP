
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
    ActivityIndicator
} from 'react-native';
import { SalonContext } from '../../../../../context/salonContext';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors from '../../../../../configs/theme'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import Rating from '../../Avaliacoes';

const { width } = Dimensions.get("window")
//tela principal ao apertar em um salão
export default function AddRating({ navigation }: any) {
    const scrollRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0)
    const {salon, loading} = useContext(SalonContext)!
    const pages = [<SalaoServices />, <SalaoEspecialistas />, <Rating />]

   
    return (
        
            <View style={styles.container}>
                <View style={styles.modalContainer}>

                    <View style={styles.SalaoInfoText}>
                        <Text style={styles.SalaoNome}>{salon?.name}</Text>
                        <Text style={styles.SalaoSubTitle}>{salon?.description}</Text>
                    </View>
                    
                    <View style={styles.SalaoLocContainer}>
                        <View style={styles.SalaoLocText}><MaterialIcons name='location-on' size={20} color={colors.primary} /><Text> {salon?.addres}</Text></View>
                        <View style={styles.SalaoLocText}><FontAwesome5 name='clock' size={20} color={colors.primary} /><Text>Opera entre | {salon?.opHour}</Text></View>
                    </View>
                    <View style={styles.SalaoContacts}>


                        <ServicesCards
                            icon={<MaterialCommunityIcons name='web' size={20} color={colors.secondary} />}
                            text='Websites'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} 
                            
                            />
                        <ServicesCards
                            icon={<MaterialIcons name='contacts' size={20} color={colors.secondary} />}
                            text='Contato'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Ionicons name='call' size={20} color={colors.secondary} />}
                            text='Ligar'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Entypo name='map' size={20} color={colors.secondary} />}
                            text='Direção'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Entypo name='share' size={20} color={colors.secondary} />}
                            text='Share'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />

                    </View>



                    <ScrollView
                        style={styles.salaoNavigationScroll}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        overScrollMode='never'
                        contentContainerStyle={styles.salaoNavigationOptions}

                    >

                        

                    </ScrollView>

                </View>
                
            </View>

    

    )
}
