// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";

import { getAuth, getReactNativePersistence, initializeAuth, } from "firebase/auth";
import { collection, getFirestore, doc, getDoc, addDoc, setDoc } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateDoc } from "@firebase/firestore/lite";
import { useContext } from "react";
import { AuthContext } from "context/auth";

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
export async function getUserNameById(salonID: string): Promise<string | null> {
  try {
    const userDocRef = doc(db, "users", salonID); // referencia o documento específico
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

// const {user, updateUser} = useContext(AuthContext)!
export const uploadImageAndSaveToFirestore = async (imageUri: string, salonID?: string) => {
  try {
    if (!imageUri || !salonID) return console.log("algo não esta sendoo salvo");
    const response = await fetch(imageUri);
    const blob = await response.blob(); // Converte o URI da imagem em um Blob

    // Cria uma referência única no Storage (ex: 'images/salonID/timestamp_imageName.jpg')
    const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/salons/${salonID}/${Date.now()}_${imageName}`);

    // Faz o upload da imagem
    const snapshot = await uploadBytes(storageRef, blob);
    alert('Imagem carregada com sucesso!' + JSON.stringify(snapshot));

    // Obtém o URL de download público
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', downloadURL);


    return downloadURL;
  } catch (error) {
    console.error("Erro ao carregar imagem ou salvar no Firestore:", error);
    throw error;
  }
};

export const uploadUserImage = async (URI: string, userID: string) => {
  console.log("ID usuario:",userID)
  console.log("URI: ",URI)
  if (!URI || !userID) {
    console.log("deu ruim imagem do usuario")
    return
  }
  try {
    const response = await fetch(URI);
    const blob = await response.blob();
    const imageName = URI.substring(URI.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `images/users/${userID}`);

    // Faz o upload da imagem
    const snapshot = await uploadBytes(storageRef, blob);
    // alert('Imagem carregada com sucesso!' + JSON.stringify(snapshot));

    // Obtém o URL de download público
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', downloadURL);
    // updateUser({image: downloadURL, isComplete: true})
    
    return downloadURL;

  }
  catch (error) {
    console.error("Erro ao carregar imagem ou salvar no Firestore:", error);
    throw error;
  }
}