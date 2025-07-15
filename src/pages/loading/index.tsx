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

export default function Loading({navigation}:any) {
    const delay = 2000; // Tempo de espera em milissegundos
    const screenChange = () => {
     
            navigation.navigate("Initial");
     
    }

    React.useEffect(() => {
        screenChange();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Carregando...</Text>
        </SafeAreaView>
    );
}