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
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import { styles } from '../../../pages/main/home/style';
import CustomButton from '../../../components/customButton';
import InputWithIcons from '../../../components/InputIcons';
import Carroussel from '../../../components/homeScreenComponents/carroussel';
import colors from '../../../configs/colors';
import ServicesCards from '../../../components/homeScreenComponents/ServicesCarroussel';


const cardsWidth = 400;


export default function MainHeader() {
    return (
        <>
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
        </>
    )
}