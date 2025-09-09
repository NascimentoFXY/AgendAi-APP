
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
    NativeScrollEvent
} from 'react-native';
import { SalonContext } from '../../../../../context/salonContext';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors from '../../../../../configs/colors'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import Rating from '../../Avaliacoes';

const { width } = Dimensions.get("window")

export default function MainModal({ navigation }: any) {
    const scrollRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0)
    const {salon} = useContext(SalonContext)!
    const pages = [<SalaoServices />, <SalaoEspecialistas />, <Rating />]

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // função chamada quando o usuário arrasta o dedo na tela (scroll)
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);

        // calcula em qual pagina o usuário está com base na posição horizontal
        setCurrentPage(pageIndex);
        // atualiza a página atual
    };
    const scrollToPage = (pageIndex: number) => {
        // Verifica se o índice da página é válido e se a referência da rolagem existe
        if (pageIndex >= 0 && pageIndex < pages.length && scrollRef.current) {
            scrollRef.current.scrollTo({ x: width * pageIndex, animated: true });
        } else {

            console.warn(`Página com índice ${pageIndex} não encontrada.`);
        }
    };
    return (
        <>
            <View style={styles.container}>

                <View style={styles.modalContainer}>
                    <View style={styles.SalaoInfoText}>
                        <Text style={styles.SalaoNome}>{salon?.name}</Text>
                        <Text style={styles.SalaoSubTitle}>Cortes de Cabelo, Maquiagem, Massagem</Text>
                    </View>
                    <View style={styles.SalaoLocContainer}>
                        <View style={styles.SalaoLocText}><MaterialIcons name='location-on' size={20} color={colors.primary} /><Text> {salon?.addres}</Text></View>
                        <View style={styles.SalaoLocText}><FontAwesome5 name='clock' size={20} color={colors.primary} /><Text>30 min  3.8km*Sab Dom | {salon?.opHour}</Text></View>
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

                        <TouchableOpacity
                            style={styles.NavigationOptions}
                            onPress={() => scrollToPage(0)}>

                            <Text style={[styles.NavigationOptionsText, currentPage === 0 ? { color: colors.primary } : styles.NavigationOptionsText]}>Serviços</Text>
                            <View style={currentPage === 0 ? styles.underline : styles.none} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.NavigationOptions}
                            onPress={() => scrollToPage(1)}>

                            <Text style={[styles.NavigationOptionsText, currentPage === 1 ? { color: colors.primary } : styles.NavigationOptionsText]}>Especialistas</Text>
                            <View style={currentPage === 1 ? styles.underline : styles.none} />
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.NavigationOptions}
                            onPress={() => scrollToPage(2)}>

                            <Text style={[styles.NavigationOptionsText, currentPage === 2 ? { color: colors.primary } : styles.NavigationOptionsText]}>Avalições</Text>
                            <View style={currentPage === 2 ? styles.underline : styles.none} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.NavigationOptions}>

                            <Text style={styles.NavigationOptionsText}>Galeria</Text>
                            <View style={styles.none} />
                        </TouchableOpacity>

                    </ScrollView>

                </View>
                <ScrollView style={{ width: "100%", paddingBottom: 120 }}

                    pagingEnabled
                    horizontal
                    overScrollMode='never'
                    scrollEventThrottle={24}
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    <SalaoServices />
                    <SalaoEspecialistas />
                    <Rating />
                </ScrollView>
            </View>

        </>

    )
}
