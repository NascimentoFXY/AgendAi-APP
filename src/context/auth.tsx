import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut as firebaseSignOut
} from "firebase/auth";
import React, { useState, useEffect, createContext, use } from "react";
import { auth } from "../services/firebase";
import { getFirestore, setDoc, doc, } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    id: string
    name: string,
    email: string,
    isProfessional?: boolean
}

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    register: (name: string, email: string, password: string) => void;
    isAuthenticated?: boolean;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    //----------------------------verifica se ja tem um usuario no asyncStorage

    //persistência
    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await AsyncStorage.getItem('@agendaiApp:user');
                if (response) {
                    const parsedResponse = JSON.parse(response);
                    setUser({
                        id: parsedResponse.uid,
                        email: parsedResponse.email,
                        name: parsedResponse.displayName,
                    })
                } else {
                    console.log("nao encontrado no AS");
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        loadUser();
    }, [])

    // -----------------Verifica se o usuario esta logado------------------------//
    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userToken = await firebaseUser.getIdToken()
                const userData = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    userToken,
                }
                setUser({
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || "",
                    email: firebaseUser.email || "",
                });
                try {
                    await AsyncStorage.setItem('@agendaiApp:user', JSON.stringify(userData));
                } catch (err) {
                    console.log("Erro ao salvar no AsyncStorage:", err);
                }
            } else {
                await AsyncStorage.removeItem('@agendaiApp:user');
                setUser(null);
            }
        });
        setLoading(false)
        return () => unsubscribe();
    }, [])

    //verifica se tem usuario
    useEffect(()=>{
        if(user){
            setLoading(false)
        }else if(user === null){
            setLoading(true)
            
        }
    },[user])
//---------------------login-----------------------------------//
    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            alert("Bem vindo, " + cred.user.displayName + "!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Falha ao fazer login. Verifique suas credenciais.");
        }
    }
//--------------------------------cadastro-------------------------//
    const register = async (name: string, email: string, password: string) => {
        setLoading(true)
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            const db = getFirestore();
            await updateProfile(cred.user, { displayName: name })
            await setDoc(doc(db, "users", cred.user.uid), {
                createdAt: new Date(),
                email: email,
                name: cred.user.displayName,
                id: cred.user.uid,
            });
            setUser({
                id: cred.user.uid,
                name: cred.user.displayName || name,
                email: cred.user.email || email,
            })
            alert("Bem vindo, " + cred.user.displayName?.split(" ")[0] + "!");
            setLoading(false)
        }
        catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Verifique suas credenciais.");
        }
    };
    //--------------------------logout------------------------//
    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };
    //---------------------------------------------------------//
    return (
        <AuthContext.Provider value={{
            user: user,
            signIn,
            signOut,
            register,
            isAuthenticated: !!user,
            loading: loading,
        }}>
            {children}
        </AuthContext.Provider>
    );
}