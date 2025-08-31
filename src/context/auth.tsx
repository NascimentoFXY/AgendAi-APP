import React, { useState, useEffect, createContext } from "react";

interface User {
    name: string,
    email: string,
    password: string,

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


    // Estado para a lista de todos os usuários cadastrados
    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

    // Estado para o usuário logado atualmente
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const signIn = (email: string, password: string) => {
        // Pesquisa o usuário na lista completa de usuários cadastrados
   
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
            // Define o usuário logado
            setLoggedInUser(foundUser);
            

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
            register,
            isAuthenticated: !!loggedInUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}