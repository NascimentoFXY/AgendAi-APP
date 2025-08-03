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
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { styles } from '../style'
import colors from '../../../../configs/colors';
import ServiceItem from '../../../../components/Salao/ServicesScreenOptions';
import ProfessionalCard from '../../../../components/Salao/EspecialistaScreen';


const width = Dimensions.get("window").width;
const calcCardsWidth = (width / 2) - 40; // Calcula a largura dos cards com base na largura da tela
export default function SalaoEspecialistas() {
    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

            {/* EspecialistasTitle */}
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Especialistas</Text><Text style={{ fontSize: 18, fontWeight: "bold", color: colors.primary }}>(5)</Text>
            </View>
            {/* EspecialistasOptions */}
            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, width: "100%", flexDirection: "row", flexWrap: "wrap" }}>




                <ProfessionalCard cardWidth={calcCardsWidth} />
                <ProfessionalCard cardWidth={calcCardsWidth} />
                <ProfessionalCard cardWidth={calcCardsWidth} />
                <ProfessionalCard cardWidth={calcCardsWidth} />
                <ProfessionalCard cardWidth={calcCardsWidth} />
                <ProfessionalCard cardWidth={calcCardsWidth} />

            </View>
        </ScrollView>
    )
}
