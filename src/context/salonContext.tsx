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
    addres?: string,
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
    useSalon: (salonID: string) => void,
    loading: boolean,
}

export const SalonContext = createContext<SalonContextType | null>(null);

export default function SalonProvider({ children }: { children: React.ReactNode }) {

    const authData = useContext(AuthContext)!
    const [salon, setSalon] = useState<Salon | null>(null)
    const [loading, setLoading] = useState(false)
    const [salonList, setSalonList] = useState<Salon[]>([])
    const [serviceList, setServiceList] = useState<Services[]>([])
    // console.log("lista de saloes", salonList, "\n")

    // ----------------------CRIAR SALAO---------------------------------//
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

    //-------------------------------usarSalao----------------------------------//

    const useSalon = async (salonId: string)=>{
        try{
            const salonSnap = await getDoc(doc(db, "salon", salonId))
            if(salonSnap.exists()){
                const salon = {id: salonSnap.id, ...salonSnap.data()} as Salon
                setSalon(salon)

                console.log("salao encontrado: ", salon.id)
                return salon;
            }
            else{
                alert("nao foi possivel encontrar o chat")
                return null
            }
        }
        catch(err){
            console.log(err)
        }

    }
    //---------------------------------atualizar Serviços---------------------------//

    const updateServices = async ()=>{
        try{
            const serviceRef = query(collection(db, "salon", salon?.id!, "services"))
            const serviceSnap = await getDocs(serviceRef)
            if(serviceSnap){
                const list = []
                serviceSnap.docs.map((item)=>({
                  
                }))
            
            }

        }catch(err){
            console.log(err)
        }
       
    }
    // -----------------------atualizar em tempo real----------------------------------//
    useEffect(() => {
        const q = query(collection(db, "salon"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            } as Salon))

            setSalonList(list)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    //-----------------------------apagar todos saloes---------------//

    const deleteAllSalon = async () => {
        const salonRef = await getDocs(collection(db, "salon"))
        salonRef.forEach(item => {
            deleteDoc(doc(db, "salon", item.id))
        })
    }
    // deleteAllSalon()
    return !loading && (
        <SalonContext.Provider value={{
            salon: salon,
            createSalon,
            useSalon,
            salonList,
            loading,

        }}>
            {children}
        </SalonContext.Provider>
    )
}