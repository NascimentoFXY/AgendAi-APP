import React, { useState, createContext, use, useEffect, useContext } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp } from "@firebase/firestore";
import { User } from "@firebase/auth";
import { DataProps } from "../pages/main/Salao/CriarSalao/compontents/forms";
import { useNavigation, NavigationProp } from "@react-navigation/native";

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
    description?: string,
    createdAt?: any,
    image?: any

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
    type: any
}
interface Info {
    nome: string,
    especialidades: string,
    cep?: string;
    cnpj?: string;
    numero?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    horario?: string;
    image?: any
}
interface SalonContextType {
    salon: Salon | null,
    salonList: Salon[] | null,
    createSalon: () => void,
    useSalon: (salonID: string) => void,
    setData: (data: DataProps) => void,
    setIsValid: (value: boolean) => void,
    loading: boolean,
    isValid: boolean,
}


export const SalonContext = createContext<SalonContextType | null>(null);

// Define your stack param list to include the "Salao" route
type RootStackParamList = {
    Salao: undefined;
    // ...other routes if needed
};

export default function SalonProvider({ children }: { children: React.ReactNode }) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { user } = useContext(AuthContext)!
    const authData = useContext(AuthContext)!
    const [salon, setSalon] = useState<Salon | null>(null)
    const [loading, setLoading] = useState(false)
    const [salonList, setSalonList] = useState<Salon[]>([])
    const [serviceList, setServiceList] = useState<Services[]>([])
    const [isInputValid, setInputValid] = useState(false)
    const [info, setInfo] = useState<Info>({
        cep: "",
        nome: "",
        especialidades: "",
        rua: "",
        bairro: "",
        cidade: "",
        horario: "",
        image: "",
    })
    // console.log("lista de saloes", salonList, "\n")

    //----recebe os dados-----------------------------------//
    const setData = (data: DataProps) => {
        setInfo((prev) => ({
            ...prev,   // mantém os valores antigos
            ...data,   // sobrescreve só os que vierem no argumento
            ...(data.abertura && data.fechamento
                ? { horario: `${data.abertura}-${data.fechamento}` }
                : {}),
        }));
    }

    useEffect(() => {
        console.log(info)
    }, [info])
    const setIsValid = (value: boolean) => {
        setInputValid(value)
    }
    // ----------------------CRIAR SALAO---------------------------------//
    const createSalon = async () => {

        if (isInputValid) {
            try {
                const salonRef = doc(collection(db, "salon"))
                console.log("tentando criar salão com: \n ", info.nome, info.cnpj, info.cep)
                await setDoc((salonRef), {
                    id: salonRef.id,
                    CNPJ: info.cnpj,
                    name: info.nome,
                    ownerID: user?.id,
                    ownerName: user?.name,
                    opHour: info?.horario,
                    addres: `${info.rua}, ${info.bairro}, ${info.cidade}`,
                    description: info.especialidades,
                    image: info.image,
                    createdAt: new Date(),
                })
                useSalon(salonRef.id)
                alert(`${info.nome} Foi criado com sucesso!`)
                navigation.navigate("Salao")
            } catch (err) {
                console.log(err)
            }
            
        }
        else{
            alert("preencha todos os campos")
        }
    }

    //---------------------------------atualizar Serviços---------------------------//
    async function addServicesToSalon(data: any) {
        const serviceRef = doc(collection(db, "salon", salon?.id!, "services"))
        await setDoc((serviceRef), {
            id: serviceRef.id,
            type: data.services?.type
        })
    }
    //-------------------------------usarSalao----------------------------------//
    const useSalon = async (salonId: string) => {
        setLoading(true)
        try {
            const salonSnap = await getDoc(doc(db, "salon", salonId))
            if (salonSnap.exists()) {
                const salon = { id: salonSnap.id, ...salonSnap.data() } as Salon
                setSalon(salon)
                setLoading(false)


                console.log("salao encontrado: ", salon.id)
                return salon;
            }
            else {
                alert("nao foi possivel encontrar o chat")
                setLoading(false)
                return null
            }
        }
        catch (err) {
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
    return (
        <SalonContext.Provider value={{
            salon: salon,
            createSalon,
            useSalon,
            setData,
            salonList,
            loading,
            isValid: isInputValid,
            setIsValid,

        }}>
            {children}
        </SalonContext.Provider>
    )
}