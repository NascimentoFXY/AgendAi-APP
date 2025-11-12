// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";

import * as ImageManipulator from "expo-image-manipulator";
import { getReactNativePersistence, initializeAuth, } from "firebase/auth";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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




/** 
  Comprimi e salva uma imagem no firebase storage
*/
export const uploadImageAndSaveToFirestore = async (imageUri: string, path: string) => {
  try {
    if (!imageUri || !path) {
      console.warn("campos faltando:", imageUri, path);
      return;
    };
    let compress = 1.0;
    let compressed = await ImageManipulator.manipulateAsync(
      imageUri,
      [],
      { compress, format: ImageManipulator.SaveFormat.JPEG }
    );

    while (true) {
      console.log("[Image path recebido:", path)
      const response = await fetch(compressed.uri);
      const blob = await response.blob();

      if (blob.size <= 500 * 1024 || compress <= 0.1) {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        console.log("✅ Upload feito com", (blob.size / 1024).toFixed(1), "KB");
        return url;
      }

      compress -= 0.1;
      compressed = await ImageManipulator.manipulateAsync(
        imageUri,
        [],
        { compress, format: ImageManipulator.SaveFormat.JPEG }
      );
    }
  } catch (error) {
    console.error("Erro ao comprimir/enviar imagem:", error);
  }
};


export const uploadUserImage = async (URI: string, userID: string) => {
  console.log("[services]ID usuario:", userID)
  console.log("[services]URI: ", URI)
  if (!URI || !userID) {
    console.log("[services]deu ruim imagem do usuario")
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