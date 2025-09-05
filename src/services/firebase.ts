// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getReactNativePersistence, initializeAuth,} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore();