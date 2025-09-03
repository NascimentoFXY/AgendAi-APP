import React, { useState, createContext, use, useEffect } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp } from "@firebase/firestore";

interface User {
    id: string
    name: string,
    email: string,
}
interface Salon {
    id: string,
    CNPJ: string,
    owner: User,
    name: string,
    opHour: any,
    rating: Ratings,
    specialists: Specialists[],
    services: Services[],

    
}
interface Ratings{
    sender: User,
    ratingPoint: number,
    schedule: any,
    comment: string,

}
interface Specialists{
    name: string,
    rating: any
}
interface Services{
    id: string,
    type: string
}
interface SalonContextType {
    salon: Salon,
}

export const SalonContext = createContext<SalonContextType | null>(null);

export default function SalonProvider({ children }: { children: React.ReactNode }) {

    const [salon, setSalon] = useState<Salon| null>(null)

    return (
        <SalonContext.Provider value={{
            salon: salon!,
        }}>
            {children}
        </SalonContext.Provider>
    )
}