import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState, useEffect, createContext, use } from "react";
import { auth } from "../services/firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore";

interface User {
    id: string
    name: string,
    email: string,
}

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    register: (name: string, email: string, password: string) => void;
    isAuthenticated?: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    const signIn = async (email: string, password: string) => {

        try {

            const cred = await signInWithEmailAndPassword(auth, email, password)
            setUser({
                id: cred.user.uid,
                name: cred.user.displayName!,
                email: cred.user.email!,
            })
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Falha ao fazer login. Verifique suas credenciais.");
        }


    }

    const register = async (name: string, email: string, password: string) => {

        try {

            const cred = await createUserWithEmailAndPassword(auth, email, password);

            const db = getFirestore();
            console.log("usuario cadastrado: ", cred.user.uid)

            await updateProfile(cred.user, { displayName: name })

            await setDoc(doc(db, "users", cred.user.uid), {
                createdAt: new Date(),
                email: email,
                name: cred.user.displayName,
                id: cred.user.uid,
                senha: password
            });
            setUser({
                id: cred.user.uid,
                name: cred.user.displayName || name,
                email: cred.user.email || email,
            })


            console.log("Usuário registrado:", cred.user.email, cred.user.displayName);
            alert("Usuário registrado com sucesso!");
        }
        catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Verifique suas credenciais.");
        }
    };



    const signOut = () => {
        auth.signOut().then(() => {
            setUser(null);
        })
    };

    return (
        <AuthContext.Provider value={{
            user: user,
            signIn,
            signOut,
            register,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}