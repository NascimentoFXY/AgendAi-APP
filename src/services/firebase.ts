// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";

import { getAuth, getReactNativePersistence, initializeAuth,} from "firebase/auth";
import { collection, getFirestore, doc, getDoc } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);
export const db = getFirestore();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export async function getUserNameById(userId: string): Promise<string | null> {
  try {
    const userDocRef = doc(db, "users", userId); // referencia o documento específico
    const userDoc = await getDoc(userDocRef);    // pega o documento
    if (userDoc.exists()) {
      const data = userDoc.data();
      return data?.name ?? null;                 // retorna o nome ou null
    }
    return null;
  } catch (error) {
    console.error("Error fetching user name:", error);
    return null;
  }
}