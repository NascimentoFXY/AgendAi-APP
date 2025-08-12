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




export default function SalaoServices() {
    return (

        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>


            {/* ServicosTitle */}
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Serviços</Text><Text style={{ fontSize: 18, fontWeight: "bold", color: colors.primary, flex: 1 }}>(18)</Text>
            </View>
            {/* ServicosOptions */}
            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, paddingBottom: 10 }}>

                <ServiceItem />
                <ServiceItem />
                <ServiceItem />
                <ServiceItem />
                <ServiceItem />

            </View>
        </ScrollView>

    )

}
