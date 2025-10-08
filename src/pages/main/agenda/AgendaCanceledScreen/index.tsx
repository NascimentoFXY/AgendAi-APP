import CustomButton from 'components/customButton';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ScheduleCancelConclusion({navigation}: any) {
  return (
        <View style={styles.container2}>

<CustomButton
                Icon={<Icon.Ionicons name="arrow-back" size={24} color={colors.lightGray}/>}
                border='Circle'
                type='absolute'
                width={50}
                height={50}
                top={20}
                left={20}
                style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                onPress={() => navigation.popToTop()}
            />
            <View style={styles.conclusionIconContainer} >
                <Icon.Entypo name='check' size={80} color={colors.background}/>
            </View>
            <Text style={styles.title}>Agendamento Cancelado!</Text>
            <Text>Seu agendamento foi Cancelado com sucesso.</Text>
            <View style={styles.Tab2}>
                <TouchableOpacity
                    onPress={() => navigation.popToTop()}
                    style={styles.TabBarButton2}>
                    <Text style={{ color: colors.primary, fontWeight: "bold" }}>Retornar à tela principal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
import colors from "../../../../configs/theme";
import Icon from 'configs/icons';
export const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        flex: 1
    },
    container2:{
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    TabBarButton: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 210
    },
    TabBarButton2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    Tab: {
        position: "absolute",
        width: "100%",
        padding: 30,
        backgroundColor: colors.background,
        height: 120,
        bottom: 0,
        borderTopColor: "#a5a5a555",
        borderTopWidth: 1
    },
    Tab2: {
        position: "absolute",
        width: "100%",
        padding: 30,
        height: 150,
        bottom: 0,
    },
    TopCurve: {
        position: "absolute",
        top: -50,
        width: "150%",
        height: 150,
        backgroundColor: "#D97171",
        borderBottomLeftRadius: "100%",
        borderBottomRightRadius: "100%",
    },
    contentContainer:{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    content:{
   
        padding: 20,
        borderWidth: 0.9,
        borderRadius: 20,
        borderColor: "#0000000f",
        height: 500,
        gap: 20,
        backgroundColor: colors.background,
        justifyContent: 'space-around',
        boxShadow: "#0000",
        elevation: 2,
    },
    label:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#a0a0a0"
    },
    label2:{
        fontSize: 16,
        fontWeight: "bold",
        
    },
    labelContainer:{
        justifyContent: "space-between",
        flexDirection: "row"
    },
    title:{
        fontSize: 26,
        fontWeight: "bold"
    },
    conclusionIconContainer:{
        width: 150,
        height: 150,
        backgroundColor: colors.primary,
        borderRadius: 150,
        justifyContent: "center",
        alignItems: "center"
    }
})