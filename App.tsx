import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import AuthProvider, { AuthContext } from './src/context/auth';
import ChatProvider from './src/context/chatContext';
import { useContext } from 'react';
import MainRoutes from './src/routes/homeRoutes';
import TabRoutes from './src/routes/tabRoutes';




export function PrivateRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext)!;

  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
    <>
      {isAuthenticated ?
        <TabRoutes /> : <Routes />}
    </>
  )

}
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ChatProvider>
          <PrivateRoute />
        </ChatProvider>
      </AuthProvider>
    </NavigationContainer>
  );

}
