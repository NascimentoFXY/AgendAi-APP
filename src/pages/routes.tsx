import React from "react";
import {
    View,
    Text
} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Cadastro from "./cadastro";
import Login from "./login";
import Loading from "./loading";
import Initial from "./initials/initial";
import FinalScreen from "./initials/finalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Routes() {
   const Stack = createNativeStackNavigator();

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Loading" component={Loading}/>
                <Stack.Screen name="Initial" component={Initial}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Cadastro" component={Cadastro}/>
                <Stack.Screen name="Fscreen" component={FinalScreen}/>
            </Stack.Navigator>
        </View>





    );
}