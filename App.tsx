import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import AuthProvider from './src/context/auth';
import ChatProvider from './src/context/chatContext';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ChatProvider>

          <Routes />
        </ChatProvider>
      </AuthProvider>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
