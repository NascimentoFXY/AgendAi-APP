import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";

export default function Initial2({ navigation }: any) {

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}><Text>Cadastro</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>Login</Text></TouchableOpacity>
        </SafeAreaView>
    )


}