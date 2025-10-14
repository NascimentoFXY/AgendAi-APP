import React, { useState, createContext, use, useEffect } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp, } from "@firebase/firestore";
interface message {
    chatID?: string;
    id?: string,
    message?: string,
    sender?: string,
    senderID?: string,
    time?: any,
    senderImage?: string,
    messageImage?: string

}
interface Chat {
    id: string;
    senderID: string,
    senderName: string,
    targetID: string,
    targetName: string,
    public?: boolean;
    createdAt: any;
}


interface ChatContextType {
    chat: Chat,
    messages: message[];
    addMessage: (message: string, chatID: string, image?: string) => Promise<void>;
    useChat: (ChatID: string) => Promise<Chat | null>,
    exitChat: () => void,
    createChat: (senderID: string, targetID: string, senderName: string, targetName: string) => Promise<string | undefined>;
    deleteAllChats: () => void;
    chatList: Chat[] | null;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ children }: { children: React.ReactNode }) {

    const { user } = React.useContext(AuthContext)!;
    const [messages, setMessages] = useState<message[]>([]);

    const [chatList, setChatList] = useState<Chat[] | null>([]);
    const [chat, setChat] = useState<Chat | null>(null)


    const createChat = async (senderID: string, targetID: string, senderName: string, targetName: string) => {
        try {
            const chatRef = doc(collection(db, "chats"));
            const docRef = await setDoc((chatRef), {
                id: chatRef.id,
                senderID: senderID,
                targetID: targetID,
                senderName: senderName,
                targetName: targetName,
                createdAt: new Date(),
                public: false,
            });
            // alert("Chat criado com sucesso! " + chatRef.id);
            return chatRef.id
        } catch (error) {

            console.error("Erro ao criar chat:", error);
            alert("Erro ao criar chat. Tente novamente.");
        }
    }


    // Função que apaga toda a coleção "chats" e suas subcoleções
    const deleteAllChats = async () => {
        try {
            // busca todos os chats
            const chatsSnapshot = await getDocs(collection(db, "chats"));

            for (const chat of chatsSnapshot.docs) {
                // pega a subcoleção "messages" (ajuste o nome conforme sua estrutura)
                const messagesRef = collection(db, "chats", chat.id, "messages");
                const messagesSnap = await getDocs(messagesRef);

                // apaga cada mensagem
                for (const message of messagesSnap.docs) {
                    await deleteDoc(doc(db, "chats", chat.id, "messages", message.id));
                }

                // depois apaga o chat
                await deleteDoc(chat.ref);
            }
        } catch (error) {
            console.error("Erro ao apagar chats:", error);
        }
    };
    // ============carregar chats=================================//
    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedChats: any = [];
            querySnapshot.forEach((doc) => {
                fetchedChats.push({
                    id: doc.id, ...doc.data()
                })
            })
            setChatList(fetchedChats)
            // console.log("[chat] Chats carregados: ", fetchedChats.map((doc: Chat) => (doc.id)))
        })
        return () => unsubscribe()


    }, [user])

    //------------ao apertar no chat--------------------//
    const useChat = async (chatID: any) => {
        try {
            const chatRef = doc(db, "chats", chatID);
            const chatSnap = await getDoc(chatRef);

            if (chatSnap.exists()) {
                const chat = { id: chatSnap.id, ...chatSnap.data() } as Chat;
                // console.log("[chat] Chat encontrado:", chat);
                setChat(chat)
                // console.log("[chat] chat clicado: ", chat)
                return chat;
            } else {
                console.log("[chat] Chat não encontrado");
                return null;
            }
        }
        catch (error) {
            alert("nao foi possivel selecionar o chat." + error)
            return null
        }
    }
    const exitChat = () => {
        setChat(null);
    }

    //----------------------adicionar mensagem---------------------//
    const addMessage = async (message: any, chatID: string, image?: string) => {
        if (!user) return

        const messagesRef = collection(db, "chats", chatID, "messages");
        let newMessage: message = {}
        if(image){
            newMessage= {
                chatID: chatID,
                message: message,
                sender: user?.name as string,
                senderID: user?.id as string,
                senderImage: user?.image,
                messageImage: image,
                time: serverTimestamp(),
            };
        }else{
            newMessage= {
                chatID: chatID,
                message: message,
                sender: user?.name as string,
                senderID: user?.id as string,
                senderImage: user?.image,
                time: serverTimestamp(),
            };
        }

        await addDoc(messagesRef, newMessage);

        setMessages(prevMessages => [...prevMessages, newMessage]);

    }
    //-----------------------------checar mensagens em tempo real---------------------//
    useEffect(() => {
        if (!chat?.id) return;
        const q = query(collection(db, "chats", chat.id, "messages"), orderBy("time", "asc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                time: doc.data().time?.toDate ? doc.data().time.toDate() : new Date(),
            }))
            setMessages(msgs as any)
        })

        return () => unsubscribe()
    }, [chat?.id])
    //----------------------------------------------------------------------------------//
    return (
        <ChatContext.Provider value={{
            chat: chat!,
            messages: messages,
            addMessage,
            createChat,
            deleteAllChats,
            useChat,
            exitChat,
            chatList
        }}>
            {children}
        </ChatContext.Provider>
    )
}
