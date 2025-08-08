import React from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "../style";
import colors from "../../../configs/colors";
import { Input } from "../../../components/input";


export default function Initial2({ navigation }: any) {

    return (
        <>
        <View style={{ flex: 3, backgroundColor: "#f5f5f5", width: "100%", marginTop: 50 }}></View>
            <View style={{ flex:  2}}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 20
                }}>
                    <Text style={{color:colors.primary}}>Agendamento</Text> de uma forma mais  <Text style={{color:colors.primary}}>fácil</Text>
                </Text>
                <Text style={{textAlign:"center"}}>
                    Selecione seu salão preferido, a data disponível, e reserve seu lugar em poucas etapas.
                </Text>
            </View>
        </>
            

     
    )


}