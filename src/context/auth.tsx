import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut as firebaseSignOut
} from "firebase/auth";
import React, { useState, useEffect, createContext, use, useContext } from "react";
import { auth } from "../services/firebase";
import { getFirestore, setDoc, doc, getDoc, } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
    id: string
    name: string,
    email: string,
    isProfessional?: boolean,
    image?: string;
    isComplete?: boolean
}

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    register: (name: string, email: string, password: string) => void;
    refreshUserData: () => Promise<void>;
    updateUser: (data: any) => void;
    setComplete: (value: boolean) => void;
    isAuthenticated?: boolean;
    loading: boolean;
    isComplete: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isComplete = !!user?.isComplete;
    const setComplete = (value: boolean) => {
        if (user) {
            const updatedUser = { ...user, isComplete: value };
            setUser(updatedUser);
            AsyncStorage.setItem('@agendaiApp:user', JSON.stringify(updatedUser));
        }
    };

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
                        isComplete: parsedResponse.isComplete,
                    })
                    setComplete(parsedResponse.isComplete);
                } else {
                    console.log("[auth]nao encontrado no AS");
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        loadUser();
    }, [])
    const refreshUserData = async () => {
        if (!user?.id) return;

        const docRef = doc(getFirestore(), "users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data() as User;
            setUser(userData);
            await AsyncStorage.setItem('@agendaiApp:user', JSON.stringify(userData));
        }
    };
    // -----------------Verifica se o usuario esta logado------------------------//
    useEffect(() => {
        setLoading(true);

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // console.log("[auth]useffect1: ", user?.isComplete)
                const db = getFirestore();
                const docRef = doc(db, "users", firebaseUser.uid);
                const docSnap = await getDoc(docRef);

                const userData = docSnap.exists()
                    ? docSnap.data() as User
                    : {
                        id: firebaseUser.uid,
                        name: firebaseUser.displayName || "",
                        email: firebaseUser.email || "",
                        isComplete: user?.isComplete ?? false
                    };

                setUser(userData);
                // console.log("[auth]useffect2: ", user?.isComplete)
                setComplete(userData.isComplete ?? false)
                await AsyncStorage.setItem('@agendaiApp:user', JSON.stringify(userData));
            } else {
                setUser(null);
                setComplete(false);
                await AsyncStorage.removeItem('@agendaiApp:user');
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    //---------------------login-----------------------------------//
    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            // alert("Bem vindo, " + cred.user.displayName + "!");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Falha ao fazer login. Verifique suas credenciais.");
            setLoading(false)
        }
    }
    //--------------------------------cadastro-------------------------//
    const register = async (name: string, email: string, password: string) => {
        setLoading(true)
        console.log("[auth]Cadastro1: ", isComplete)
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            const db = getFirestore();
            await updateProfile(cred.user, { displayName: name })
            await setDoc(doc(db, "users", cred.user.uid), {
                createdAt: new Date(),
                email: email,
                name: cred.user.displayName,
                id: cred.user.uid,
                image: "",
                isComplete: isComplete
            });
            setUser({
                id: cred.user.uid,
                name: cred.user.displayName || name,
                email: cred.user.email || email,
                isComplete: isComplete
            })
            console.log("[auth]Cadastro2: ", isComplete)
            alert("Bem vindo, " + cred.user.displayName?.split(" ")[0] + "!");
            setLoading(false)
        }
        catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Verifique suas credenciais.");
            setLoading(false)
        }
    };
    //--------------------------logout------------------------//
    const signOut = async () => {
        await firebaseSignOut(auth);
        setUser(null);
    };

    const updateUser = async (data: Partial<User>) => {
        
        try{

            setUser(prev => {
                if (!prev) return null;
                const updatedUser = { ...prev, ...data };
                
                // Atualiza Firestore e AsyncStorage usando o objeto atualizado
                const db = getFirestore();
                setDoc(doc(db, "users", prev.id), updatedUser, { merge: true });
                AsyncStorage.setItem('@agendaiApp:user', JSON.stringify(updatedUser));
                
           
                return updatedUser;
            });
        }catch(er){
            console.log(er)
        
        }
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
            refreshUserData,
            updateUser,
            setComplete,
            isComplete: user?.isComplete ?? isComplete
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuthContext(){
    const context = useContext(AuthContext)
    return context
}