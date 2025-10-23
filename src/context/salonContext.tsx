import React, { useState, createContext, use, useEffect, useContext, useCallback, useMemo } from "react";
import { AuthContext } from "./auth";
import { db, uploadImageAndSaveToFirestore } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp, updateDoc } from "@firebase/firestore";
import { User } from 'context/auth'
import { DataProps } from "../pages/main/Salao/CriarSalao/compontents/forms";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface Salon {
    id?: string
    CNPJ: string,
    ownerID: string,
    ownerName: string,
    name: string,
    opHour?: any,
    rating?: any,
    addres?: string,
    specialists?: Specialist[],
    services?: Services,
    description?: string,
    createdAt?: any,
    workSchedule?: any,
    image?: any

}
export interface Rating {
    id?: any,
    sender: any,
    value: any,
    comment: string,
    image?: any,
    createdAt?: any,

}
interface Specialist {
    id: string,
    name: string,
    email: string,
    rating?: string,
    service: string,
    image?: string,
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
    image?: any;
    escala?: any;
}
interface SalonContextType {
    salon: Salon | null,
    salonList: Salon[] | null,
    ratings: Rating[],
    createSalon: () => void,
    useSalon: (salonID: string) => Promise<Salon | null | undefined>,
    fetchSalons: () => Promise<void>,
    setData: (data: DataProps) => void,
    setIsValid: (value: boolean) => void,
    addRatingToSalon: (data: Rating) => void,
    setRatingFilter?: (value: string) => void,
    getAverageRating?: (salon: Salon) => Promise<number>,
    addSpecialistToSalon?: (salonID: string, user: User, service: string) => Promise<any>
    fetchSpecialists: () => Promise<void>,
    specialistList: Specialist[],
    ratingFilter?: string,
    loading: boolean,
    isValid: boolean,
    isOwner: boolean,
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
        escala: "",
    })
    // console.log("[salon]lista de saloes", salonList, "\n")

    //----------------recebe os dados-----------------------------------//
    const setData = useCallback((data: DataProps) => {
        setInfo((prev) => ({
            ...prev,   // mantém os valores antigos
            ...data,   // sobrescreve só os que vierem no argumento
            ...(data.abertura && data.fechamento
                ? { horario: `${data.abertura}-${data.fechamento}` }
                : {}),
        }));
    }, [])
    const setIsValid = (value: boolean) => {
        setInputValid(value)
    }
    // ----------------------CRIAR SALAO---------------------------------//
    const createSalon = useCallback(async () => {

        if (isInputValid) {
            try {
                const salonRef = doc(collection(db, "salon"))
                const userRef = doc(db, "users", user?.id!)
                // console.log("[salon]tentando criar salão com: \n ", info.nome, info.cnpj, info.cep)
                await setDoc((salonRef), {
                    id: salonRef.id,
                    CNPJ: info.cnpj,
                    name: info.nome,
                    ownerID: user?.id,
                    ownerName: user?.name,
                    image: await uploadImageAndSaveToFirestore(info.image, salonRef.id),
                    opHour: info?.horario,
                    addres: `${info.rua}, ${info.bairro}, ${info.cidade}, ${info.cep}`,
                    description: info.especialidades,
                    workSchedule: info.escala, // exemplo de escala de trabalho em inglês
                    createdAt: new Date(),
                    rating: 5.0,
                })

                await updateDoc((userRef), {
                    ownerOf: salonRef.id
                })
                useSalon(salonRef.id)
                alert(`${info.nome} Foi criado com sucesso!`)
                navigation.navigate("Salao")
            } catch (err) {
                console.log(err)
            }

        }
        else {
            alert("preencha todos os campos")
        }
    }, [])

    //---------------------------------atualizar Serviços---------------------------//
    /*async function addServicesToSalon(data: Services) {
        const serviceRef = doc(collection(db, "salon", salon?.id!, "services"))
        await setDoc((serviceRef), {
            id: serviceRef.id,
            type: data.services?.type
        })
    }*/
    //--------------------------------adicionar avaliação--------------------------//
    const addRatingToSalon = useCallback(async (data: Rating) => {
        const RatingseRef = doc(collection(db, "salon", salon?.id!, "ratings"))
        try {
            await setDoc((RatingseRef), {
                id: RatingseRef.id,
                comment: data.comment,
                sender: data.sender,
                value: data.value,
                image: data?.image,
                createdAt: serverTimestamp()
            })
            fetchSalonRatings(salon?.id!)
        } catch (err) {
            console.log("[salon]erro ao adicionar avaliação: ", err)
        }
    }, [])
    //-------------------------------usarSalao----------------------------------//
    const useSalon = useCallback(async (salonId: string) => {
        console.log("salao usado.")
        setLoading(true)
        if (!salonId) return
        try {
            const salonSnap = await getDoc(doc(db, "salon", salonId))
            if (salonSnap.exists()) {
                const salon = { id: salonSnap.id, ...salonSnap.data() } as Salon
                setSalon(salon)
                setLoading(false)
                fetchSalonRatings(salonId); // Buscar avaliações ao selecionar um salão

                // console.log("[salon]salao encontrado: ", salon.id)
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

    }, [])

    //=============================SESSÃO DOS ESPECIALISTAS===================================//
    const [especialistaList, setEspecialistaList] = useState<Specialist[]>();
    //----------------------------adicionar especialista------------------//
    const addSpecialistToSalon = useCallback(async (salonID: string, user: User, service: string) => {
        try {
            // Referência direta ao documento do especialista
            const specialistRef = doc(db, "salon", salonID, "specialists", user.id);

            // Dados a serem salvos
            const specialistData: User | { service: string } = {
                id: user.id,
                name: user.name,
                email: user.email,
                service: service,

                image: user.image,
            };

            // Cria (ou substitui) o documento
            await setDoc(specialistRef, specialistData);

            console.log(`✅ ${user.name} foi adicionado como especialista no salão ${salonID}`);
            return { success: true };
        } catch (error) {
            console.error("❌ Erro ao adicionar especialista:", error);
            return { success: false, error };
        }
    }, [])

    const fetchSpecialists = useCallback(async () => {
        if (!salon?.id) return
        try {
            const specialistRef = collection(db, "salon", salon?.id!, "specialists")
            const q = query(specialistRef, orderBy("name", "desc"));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) return;
            const specialists = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as { name: string, email: string, service: string }
            }))
            setEspecialistaList(specialists)
        } catch (er) {
            console.error("[establishmentEspecialist] ", er)
        }
    }, [salon?.id])
    //=============================FIM-SESSÃO DOS ESPECIALISTAS===================================//
    // --------------------Busca avaliações---------------------------------------------//
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [ratingFilter, setRatingFilter] = useState<string>("desc");
    useEffect(() => {
        fetchSalonRatings(salon?.id!);
    }, [ratingFilter])

    const fetchSalonRatings = useCallback(async (salonId: string) => {
        if (!salonId) return;

        try {
            const ratingsRef = collection(db, "salon", salonId, "ratings");
            if (ratingFilter === "withPhotos") {
                const q = query(ratingsRef, orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const ratingsList = snapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Rating))
                    .filter(rating => !!rating.image);
                setRatings(ratingsList);
                return; // evita execução duplicada abaixo
            }
            const q = query(ratingsRef, orderBy("createdAt", ratingFilter as ("asc" | "desc")));
            // Filtra apenas avaliações que possuem imagem
            const snapshot = await getDocs(q);
            const ratingsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Rating));
            setRatings(ratingsList);
        } catch (err) {
            console.error("Erro ao buscar avaliações:", err);
        }
    }, []);
    //-----------------------media de avaliações------------------------------//
    const getAverageRating = useCallback(async (salon: Salon): Promise<number> => {
        try {
            if (!salon.id) return 0;
            const ratingsRef = collection(db, "salon", salon.id, "ratings");
            const snapshot = await getDocs(ratingsRef);

            if (!snapshot || snapshot.empty) return 0;

            // Pega apenas o campo value de cada rating e garante que seja número
            const ratings = snapshot.docs.map(doc => {
                const data = doc.data() as Rating;
                return Number(data.value) || 0;
            });
            if (ratings.length === 0) return 0;

            const total = ratings.reduce((sum, value) => sum + value, 0);

            return total / ratings.length;
        } catch (err) {
            console.error("Erro ao calcular média de avaliações:", err);
            return 0;
        }
    }, []);

    // -----------------------atualizar----------------------------------//
    useEffect(() => {
        fetchSalons();
    }, []);
    const fetchSalons = useCallback(async () => {
        try {
            const q = query(collection(db, "salon"));
            const snapshot = await getDocs(q);

            const list: Salon[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Salon[];

            setSalonList(list);
        } catch (error) {
            console.error("Erro ao buscar salões:", error);
        } finally {
            setLoading(false);
        }
    }, []);


    //-----------------------------apagar todos saloes (Modo de teste apenas)---------------//

    const deleteAllSalon = async (): Promise<void> => {
        try {
            const snapshot = await getDocs(collection(db, "salon"));

            const deletePromises = snapshot.docs.map((item) =>
                deleteDoc(doc(db, "salon", item.id))
            );

            await Promise.all(deletePromises);

            console.log("[salon]Todos os documentos da coleção 'salon' foram deletados com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar documentos:", error);
        }
    };
    // deleteAllSalon()
    const values = {
        salon: salon,
        ratings: ratings,
        salonList,
        loading,
        isValid: isInputValid,
        ratingFilter: ratingFilter,
        specialistList: especialistaList || [],
        isOwner: salon?.ownerID === user?.id,
    }
    const dependences = {
        salon,
        ratings,
        salonList,
        loading,
        isInputValid,
        ratingFilter,
        especialistaList,
        user: user?.id,
    };
    const functions = {
        createSalon,
        useSalon,
        setData,
        setIsValid,
        addRatingToSalon,
        setRatingFilter: setRatingFilter,
        getAverageRating,
        addSpecialistToSalon,
        fetchSpecialists,
        fetchSalons,
    }

    return (
        <SalonContext.Provider value={React.useMemo(
            () => ({
                ...values,
                ...functions
            }),
            Object.values(dependences)
        )}>
            {children}
        </SalonContext.Provider>
    )
}
export function useSalonContext() {
    const context = useContext(SalonContext);
    if (context) return context;
}