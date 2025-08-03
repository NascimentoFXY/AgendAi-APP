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
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import InputWithIcons from '../../../components/InputIcons';
import Carroussel from '../../../components/homeScreenComponents/carroussel';
import colors from '../../../configs/colors';
import ServicesCards from '../../../components/homeScreenComponents/ServicesCarroussel';
import MainHeader from '../../../components/homeScreenComponents/header';
import SalaoServices from './salaoScreens';
import SalaoEspecialistas from './Especialistas';


const width = Dimensions.get("window").width;

export default function SalaoScreen() {
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
                    <View style={styles.SalaoContacts}>


                        <ServicesCards
                            icon={<Entypo name='scissors' size={20} color={"#3b000084"} />}
                            text='Websites'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<MaterialIcons name='contacts' size={20} color={"#3b000084"} />}
                            text='Contato'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Ionicons name='call' size={20} color={"#3b000084"} />}
                            text='Ligar'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Entypo name='map' size={20} color={"#3b000084"} />}
                            text='Direção'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Entypo name='share' size={20} color={"#3b000084"} />}
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

                        <View style={styles.NavigationOptions}>
                            <Text style={[styles.NavigationOptionsText, { color: colors.primary }]}>Serviços</Text>
                            <View style={styles.underline} />
                        </View>
                        <View style={styles.NavigationOptions}>
                            <Text style={styles.NavigationOptionsText}>Especialistas</Text>

                        </View>
                        <View style={styles.NavigationOptions}>
                            <Text style={styles.NavigationOptionsText}>Galeria</Text>

                        </View>
                        <View style={styles.NavigationOptions}>
                            <Text style={styles.NavigationOptionsText}>Avalições</Text>

                        </View>
                        <View style={styles.NavigationOptions}>
                            <Text style={styles.NavigationOptionsText}>Avalições</Text>

                        </View>
                    </ScrollView>

                </View>
                <ScrollView style={{ width: "100%" }}
      
                    pagingEnabled
                    horizontal
             
                    scrollEventThrottle={24}
                >
                    <SalaoServices />
                    <SalaoEspecialistas />
                </ScrollView>
            </View>

        </SafeAreaView>
    )

}
