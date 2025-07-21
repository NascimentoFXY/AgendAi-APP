import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
export default function App() {
  return (
      <NavigationContainer>
        <Routes />
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
