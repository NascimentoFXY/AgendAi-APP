import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
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
import { ServiceCardsData, EspecialCardsData, topSaloesCardsData } from './components';
import { SalonContext } from '../../../context/salonContext';


const cardsWidth = 400;
interface Services {
    type: string,

}
interface Salon {

    CNPJ: string,
    name: string,
    opHour?: any,
    services?: Services,
}

export default function Home({ navigation }: any) {
    const { user } = useContext(AuthContext)!;
    const salonData = useContext(SalonContext)
    if (!user || !salonData) {
        // Exiba um carregamento ou redirecione para a tela de login
        return <ActivityIndicator />;
    }
    const { salon, createSalon, salonList,loading } = salonData

    const name: string = "nome salao"
    const CNPJ: string = "cnpj salao"
    const [data, setData] = useState<Salon>()

    const createSalonWithData = () => {
        setData({
            CNPJ: CNPJ,
            name: name,
            opHour: "06:00-19:00",
            services: {
                type: "corte de cabelo",
            },

        })
        createSalon(data as any)
    }

    const TopSaloesCardsData = ({ rating, name, owner }: any) => {
        return (

            <View
                style={styles.SaloesCards}>
                <Text>{rating}</Text>
                <View style={{ flex: 3, flexDirection: "row-reverse" }}>
                    <View style={styles.saloesHeart}>
                        <FontAwesome5 name='heart' size={30} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <View style={styles.saloesRating}>
                        <MaterialIcons name='star' size={30} />
                        <Text>5.0</Text>
                    </View>
                </View>


            </View>

        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <MainHeader navigation={navigation} />
            <Text style={{
                fontWeight: 800, textAlign: "center",
                fontSize: 30,
                padding: 20,
                borderBottomWidth: 1,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                borderBottomColor: colors.transparentLightGray
            }}>OLÁ {user.name ? user.name.toUpperCase() : ""}!</Text>

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

                    {EspecialCardsData.map((key) => (

                        <View key={key.id}>
                            {key.content}
                        </View>
                    ))}

                </Carroussel>
                {/* =========================SERVIÇOS=================================== */}

                <View style={styles.contentHeader}>

                    <Text style={styles.contentHeaderTitle}>Serviços</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                {!loading && <View style={styles.serviceCards}>

                    {ServiceCardsData.map((key) => (
                        <View key={key.id}>{key.content}</View>
                    ))}

                </View>}

                {/* ============================================saloes=============================== */}


                <View style={styles.contentHeader}>
                    <Text style={styles.contentHeaderTitle}>Top salões</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <Carroussel
                    cardsWidth={300}
                    cardsGap={20}
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}>
                    {salonList?.map((key) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Salao")} key={key.id}>

                            <TopSaloesCardsData name={"aaa"} owner={"bbbbbb"} rating={"5.0"} />

                        </TouchableOpacity>
                    ))}
                </Carroussel>
                <CustomButton
                    Icon={<Ionicons name="add" size={24} color={"#fff"} />}
                    border='Circle'
                    type='absolute'
                    width={80}
                    height={80}
                    style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5", bottom: 200, right: 20 }}
                    onPress={createSalonWithData}
                />
            </View>
        </ScrollView>
    );
}
