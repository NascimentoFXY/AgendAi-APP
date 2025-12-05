import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { Salon, SalonContext, useSalonContext } from '../../../context/salonContext';
import { ScheduleContext } from 'context/scheduleContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserLocation } from 'context/userLocation';
import Catalogo from 'pages/catalogo/catalogo';
import Icon from 'configs/icons';
import { normalizeSize } from 'configs/utils';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from 'services/firebase';

const width = Dimensions.get('window').width;
const cardsWidth = 400;
interface Services {
    type: any,
    id?: string

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
    const { salon, salonList, loadSalon, saveSalon, savedList, removeSalon } = salonData
    const { createSchedule, schedules, schedule, useSchedule, cancelSchedule, fetchSchedules } = scheduleData!;
    const [premiumSalonList, setPremiumSalonList] = useState<Salon[] | null>(null)

    const getTopSaloes = async () => {
        try {
            //  Buscar todos os usuários premium
            const usersRef = collection(db, "users");
            const usersQuery = query(usersRef, where("isPremium", "==", true));
            const usersSnapshot = await getDocs(usersQuery);

            // Pegar os IDs dos donos premium
            const premiumUserIds = usersSnapshot.docs.map(doc => doc.id);

            if (premiumUserIds.length === 0) {
                setPremiumSalonList([]);
                return;
            }

            //  Buscar salões cujo dono (ownerId) esteja na lista de premiumUserIds
            const salonRef = collection(db, "salon");
            const salonsSnapshot = await getDocs(salonRef);

            const salons = salonsSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter((salon: any) => premiumUserIds.includes(salon.ownerID)); // <-- Filtra

            setPremiumSalonList(salons as any);
        } catch (err) {
            console.error("Erro ao buscar salões de usuários premium:", err);
        }
    };

    useEffect(() => {
        getTopSaloes();
    }, [user.id]);


