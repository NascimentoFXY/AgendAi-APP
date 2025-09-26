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
import MainScreen from "../../components/MainScreenLogo";

export default function Loading({navigation}:any) {
    const delay = 3000; // Tempo de espera em milissegundos
    const screenChange = () => {
     
        const timer = setTimeout(() => {
            navigation.navigate("Initial");
        }, delay);
        return () => clearTimeout(timer);
     
    }

    React.useEffect(() => {
        screenChange();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }}>
            <MainScreen/>
        </SafeAreaView>
    );
}