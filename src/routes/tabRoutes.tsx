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
import Perfil from "../pages/main/Perfil";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./homeRoutes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../configs/theme";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Tab = createBottomTabNavigator()
export default function TabRoutes() {

    const CustomTabBarButton = (props: any) => (
        <TouchableOpacity
            {...props}
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

            <Tab.Screen name="Home" component={MainRoutes}
                options={({ route }) => ({
                    tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
                    tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
                    tabBarStyle: ((route) => {

                        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
                        if (routeName === 'Salao' ||
                            routeName === 'ScheduleFinal' ||
                            routeName === 'ScheduleConclusion'||
                            routeName === 'Filter'||
                            routeName === 'ScheduleCancelScreen'||
                            routeName === 'ScheduleCancelConclusion'||
                            routeName === 'Scheduling'||
                            routeName === 'ChatScreen'||
                            routeName === 'CreateSalon'
                        ) {
                            return { display: 'none' };
                        }
                        return;
                    })(route),

                })
                } />


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

