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


const cardsWidth = 400;


export default function Home() {
    return (
        < SafeAreaView >
            {/* ===============HEADER=============== */}
            <View style={styles.header}>
                {/* Linha de cima: localização e sino */}
                <View style={styles.headerTop}>

                    <View>

                        <Text style={{ fontSize: 12, color: '#999' }}>Localização</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            <Ionicons name="location-sharp" size={24} color="#d77a7a" />
                            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 4 }}>Taboão das Trevas, Brasil</Text>
                        </View>

                    </View>

                    <CustomButton
                        Icon={<Ionicons name="notifications" size={26} color="#6b6b6b" />}
                        style={styles.notificationButton} />
                </View>

                {/* Linha de baixo: campo de busca + botão */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <InputWithIcons
                        style={{ flex: 1 }}
                        leftIcon={<Ionicons name='search' size={20} />}
                    />

                    <CustomButton
                        Icon={<Feather name="sliders" size={18} color="#fff" />}
                        style={styles.filterButton}
                        border='Circle'
                    />


                </View>
            </View>


            <View>

                {/* ==================ESPECIAL PRA VOCE======================================= */}
                <View style={styles.contentHeader}>

                    <Text style={styles.contentHeaderTitle}>#EspecialParaVocê</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <Carroussel
                    cardsWidth={cardsWidth}
                    cardsGap={20}>

                    <View />

                    <View
                        style={styles.especialCards}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>Salão do zé com desconto</Text>
                            <Text style={{ color: "#fff" }}>De até</Text>
                            <Text style={{ color: "#fff" }}>20%</Text>
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
                    <View
                        style={styles.especialCards}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>Salão do zé com desconto</Text>
                            <Text style={{ color: "#fff" }}>De até</Text>
                            <Text style={{ color: "#fff" }}>20%</Text>
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
                 

                    <View />
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
                    />
                    <ServicesCards
                        icon={
                            <FontAwesome5 name="brush" size={40} color={"#3b000084"} />
                        }
                        width={75}
                        textSize={10}
                        text='Maquiagem'
                    />
                    <ServicesCards
                        icon={
                            <Ionicons name="people" size={40} color={"#3b000084"} />
                        }
                        width={75}
                        textSize={10}
                        text='Massagem'
                    />
                </View>

                {/* ============================================saloes=============================== */}
                <View style={styles.contentHeader}>
                    <Text style={styles.contentHeaderTitle}>Top salões</Text>
                    <TouchableOpacity><Text style={[styles.link, { fontSize: 16 }]}>Ver tudo</Text></TouchableOpacity>

                </View>

                <Carroussel
                    cardsWidth={300}
                    cardsGap={20}>

                    <View
                        style={styles.SaloesCards}>

                       
                    </View>
                </Carroussel>
            </View>
        </SafeAreaView>
    );
}
