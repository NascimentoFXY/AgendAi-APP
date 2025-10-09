import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Routes, { CompleteProfile } from './src/routes/routes';
import AuthProvider, { AuthContext } from './src/context/auth';
import ChatProvider from './src/context/chatContext';
import { useContext } from 'react';
import MainRoutes from './src/routes/homeRoutes';
import TabRoutes from './src/routes/tabRoutes';
import SalonProvider from './src/context/salonContext';
import * as Font from "expo-font"
import { useEffect, useState } from 'react';
import MainScreen from './src/components/MainScreenLogo';
import { font } from 'configs/theme';
import Providers from 'context/providers/providers';

const getFonts = () => Font.loadAsync({
  'poppins-regular': require("./assets/fonts/poppins/Poppins-Regular.ttf"),
  'poppins-bold': require("./assets/fonts/poppins/Poppins-Bold.ttf"),
  'poppins-medium': require("./assets/fonts/poppins/Poppins-Medium.ttf"),
  'poppins-light': require("./assets/fonts/poppins/Poppins-Light.ttf"),
  'poppins-semibold': require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
  'poppins-italic': require("./assets/fonts/poppins/Poppins-Italic.ttf"),
  'poppins-extrabold': require("./assets/fonts/poppins/Poppins-ExtraBold.ttf"),
  'poppins-thin': require("./assets/fonts/poppins/Poppins-Thin.ttf"),
  'poppins-extralight': require("./assets/fonts/poppins/Poppins-ExtraLight.ttf"),
  'poppins-black': require("./assets/fonts/poppins/Poppins-Black.ttf"),
  'abrilFatface-regular': require("./assets/fonts/AbrilFatface/AbrilFatface-Regular.ttf")
});



export function PrivateRoute() {
  const { isAuthenticated, loading, isComplete } = useContext(AuthContext)!;
  console.log("esta completo? ", isComplete)
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  if(isAuthenticated && !isComplete){
    return(
      <>
      <CompleteProfile/>
      </>
    )
  }
  return (
    <>
      {isAuthenticated && isComplete ?
        <TabRoutes /> : <Routes />}
    </>
  )

}
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    getFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MainScreen />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Providers>
        <PrivateRoute />
      </Providers>
    </NavigationContainer>
  );

}
