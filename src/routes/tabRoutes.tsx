import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Ionicons, Feather, Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import FinalScreen from "../pages/initials/finalScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./homeRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator()
export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen name="Home" component={MainRoutes}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
                    tabBarButton: (props: any) => <TouchableOpacity {...props} />
                }} />


            <Tab.Screen name="Explore" component={FinalScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="location-pin" size={size} color={color} />,
                    tabBarButton: (props: any) => <TouchableOpacity {...props} />
                }} />


            <Tab.Screen name="Agendas" component={FinalScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="schedule" size={size} color={color} />,
                    tabBarButton: (props: any) => <TouchableOpacity {...props} />
                }}
            />


            <Tab.Screen name="Chat" component={FinalScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="chat" size={size} color={color} />,
                    tabBarButton: (props: any) => <TouchableOpacity {...props} />
                }} />


            <Tab.Screen name="Perfil" component={FinalScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
                    tabBarButton: (props: any) => <TouchableOpacity {...props} />
                }} />
        </Tab.Navigator>

    );
}

export const styles = StyleSheet.create({
    TabBar: {

    }
})

