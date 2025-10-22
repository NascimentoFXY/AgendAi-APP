import React, { useContext } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { styles } from '../style'
import colors, { font } from '../../../../configs/theme';
import ServiceItem from '../../../../components/Salao/ServicesScreenOptions';
import CustomButton from '../../../../components/customButton';
import { SalonContext } from '../../../../context/salonContext';
import { AuthContext } from '../../../../context/auth';
import Icon from 'configs/icons';
import {useNavigation} from '@react-navigation/native'



export default function SalaoServices() {
    const { salon, loading, isOwner } = useContext(SalonContext)!
    const { user } = useContext(AuthContext)!
    const navigation = useNavigation() as any
    return (

        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>


            {/* ServicosTitle */}
            <View style={styles.titleContainer}>
                <Text style={styles.serviceTitle}>Serviços</Text><Text style={styles.amount}>(18)</Text>
                {isOwner && (
                    <TouchableOpacity style={styles.tools} onPress={()=> navigation.navigate("EstablishmentTools")}>


                        <Icon.Entypo name='tools' size={24} color={colors.primary} />
                        <Text style={styles.amount}>Ferramentas</Text>

                    </TouchableOpacity>

                )}
            </View>
            {/* ServicosOptions */}



            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, paddingBottom: 10 }}>

                {isOwner && <Text style={{ width: "90%", fontSize: 15, fontFamily: font.poppins.bold, textAlign: "center", color: colors.lightGray, padding: 20, }}>
                    <Icon.Ionicons name="information-circle" size={20} color={colors.lightGray} />
                    Nenhum serviço adicionado. Por favor, acesse as opções de ferramentas e adicione algum serviço.
                </Text>}
                {!isOwner && <Text style={{ width: "90%", fontSize: 15, fontFamily: font.poppins.bold, textAlign: "center", color: colors.lightGray, padding: 20, }}>
                    <Icon.Ionicons name="information-circle" size={20} color={colors.lightGray} />
                    Este estabelecimento não possui serviços ativos. Contate o dono ou vá ao estabelecimento para mais informações.
                </Text>}
                <ServiceItem />

            </View>
        </ScrollView>

    )

}