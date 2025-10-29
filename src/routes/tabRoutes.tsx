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
import Agenda from "../pages/main/agenda";
import Chat from "../pages/main/Chat";
import Explore from "../pages/main/Explore";
import Perfil from "../pages/main/tabPerfil/perfilOptionsList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./homeRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../configs/theme";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSalonContext } from "context/salonContext";


const Tab = createBottomTabNavigator()
export default function TabRoutes() {

    const hiddenTabRoutes = [
        "ScheduleFinal",
        "ScheduleConclusion",
        "Filter",
        "ScheduleCancelScreen",
        "ScheduleCancelConclusion",
        "Scheduling",
        "ChatScreen",
        "CreateSalon",
        "EstablishmentTools",
        "UserProfile",
    ];
    const { isOwner } = useSalonContext()!;
    const CustomTabBarButton = (props: any) => (
        <TouchableOpacity
            {...props}
            activeOpacity={0.7}
            style={[
                styles.tabBarButton,
                props.style,
            ]}
        />
    );

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            
            tabBarStyle: {
                justifyContent: "center",
                alignItems: 'center',

            },
            tabBarItemStyle: {
                paddingTop: 10,
            },
            tabBarActiveTintColor: colors.primary,

        }}>

            

            <Tab.Screen
                name="Home"
                component={MainRoutes}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

                    const hideTab =
                        hiddenTabRoutes.includes(routeName) ||
                        (routeName === "Salao" && !isOwner);

                    return {
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="home" size={size} color={color} />
                        ),
                        tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
                        tabBarStyle: hideTab ? { display: "none" } : undefined,
                        unmountOnBlur: true,
                    };
                }}
            />


            <Tab.Screen name="Explore" component={Explore}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="location-pin" size={size} color={color} />,
                    tabBarButton: (props: any) => <CustomTabBarButton {...props} />
                }} />


            <Tab.Screen name="Agendas" component={Agenda}
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="schedule" size={size} color={color} />,
                    tabBarButton: (props: any) => <CustomTabBarButton {...props} />
                }}
            />


            <Tab.Screen name="Chat" component={Chat}
                options={{
                    tabBarIcon: ({ color, size }) => <Entypo name="chat" size={size} color={color} />,
                    tabBarButton: (props: any) => <CustomTabBarButton {...props} />
                }} />


            <Tab.Screen name="Perfil" component={Perfil}
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
                    tabBarButton: (props: any) => <CustomTabBarButton {...props} />
                }} />
        </Tab.Navigator>

    );
}

export const styles = StyleSheet.create({
    tabBarButton: {

    }
})

