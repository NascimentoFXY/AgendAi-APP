import React from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import { styles } from "../style";
import colors from "../../../configs/theme";
import { Input } from "../../../components/input";


export default function Initial3({ navigation }: any) {

    return (
        <>
         <Image style={{ flex: 3, backgroundColor: "#f5f5f5", width: "100%", marginTop: 50 }}  source={require("../../../../assets/initial3.png")}/>
            <View style={{ flex:  2}}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 20
                }}>
                    <Text>Se<Text style={{color:colors.primary}}> conecte </Text>e converse com salões</Text>
                </Text>
                <Text style={{textAlign:"center"}}>
                    chats em tempo real para realizar suas consultas mais facilmente
                </Text>
            </View>
        </>
            

     
    )


}