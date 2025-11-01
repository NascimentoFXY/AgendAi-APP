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
    cupons?: Cupon[],
    melhorCupom?: any

}
interface Cupon {
    codigo?: string,
    dataFim?: string,
    dataInicio?: string,
    descricao?: string,
    id: string,
    nome: string,
    salonID: string,
    tipoValor?: "porcentagem" | "fixo",
    valor: number
}
export interface Rating {
    id?: any,
    sender?: User,
    value: any,
    comment: string,
    image?: any,
    createdAt?: any,
    salonName?: string,
    salonID?: string,

}
interface Specialist {
    id: string,
    name: string,
    email: string,
    rating?: string,
    service: string,
    image?: string,
}


export interface Services {
    id?: any,
    serviceType?: any,
    quantity?: any,
    types: {
        itemId?: string,
        itemDescription: string
        itemPrice: string;
    }[]
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
    createSalon: () => Promise<void>,
    useSalon: (salonID: string) => Promise<void>,
    fetchSalons: () => Promise<void>,
    setData: (data: DataProps) => void,
    setIsValid: (value: boolean) => void,
    addRatingToSalon: (data: Rating) => void,
    setRatingFilter?: (value: string) => void,
    getAverageRating?: (salon: Salon) => Promise<number>,
    addSpecialistToSalon?: (salonID: string, user: User, service: string) => Promise<any>
    fetchSpecialists: () => Promise<void>,
    addServicesToSalon: (data: Services) => Promise<void>,
    updateServices: (data: Services) => Promise<void>,
    deleteService: (data: Services) => Promise<void>,
    fetchServices: () => Promise<void>,
    fetchCupons: () => Promise<void>,
    specialistList: Specialist[],
    ratingFilter?: string,
    serviceList: Services[]
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
    const [cuponList, setCuponList] = useState<Cupon[]>([]);

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
            if (!info.image && isInputValid) {
                alert("Por favor, selecione uma imagem para o salão.")
                setIsValid(false)
                return
            }
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
                navigation.navigate("Home")
                navigation.navigate("Salao")
                alert(`${info.nome} Foi criado com sucesso!`)

            } catch (err) {
                setIsValid(false)
                console.log(err)
            }

        }
        else {
            alert("preencha todos os campos")
        }
    }, [isInputValid, info])

    //---------------------------------atualizar Serviços---------------------------//
    const addServicesToSalon = useCallback(async (data: Services) => {
        const serviceRef = doc(collection(db, "salon", salon?.id!, "services"))
        console.log(data)
        try {
            const newService = {
                id: serviceRef.id,
                serviceType: data.serviceType,
                quantity: data.quantity,
                types: data.types,
            };
            await setDoc(serviceRef, newService)
            setServiceList(prev => [...prev, newService])
        } catch (er) {
            console.error(er)
        }
    }, [salon?.id])

    const updateServices = useCallback(async (data: Services) => {
        if (!salon?.id || !data.id) {
            console.error("❌ Faltando ID do salão ou do serviço");
            return;
        }

        const serviceRef = doc(db, "salon", salon.id, "services", data.id);

        try {
            await updateDoc(serviceRef, {
                ...data,
                updatedAt: new Date(), // opcional: útil pra controle de atualização
            });
            console.log("✅ Serviço atualizado:", data.id);
        } catch (er) {
            console.error("Erro ao atualizar serviço:", er);
        }
    }, [salon?.id]);
    const deleteService = useCallback(async (data: Services) => {
        if (!salon?.id || !data.id) {
            console.error("❌ Faltando ID do salão ou do serviço");
            return;
        }
        const serviceRef = doc(db, "salon", salon.id, "services", data.id);
        try {
            await deleteDoc(serviceRef);
            console.log("✅ Serviço deletado:", data.id);
        } catch (er) {
            console.error("Erro ao deletar serviço:", er);
        }
    }, [salon?.id]);

    const fetchServices = useCallback(async () => {
        if (!salon?.id) return
        try {
            const servicesRef = collection(db, "salon", salon?.id!, "services")
            const q = query(servicesRef, orderBy("quantity", "desc"));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setServiceList([])
                return
            };
            const services = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Services
            }))
            setServiceList(services)
        } catch (er) {
            console.error("[establishmentEspecialist] ", er)
        }
    }, [salon?.id])
    //--------------------------------adicionar avaliação--------------------------//
    const addRatingToSalon = useCallback(async (data: Rating) => {
        const RatingseRef = doc(collection(db, "salon", salon?.id!, "ratings"))
        try {
            await setDoc((RatingseRef), {
                id: RatingseRef.id,
                comment: data.comment,
                senderID: data.sender?.id,
                sender: data.sender,
                value: data.value,
                image: data?.image,
                salonName: salon?.name,
                salonID: salon?.id,
                createdAt: serverTimestamp()
            })
            fetchSalonRatings(salon?.id!)
        } catch (err) {
            console.log("[salon]erro ao adicionar avaliação: ", err)
        }
    }, [salon?.id!, salon?.name])
    //-------------------------------usarSalao----------------------------------//

    const loadSalonData = useCallback(async (salonId: string) => {
        if (!salonId) return;
        setLoading(true);

        try {
            // 1️⃣ Pega o salão principal
            const salonSnap = await getDoc(doc(db, "salon", salonId));
            if (!salonSnap.exists()) {
                console.warn("Salão não encontrado!");
                setLoading(false);
                return;
            }

            const salonData = { id: salonSnap.id, ...salonSnap.data() } as Salon;
            setSalon(salonData);

            // 2️⃣ Pega as coleções relacionadas em paralelo
            const [ratingsSnap, servicesSnap, specialistsSnap] = await Promise.all([
                getDocs(collection(db, "salon", salonId, "ratings")),
                getDocs(collection(db, "salon", salonId, "services")),
                getDocs(collection(db, "salon", salonId, "specialists")),
            ]);

            // 3️⃣ Converte tudo pra estado
            setRatings(ratingsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Rating)));
            setServiceList(servicesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Services)));
            setEspecialistaList(specialistsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Specialist)));

        } catch (err) {
            console.error("Erro ao carregar dados do salão:", err);
        } finally {
            // 4️⃣ Só aqui marcamos como carregado
            setLoading(false);
        }
    }, []);

    const useSalon = useCallback(async (salonId: string) => {
        await loadSalonData(salonId)
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
    }, [ratingFilter]);
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
    // Estado para armazenar os cupons

    // Função para buscar cupons de um salão específico
    const fetchCupons = useCallback(async (salonId?: string) => {
        try {
            const id = salonId || salon?.id;
            if (!id) return;

            const cuponsRef = collection(db, "salon", id, "cupons");
            const snapshot = await getDocs(cuponsRef);

            const cupons = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Cupon[];

            setCuponList(cupons);
        } catch (error) {
            console.error("Erro ao buscar cupons:", error);
        }
    }, [salon?.id]);




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
        serviceList: serviceList,
        cuponList: cuponList
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
        addServicesToSalon,
        updateServices,
        deleteService,
        fetchServices,
        fetchCupons,

    }

    return (
        <SalonContext.Provider value={useMemo(
            () => ({
                ...values,
                ...functions
            }),
            [
                salon,
                ratings,
                salonList,
                loading,
                isInputValid,
                ratingFilter,
                especialistaList,
                user?.id
            ]
        )}>
            {children}
        </SalonContext.Provider>
    )

}
export function useSalonContext() {
    const context = useContext(SalonContext);
    if (context) return context;
}