    const TopSaloesCardsData = ({ rating, name, salonId, image }: any) => {
        const isFavorite = savedList?.some((s) => s.id === salonId);

        return (
            <TouchableOpacity onPress={async () => (navigation.navigate("Salao"), await loadSalon(salonId))} >
                <View

                    style={styles.SaloesCards}>
                    <Image source={{ uri: image }} style={{ resizeMode: "cover", position: "absolute", width: "100%", height: "100%" }} />


                    {!isFavorite && <TouchableOpacity style={styles.saloesHeart} onPress={() => { saveSalon(salonId) }}>
                        <FontAwesome5 name='heart' size={30} />
                    </TouchableOpacity>}
                    {isFavorite && <TouchableOpacity style={styles.saloesHeart} onPress={() => { removeSalon(salonId) }}>
                        <Icon.FontAwesome6 name='heart-circle-minus' size={30} color={colors.primary} />
                    </TouchableOpacity>}

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
    const [loading, setLoading] = useState(false);



    // =========

    const PromoBanner = ({ salon }: { salon: Salon }) => {
        const scrollRef = useRef<ScrollView>(null);
        const [currentIndex, setCurrentIndex] = useState(0);

        const images = [salon.image, ...(salon.promoBannerImages || [])];
        // console.log("o salão", salon.name, "tem", images.length, "imagens de banner");
        const hasCarousel = images.length > 1;
        useEffect(() => {
            if (!hasCarousel) return;
            const interval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                setCurrentIndex(nextIndex);

                scrollRef.current?.scrollTo({
                    x: nextIndex * normalizeSize(350),
                    animated: true,
                });
            }, 5000);

            return () => clearInterval(interval);
        }, [currentIndex]);


        return (
            <View style={styles.especialCards}>

                {/* BANNER INTERNO QUE GIRA */}
                <View style={{ position: "absolute" }}>

                    <ScrollView
                        ref={scrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        style={{ width: normalizeSize(350), height: normalizeSize(250) }}
                    >
                        {images.map((img, index) => (
                            <View
                                key={index}
                                style={{ width: normalizeSize(350), height: "100%" }}
                            >
                                <Image
                                    source={{ uri: img }}
                                    style={{ width: "100%", height: "100%", borderRadius: 14 }}
                                />

                                {/* Só aparece no primeiro banner */}
                                {index === 0 && (
                                    <>
                                        <LinearGradient
                                            colors={['rgba(255, 255, 255, 0)', '#000000d4']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={styles.linearGradient}
                                        />

                                        <View style={{ position: "absolute", top: 70, left: 10 }}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                color: "#fff",
                                                fontSize: normalizeSize(24),
                                                width: "80%",
                                                textShadowColor: "#0000009b",
                                                textShadowOffset: { width: 1, height: 1 },
                                                textShadowRadius: 5
                                            }}>
                                                {salon.name} com desconto
                                            </Text>

                                            <Text style={{
                                                color: "#fff", textShadowColor: "#0000009b",
                                                textShadowOffset: { width: 1, height: 1 },
                                                textShadowRadius: 5
                                            }}>De até</Text>

                                            <Text style={{
                                                color: colors.primary,
                                                fontSize: normalizeSize(30),
                                                fontFamily: font.poppins.bold,
                                                textShadowColor: "#f8ff6dff",
                                                textShadowOffset: { width: 0, height: 0 },
                                                textShadowRadius: 5

                                            }}>
                                                {salon.maxPromo?.valor}
                                                {salon.maxPromo?.tipoValor === "porcentagem" ? "%" : "R$"}
                                            </Text>
                                        </View>
                                    </>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Restante do card */}
                <View style={{ flex: 1 }}>
                    <Text style={{
                        backgroundColor: "#fff",
                        width: 120,
                        padding: 8,
                        borderRadius: 20
                    }}>
                        Tempo Limitado
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",

                    justifyContent: "space-between",
                    paddingTop: "auto",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 12,
                        width: "50%",
                        textAlignVertical: "center",

                    }}>
                        Localizado em {salon.addres?.split(",")[2]}, {salon.addres?.split(",")[1]}
                    </Text>

                    <CustomButton
                        backcolor={colors.primary}
                        border="Circle"
                        text='IR'
                        color='#fff'
                        width={80}
                        onPress={() => {
                            loadSalon(salon.id!);
                            navigation.navigate("Salao");
                        }}
                    />
                </View>
            </View>
        );
    };

    //======================== RENDERIZAÇÃO DA PÁGINA INICIAL ==========================
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

                {premiumSalonList?.length! > 0 && salonList?.filter((salon) => salon.maxPromo) && (
                    <>
                        <View style={styles.contentHeader}>

                            <Text style={styles.contentHeaderTitle}>#EspecialParaVocê</Text>
                            <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                        </View>
                        <Carroussel
                            cardsWidth={normalizeSize(350)}
                            cardsGap={20}
                            contentContainerStyle={{
                                paddingHorizontal: 20,
                            }}
                        >
                            {salonList
                                ?.filter((salao) => salao.maxPromo)
                                .map((salon, index) => (


                                    <PromoBanner key={index} salon={salon} />


                                ))}
                        </Carroussel>
                    </>
                )}



                {/* ============================================Top Saloes=============================== */}

                {premiumSalonList?.length! > 0 &&

                    <View>
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
                            {!loading && premiumSalonList?.map((key: any) => (
                                <TopSaloesCardsData key={key.id} name={key.name} rating={key.rating.toFixed(1) || (0).toFixed(1)} salonId={key.id} image={key.image} />
                            ))}
                            {loading && <ActivityIndicator size={70} style={{ width: Dimensions.get("window").width, alignItems: "center" }} color={colors.primary} />}
                        </Carroussel>
                    </View>

                }


                {/* =========================FAVORITOS=================================== */}

                {savedList.length > 0 && (
                    <View>

                        <View style={styles.contentHeader}>

                            <Text style={styles.contentHeaderTitle}>Favoritos</Text>
                            <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                        </View>

                        <Carroussel
                            cardsWidth={300}
                            cardsGap={20}
                            contentContainerStyle={{
                                paddingHorizontal: 20,

                            }}>
                            {!loading && savedList?.map((key) => (
                                <TopSaloesCardsData key={key.id} name={key.name} rating={key.rating.toFixed(1) || (0).toFixed(1)} salonId={key.id} image={key.image} />
                            ))}
                            {loading && <ActivityIndicator size={70} style={{ width: Dimensions.get("window").width, alignItems: "center" }} color={colors.primary} />}
                        </Carroussel>
                    </View>
                )
                }
                <ScrollView>
                    <Catalogo />
                </ScrollView>
            </View>
        </ScrollView>
    );
}
