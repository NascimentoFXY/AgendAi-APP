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
import colors from '../../../../configs/theme';
import ServiceItem from '../../../../components/Salao/ServicesScreenOptions';
import ProfessionalCard from '../../../../components/Salao/EspecialistaScreen';


const width = Dimensions.get("window").width;
const calcCardsWidth = (width / 2) - 40;


export default function SalaoEspecialistas() {
    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

            {/* EspecialistasTitle */}
            <View style={styles.titleContainer}>
                <Text style={styles.serviceTitle}>Especialistas</Text><Text style={styles.amount}>(5)</Text>
            </View>
            {/* EspecialistasOptions */}
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 10
            }}>

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
