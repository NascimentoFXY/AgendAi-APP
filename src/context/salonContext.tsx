import React, { useState, createContext, use, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp } from "@firebase/firestore";
import { User } from "@firebase/auth";

interface Salon {
    id?: string
    CNPJ: string,
    owner: string,
    name: string,
    opHour?: any,
    rating?: Ratings,
    specialists?: Specialists[],
    services?: Services,
    createdAt?: any,

}
interface Ratings {
    sender: string,
    ratingPoint: number,
    comment: string,

}
interface Specialists {
    id: string,
    name: string,
    rating: any
}
interface Services {
    id?: string,
    type: string
}
interface SalonContextType {
    salon: Salon | null,
    salonList: Salon[] | null,
    createSalon: (data: Salon) => void,
    loading: boolean,
}

export const SalonContext = createContext<SalonContextType | null>(null);

export default function SalonProvider({ children }: { children: React.ReactNode }) {

    const authData = useContext(AuthContext)!
    const [salon, setSalon] = useState<Salon | null>(null)
    const [loading, setLoading] = useState(false)
    const [salonList, setSalonList] = useState<Salon[]>([])
    console.log("lista de saloes", salonList, "\n")

    const createSalon = async (data: Salon) => {
        try {

            const salonRef = doc(collection(db, "salon"))
            console.log("tentando criar salão com: \n ", data.name)

            await setDoc((salonRef), {
                id: salonRef.id,
                CNPJ: data.CNPJ,
                name: data.name,
                owner: data.owner,
                opHour: data.opHour,
                createdAt: new Date(),
            })
            const serviceRef = doc(collection(db, "salon", salonRef.id, "services"))
            await setDoc((serviceRef), {
                id: serviceRef.id,
                type: data.services?.type
            })
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }
    // atualizar em tempo real
    // useEffect(() => {
    //     const q = query(collection(db, "salon"))
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         const list = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data()
    //         } as Salon))

    //         setSalonList(list)
    //         setLoading(false)
    //     })
    //     return () => unsubscribe()
    // }, [])



    return !loading && (
        <SalonContext.Provider value={{
            salon: salon!,
            createSalon,
            salonList,
            loading,

        }}>
            {children}
        </SalonContext.Provider>
    )
}