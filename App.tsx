import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import AuthProvider from './src/context/auth';
import ChatProvider from './src/context/chatContext';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz02HFYTNFWquEMeHiniW086WgTPDqwKU",
  authDomain: "agendai-11849.firebaseapp.com",
  projectId: "agendai-11849",
  storageBucket: "agendai-11849.firebasestorage.app",
  messagingSenderId: "898182783774",
  appId: "1:898182783774:web:a601ccca18fab62fb41f0f",
  measurementId: "G-SVMZ5R8QZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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
