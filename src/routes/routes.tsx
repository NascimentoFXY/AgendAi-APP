import React from "react";
import {
    View,
    Text
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Cadastro from "../pages/cadastro";
import Login from "../pages/login";
import Loading from "../pages/splash";
import InitialPrimary from "../pages/initials/initial";
import FinalScreen from "../pages/initials/finalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./homeRoutes";
import TabRoutes from "./tabRoutes";
import CompletePerfil from "pages/completePerfil";
export function CompleteProfile() {
    
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="CompletePerfil" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CompletePerfil" component={CompletePerfil} />
        </Stack.Navigator>
    )
}
export default function Routes() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Loading" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Initial" component={InitialPrimary} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Fscreen" component={FinalScreen} />

        </Stack.Navigator>
    );
}