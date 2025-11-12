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


export default function Initial1({ navigation }: any) {

    return (
        <>

            <Image style={{ flex: 3, backgroundColor: "#f5f5f5", width: "100%", marginTop: 50 }}  source={require("../../../../assets/initial1.png")}/>


            <View style={{ flex: 2 }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 20
                }}>
                    Descubra <Text style={{
                        color: colors.primary,
                    }}>salões próximos</Text> de você
                </Text>
                <Text style={{ textAlign: "center" }}>
                    Dê uma olhada nos salões que estão espalhadas ao seu redor
                </Text>
            </View>
        </>



    )


}