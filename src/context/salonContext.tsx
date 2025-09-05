import React, { useState, createContext, use, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp } from "@firebase/firestore";

interface Salon {
    id: string,
    CNPJ: string,
    owner: string,
    name: string,
    opHour: any,
    rating: Ratings
}
interface Ratings{
    sender: string,
    ratingPoint: number,
    schedule: any,
    comment: string,
    
}
interface SalonContextType {
    salon: Salon | null,
    createSalon: (name: string, CNPJ: string) => void
}

export const SalonContext = createContext<SalonContextType | null>(null);

export default function SalonProvider({ children }: { children: React.ReactNode }) {
    
    const authData = useContext(AuthContext)!
    const [salon, setSalon] = useState<Salon| null>(null)
    
    const createSalon = async ({name, CNPJ}: any)=>{
        const salonRef = doc(collection(db, "salon"))
        try{
            await setDoc(salonRef, {
                id: salonRef.id,
                name: name,
                owner: authData.user?.id,
                CNPJ: CNPJ,
            })
            
        }catch(err){
            console.log(err)
        }
    }
    return (
        <SalonContext.Provider value={{
            salon: salon!,
            createSalon,

        }}>
            {children}
        </SalonContext.Provider>
    )
}