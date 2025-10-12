import React, { useContext } from 'react';
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
import CustomButton from '../../../../components/customButton';
import { SalonContext } from '../../../../context/salonContext';
import { AuthContext } from '../../../../context/auth';




export default function SalaoServices() {
    const {salon, loading} = useContext(SalonContext)!
    const {user} = useContext(AuthContext)!
    return (

        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>


            {/* ServicosTitle */}
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 10, gap: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Serviços</Text><Text style={{ fontSize: 18, fontWeight: "bold", color: colors.primary, flex: 1 }}>(18)</Text>
            </View>
            {/* ServicosOptions */}

         
              {/* <CustomButton
                      Icon={<Ionicons name="add" size={24} color={"#fff"} />}
                      border='Circle'
                      type='absolute'
                      width={80}
                      height={80}
                      style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5", bottom: 0, right: 20 }}
                  
                  /> */}
          
            <View style={{ justifyContent: "center", alignItems: "center", gap: 10, paddingBottom: 10 }}>

                <ServiceItem />
            
            </View>
        </ScrollView>

    )

}
