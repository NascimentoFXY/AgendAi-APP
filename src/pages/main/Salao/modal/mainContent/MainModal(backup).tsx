
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
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
    ActivityIndicator,
    Animated
} from 'react-native';
import { SalonContext } from '../../../../../context/salonContext';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors from '../../../../../configs/theme'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import Rating from '../../Avaliacoes';
import Icon from 'configs/icons';
import { AuthContext } from 'context/auth';
import { ChatContext } from 'context/chatContext';
import Agenda from 'pages/main/agenda';
import { useFocusEffect } from "@react-navigation/native";
const { width } = Dimensions.get("window")
//tela principal ao apertar em um salão


export default function MainModal({ navigation }: any) {
    const scrollRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0)
    const { salon, loading, isOwner, useSalon, } = useContext(SalonContext)!
    const { user } = useContext(AuthContext)!
    const pages = [<SalaoServices />, <SalaoEspecialistas />, <Rating />]
    const { createChat, useChat } = useContext(ChatContext)!
    useFocusEffect(
        React.useCallback(() => {
            console.log("Salão montada");
            return () => {
                console.log("Salão desmontado desmontada");
                // Aqui você pode limpar estados, listeners, etc.
            };
        }, [])
    );
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
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    function parsedWorkSchedule() {
        if (!salon?.workSchedule) return "Não definido";
        const [startNum, endNum] = salon.workSchedule.split("-").map(Number);
        const today = new Date();
        const date = new Date(today);
        let dayName;
        switch (salon?.workSchedule) {
            case "1-5":
                dayName = "Seg. a Sex.";
                break;
            case "1-6":
                dayName = "Seg. a Sáb.";
                break;
            case "1-1":
                dayName = "Seg. a Seg.";
                break;
            default:
                dayName = "";
        }
        return dayName;
    }

    async function goToChat() {
        const chatID = await createChat(user?.id!, salon?.ownerID!, user?.name!, salon?.ownerName!);
        if (!chatID) return;
        await useChat(chatID);

    }

    const Header: React.FC<any> = () => {
        return (

            <>
                <View style={styles.SalaoInfoText}>
                    <Text style={styles.SalaoNome}>{salon?.name}</Text>
                    <Text style={styles.SalaoSubTitle}>{salon?.description}</Text>
                </View>


                <View style={styles.SalaoLocContainer}>

                    {!isOwner ?
                        (
                            <View style={[styles.SalaoLocText, { maxWidth: width }]}>
                                <Icon.Ionicons name='person-sharp' size={20} color={colors.primary} />
                                <Text numberOfLines={2} style={{ flex: 1 }} lineBreakMode='tail'>Proprietário(a): {salon?.ownerName}</Text>

                                <TouchableOpacity style={[styles.SalaoLocText, { marginLeft: "auto", paddingHorizontal: 20 }]}
                                    onPress={async () => { await goToChat(); navigation.navigate("ChatScreen") }}
                                >
                                    <Icon.Entypo name="chat" size={20} color={colors.primary} />
                                    <Text style={{ color: colors.primary }}>Conversar</Text>
                                </TouchableOpacity>

                            </View>
                        )
                        :
                        (
                            <View>

                                <Text style={{ color: colors.lightGray, textAlign: "center" }}>Você é o proprietário desse estabelecimento.</Text>
                            </View>

                        )
                    }
                    <View style={styles.SalaoLocText}><MaterialIcons name='location-on' size={20} color={colors.primary} />
                        <Text numberOfLines={2} style={{ flex: 1, paddingRight: 20 }} lineBreakMode='tail'> {salon?.addres}</Text>
                    </View>
                    <View style={styles.SalaoLocText}><FontAwesome5 name='clock' size={20} color={colors.primary} /><Text>Opera entre | {salon?.opHour} - {parsedWorkSchedule()}</Text></View>
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

            </>
        )
    }

    return (

        <View style={styles.container}>
            <ScrollView style={{ zIndex: 2 }}>
                <View style={styles.modalContainer}>

                    <Header />

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
                <ScrollView style={{ width: "100%", paddingBottom: !isOwner ? 120 : 0 }}
                    nestedScrollEnabled
                    pagingEnabled
                    horizontal
                    overScrollMode='never'
                    scrollEventThrottle={24}
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    {pages.map((PageComponent, index) => (
                        <View key={index}>
                            {PageComponent}
                        </View>
                    ))}

                </ScrollView>
            </ScrollView>
        </View >



    )
}
