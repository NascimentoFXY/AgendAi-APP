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
import colors from '../../../configs/theme';
import ServicesCards from '../../../components/homeScreenComponents/ServicesCarroussel';
import MainHeader from '../../../components/homeScreenComponents/header';
import { ServiceCardsData, EspecialCardsData } from './components';
import { SalonContext } from '../../../context/salonContext';


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

export default function Home({ navigation }: any) {
    console.log("renderizou") // teste de performance
    const { user } = useContext(AuthContext)!;
    const salonData = useContext(SalonContext)
    if (!user || !salonData) {
        // Exiba um carregamento ou redirecione para a tela de login
        return <ActivityIndicator />;
    }
    const { salon, createSalon, salonList, loading, useSalon } = salonData

    const name: string = "nome salao"
    const CNPJ: string = "cnpj salao"
    // testando a criação de salão com firebase
    // os dados estão sendo inseridos diretamente, mas futuramente terá um formulário.
    const createSalonWithData = () => {
        const newSalon: Salon = {
            CNPJ: CNPJ,
            name: name,
            opHour: "06:00-19:00",
            owner: user?.id,
            services: {
                type: "corte de cabelo",
            },
        }
        createSalon(newSalon)
    }


    const TopSaloesCardsData = ({ rating, name, salonId }: any) => {
        return (
            <TouchableOpacity onPress={() => (navigation.navigate("Salao"), useSalon(salonId))} >
                <View
                    style={styles.SaloesCards}>

                    <View style={{ flex: 3, flexDirection: "row-reverse" }}>
                        <View style={styles.saloesHeart}>
                            <FontAwesome5 name='heart' size={30} />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                        <View style={styles.saloesRating}>
                            <MaterialIcons name='star' size={30} />
                            <Text>{rating}</Text>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>
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

                <View style={styles.serviceCards}>

                    {ServiceCardsData.map((key) => (
                        <View key={key.id}>{key.content}</View>
                    ))}

                </View>


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
                        <TopSaloesCardsData key={key.id} name={"aaa"} owner={"bbbbbb"} rating={"5.0"} salonId={key.id} />
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
