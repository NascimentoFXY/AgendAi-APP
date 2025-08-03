import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './style';
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import InputWithIcons from '../../../components/InputIcons';
import Carroussel from '../../../components/homeScreenComponents/carroussel';
import colors from '../../../configs/colors';
import ServicesCards from '../../../components/homeScreenComponents/ServicesCarroussel';
import MainHeader from '../../../components/homeScreenComponents/header';
import { ServiceCardsData, EspecialCardsData, topSaloesCardsData } from './components';


const cardsWidth = 400;


export default function Home({ navigation }: any) {
    return (
        <ScrollView>
            <MainHeader />



            <View>

                {/* ==================ESPECIAL PRA VOCE======================================= */}
                <View style={styles.contentHeader}>

                    <Text style={styles.contentHeaderTitle}>#EspecialParaVocê</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <Carroussel
                    cardsWidth={cardsWidth}
                    cardsGap={20}
                    style={{
                        paddingLeft: 20,

                    }}
                >

                    {EspecialCardsData.map((key) => (

                        <View
                            key={key.id}
                            style={{
                                paddingRight: EspecialCardsData[EspecialCardsData.length - 1].id === key.id ? 20 : 0
                            }}
                        >
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
                    style={{
                        paddingLeft: 20
                    }}>

                    {topSaloesCardsData.map((key) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Salao")} key={key.id}>
                            <View key={key.id}>{key.content}</View>
                        </TouchableOpacity>
                    ))}
                </Carroussel>
            </View>
        </ScrollView>
    );
}
