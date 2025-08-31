import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/login';
import Cadastro from './src/pages/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';
import AuthProvider, { AuthContext } from './src/context/auth';
import ChatProvider from './src/context/chatContext';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useContext } from 'react';
import MainRoutes from './src/routes/homeRoutes';
import TabRoutes from './src/routes/tabRoutes';


// Import the functions you need from the SDKs you need
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

export function PrivateRoute() {
  const { isAuthenticated } = useContext(AuthContext)!;
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
