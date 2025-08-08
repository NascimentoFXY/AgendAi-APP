import React from "react";
import {
    View,
    Text
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Cadastro from "../pages/cadastro";
import Login from "../pages/login";
import Loading from "../pages/loading";
import InitialPrimary from "../pages/initials/initial";
import FinalScreen from "../pages/initials/finalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./homeRoutes";
import TabRoutes from "./tabRoutes";

export default function Routes() {
   const Stack = createNativeStackNavigator();

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Loading" component={Loading}/>
                <Stack.Screen name="Initial" component={InitialPrimary}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Cadastro" component={Cadastro}/>
                <Stack.Screen name="Fscreen" component={FinalScreen}/>
                <Stack.Screen name="Main" component={TabRoutes}/>
            </Stack.Navigator>
        </View>





    );
}