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
import Initial from "../pages/initials/initial";
import FinalScreen from "../pages/initials/finalScreen";
import Home from "../pages/main/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SalaoScreen from "../pages/main/Salao";
import ScheduleFinal from "../pages/main/Salao/AgendamentoFinal";
import ScheduleConclusion from "../pages/main/Salao/AgendamentoFinal/agendamentoConcluido";
import ScheduleCancelScreen from "../pages/main/Agenda/cancelScreen";
import Filters from "../pages/main/Filter";
import ChatScreen from "../pages/main/Chat/ChatScreen";
export default function MainRoutes({navigation}: any) {
   const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Filter" component={Filters}/>
                <Stack.Screen name="Salao" component={SalaoScreen}/>
                <Stack.Screen name="ChatScreen" component={ChatScreen}/>
                <Stack.Screen name="ScheduleFinal" component={ScheduleFinal}/>
                <Stack.Screen name="ScheduleConclusion" component={ScheduleConclusion}/>
                <Stack.Screen name="ScheduleCancelScreen" component={ScheduleCancelScreen}/>
            </Stack.Navigator>






    );
}