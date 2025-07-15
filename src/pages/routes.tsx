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

export default function Routes() {
    const Drawer = createDrawerNavigator();
    return (
        <View style={{ flex: 1 }}>
            <Drawer.Navigator initialRouteName="Loading">
                <Drawer.Screen name="Loading" component={Loading} options={{headerShown:false}} />
                <Drawer.Screen name="Initial" component={Initial} options={{headerShown:false}} />
                <Drawer.Screen name="Login" component={Login} options={{headerShown:false}} />
                <Drawer.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}}/>
            </Drawer.Navigator>
        </View>





    );
}