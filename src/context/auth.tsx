import React, { useState, useEffect, createContext } from "react";
import { useNavigation } from '@react-navigation/native';

interface user {
    name: string,
    email: string,
    password: string,
}

interface AuthContextType {
    user: user | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    register: (name: string, email: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigation = useNavigation();

    // Estado para a lista de todos os usuários cadastrados
    const [registeredUsers, setRegisteredUsers] = useState<user[]>([]);

    // Estado para o usuário logado atualmente
    const [loggedInUser, setLoggedInUser] = useState<user | null>(null);

    const signIn = (email: string, password: string) => {
        // Pesquisa o usuário na lista completa de usuários cadastrados
        console.log("Tentativa de login com:", { email, password });
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
        console.log("Pesquisando na lista de usuários:", registeredUsers);
        console.log("Usuário encontrado:", foundUser);
        if (foundUser) {
            // Define o usuário logado
            setLoggedInUser(foundUser);
            alert("Login realizado com sucesso!");
            navigation.navigate('Main' as never);

        } else {
            alert("Usuário ou senha incorretos");
        }
    };

    const signOut = () => {
        // Limpa o estado do usuário logado
        setLoggedInUser(null);
    };

    const register = (name: string, email: string, password: string) => {
        const newUser = { name, email, password };

        // Adiciona o novo usuário na lista de usuários cadastrados
        setRegisteredUsers(prevUsers => [...prevUsers, newUser]);
        setLoggedInUser(newUser); // Loga o usuário recém-cadastrado
        alert("Usuário cadastrado com sucesso!");
    };

    // O useEffect para debug agora observa a lista de registeredUsers
    useEffect(() => {
        console.log("Usuários cadastrados:", registeredUsers);
    }, [registeredUsers]);

    // Este useEffect observa o usuário logado
    useEffect(() => {
        console.log("Usuário logado:", loggedInUser);
    }, [loggedInUser]);

    return (
        <AuthContext.Provider value={{
            user: loggedInUser,
            signIn,
            signOut,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
}