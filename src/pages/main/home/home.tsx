import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './style'
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import InputWithIcons from '../../../components/InputIcons';
import Carroussel from '../../../components/homeScreenComponents/carroussel';
import colors, { font } from '../../../configs/theme';
import ServicesCards from '../../../components/homeScreenComponents/ServicesCarroussel';
import MainHeader from '../../../components/homeScreenComponents/header';
import { EspecialCardsData } from './components';
import { SalonContext, useSalonContext } from '../../../context/salonContext';
import { ScheduleContext } from 'context/scheduleContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserLocation } from 'context/userLocation';
import Catalogo from 'pages/catalogo/catalogo';


const cardsWidth = 400;
interface Services {
    type: any,
    id?: string

}
interface Salon {

    CNPJ: string,
    name: string,
    owner: string,
    opHour?: any,
    services?: Services,
}


export default function HomeWrapper({ navigation }: any) {
    const [refreshing, setRefreshing] = useState(false);
    const [refreshingState, setRefreshingState] = useState(0)
    const { fetchSalons } = useSalonContext()!
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRefreshingState(0)
        fetchSalons(),
            setTimeout(() => {
                setRefreshing(false);
                setRefreshingState(refreshingState + 1)
            }, 500);
    }, []);
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <Home key={refreshingState} navigation={navigation} />
        </ScrollView>
    )
}
export function Home({ navigation }: any) {
    const { user, refreshUserData } = useContext(AuthContext)!;
    const { searchAddresses } = useUserLocation();
    const salonData = useContext(SalonContext)
    const scheduleData = useContext(ScheduleContext)!
    if (!user || !salonData || !scheduleData) {
        // Exiba um carregamento ou redirecione para a tela de login
        return <ActivityIndicator />;
    }
    const { salon, salonList, useSalon, getAverageRating } = salonData
    const { createSchedule, schedules, schedule, useSchedule, cancelSchedule, fetchSchedules } = scheduleData!;




    const TopSaloesCardsData = ({ rating, name, salonId, image }: any) => {
        return (
            <TouchableOpacity onPress={async () => (navigation.navigate("Salao"), await useSalon(salonId))} >
                <View

                    style={styles.SaloesCards}>
                    <Image source={{ uri: image }} style={{ resizeMode: "cover", position: "absolute", width: "100%", height: "100%" }} />


                    <View style={styles.saloesHeart}>
                        <FontAwesome5 name='heart' size={30} />
                    </View>

                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', '#000000ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.linearGradient}
                    />

                    <View style={styles.cardBottom}>

                        <View style={styles.saloesRating}>
                            <MaterialIcons name='star' size={30} />
                            <Text>{rating}</Text>
                        </View>
                        <Text style={styles.cardTitle} numberOfLines={1} lineBreakMode='tail'>{name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const [averageRatings, setAverageRatings] = useState<{ [salonId: string]: number }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllAverages = async () => {
            if (!salonList || salonList.length === 0) {
                return;
            }
            const ratingsMap: { [salonId: string]: number } = {};

            for (const salon of salonList) {
                if (!getAverageRating) return;
                const avg = await getAverageRating(salon);
                ratingsMap[salon.id!] = avg;
            }

            setAverageRatings(ratingsMap);
            setLoading(false);
        };

        fetchAllAverages();
    }, [salonList]);
    return (
        <ScrollView contentContainerStyle={styles.container}

        >
            <MainHeader navigation={navigation} />
            <Text style={{
                fontFamily: font.poppins.bold,
                fontSize: 30,
                padding: 20,
                borderBottomWidth: 1,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                borderBottomColor: colors.transparentLightGray
            }}>OLÁ, {user.name ? user.name.toUpperCase() : ""}!</Text>

            <View>

                {/* ==================ESPECIAL PRA VOCE======================================= */}

                <View style={styles.contentHeader}>

                    <Text style={styles.contentHeaderTitle}>#EspecialParaVocê</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <Carroussel
                    cardsWidth={cardsWidth}
                    cardsGap={20}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                    }}
                >


                    {salonList?.map((salon, index) => (
                        <View key={salon.id}>

                            <View
                                style={styles.especialCards}>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>{salon.name} com desconto</Text>
                                    <Text style={{ color: "#fff" }}>De até</Text>
                                    <Text style={{ color: "#fff" }}>{}</Text>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingTop: 30, alignItems: "center" }}>
                                    <Text style={{ color: "#fff", fontSize: 12, paddingTop: 20, }}>Localizado em Faria lima, SP</Text>
                                    <CustomButton
                                        backcolor={colors.primary}
                                        border="Circle"
                                        text='IR'
                                        color='#fff'
                                        width={80}
                                    />
                                </View>
                            </View>

                        </View>

                    ))}

                </Carroussel>
                {/* =========================SERVIÇOS=================================== */}

                <View style={styles.contentHeader}>

                    <Text style={styles.contentHeaderTitle}>Serviços</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <View style={styles.serviceCards}>
                    <ServicesCards

                        icon={
                            <Entypo name='scissors' size={40} color={"#3b000084"} />
                        }
                        width={75}
                        onPress={() => navigation.navigate("Catalogo")}
                        textSize={10}
                        text='Cortar Cabelo'
                        color='#000000ff'


                    />
                    <ServicesCards

                        icon={
                            <MaterialCommunityIcons name="face-mask" size={40} color={"#3b000084"} />
                        }
                        width={75}

                        textSize={10}
                        text='Barbear'
                        color='#000000ff'
                    />
                    <ServicesCards

                        icon={
                            <FontAwesome5 name="brush" size={40} color={"#3b000084"} />
                        }
                        width={75}

                        textSize={10}
                        text='Maquiagem'
                        color='#000000ff'
                    />
                    <ServicesCards

                        icon={
                            <Ionicons name="people" size={40} color={"#3b000084"} />
                        }
                        width={75}

                        textSize={10}
                        text='Massagem'
                        color='#000000ff'
                    />


                </View>


                {/* ============================================saloes=============================== */}

                <View style={styles.contentHeader}>
                    <Text style={styles.contentHeaderTitle}>Top salões</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("Explore") }}><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <Carroussel
                    cardsWidth={300}
                    cardsGap={20}
                    contentContainerStyle={{
                        paddingHorizontal: 20,

                    }}>
                    {!loading && salonList?.map((key) => (
                        <TopSaloesCardsData key={key.id} name={key.name} rating={
                            averageRatings[key.id!] === undefined ? (
                                <ActivityIndicator size="small" color={colors.primary} />
                            ) : (
                                (averageRatings[key.id!] ?? 0).toFixed(1)
                            )} salonId={key.id} image={key.image} />
                    ))}
                    {loading && <ActivityIndicator size={70} style={{ width: Dimensions.get("window").width, alignItems: "center" }} color={colors.primary} />}
                </Carroussel>
                <ScrollView>
                    <Catalogo />
                </ScrollView>
            </View>
        </ScrollView>
    );
}
