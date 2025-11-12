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
import Initial from "../pages/initials/initial";
import FinalScreen from "../pages/initials/finalScreen";
import Home from "../pages/main/home/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SalaoScreen from "../pages/main/Salao/modal";
import ScheduleFinal from "../pages/main/Salao/AgendamentoFinal";
import ScheduleConclusion from "../pages/main/Salao/AgendamentoFinal/agendamentoConcluido";
import ScheduleCancelScreen from "../pages/main/agenda/cancelScreen";
import Filters from "../pages/main/Filter";
import ChatScreen from "../pages/main/Chat/ChatScreen";
import ChatProvider from "../context/chatContext";
import UserSettings from "../pages/main/settings";
import CreateSalon from "../pages/main/Salao/CriarSalao";
import AddRating from "../pages/main/Salao/modal/AddRating";
import ScheduleCancelConclusion from "pages/main/agenda/AgendaCanceledScreen";
import Scheduling from "pages/main/Salao/modal/Agendamento/agendamento";
import CompletePerfil from "pages/completePerfil";
import Location from "pages/main/location";
import UserEstablishment from "pages/main/UserEtablishment/establishmentList";
import EstablishmentTools from "pages/main/UserEtablishment/establishmentTools";
import NotificationScreen from "pages/main/notification/notification";
import MarketingTools from "pages/main/UserEtablishment/marketingTools";
import Catalogo from "pages/catalogo/catalogo";
import UserProfile from "pages/main/tabPerfil/userProfile/userProfile";
import InfoEspecialista from "pages/main/Salao/Especialistas/infoEspecialista";
import Assinatura from "pages/assinatura/assinatura";
export default function MainRoutes({ navigation }: any) {
    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="Filter" component={Filters} />
            <Stack.Screen name="Salao" component={SalaoScreen} />
            <Stack.Screen name="InfoEspecialista" component={InfoEspecialista} />
            <Stack.Screen name="CreateSalon" component={CreateSalon} />
            <Stack.Screen name="AddRating" component={AddRating} />
            <Stack.Screen name="Settings" component={UserSettings} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="Scheduling" component={Scheduling} />
            <Stack.Screen name="ScheduleFinal" component={ScheduleFinal} />
            <Stack.Screen name="ScheduleConclusion" component={ScheduleConclusion} />
            <Stack.Screen name="ScheduleCancelScreen" component={ScheduleCancelScreen} />
            <Stack.Screen name="UserEstablishment" component={UserEstablishment} />
            <Stack.Screen name="EstablishmentTools" component={EstablishmentTools} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="MarketingTools" component={MarketingTools} />
            <Stack.Screen name="Catalogo" component={Catalogo} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Assinatura" component={Assinatura} />

            <Stack.Screen name="ScheduleCancelConclusion" component={ScheduleCancelConclusion} />
        </Stack.Navigator>
    );
}