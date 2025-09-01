import React, { useState, createContext, use, useEffect } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc } from "@firebase/firestore";
interface message {
    message: string,
    sender: string,
    senderID: string,
    time: string,

}
interface Chat {
    id: string;
    hostId: string;
    hostName: string;
    public?: boolean;
    createdAt: any;
}


interface ChatContextType {
    chat: Chat | null;
    messages: message[];
    addMessage: (message: string, chatID: string) => Promise<void>;
    useChat: (ChatID: any) => void,
    exitChat: () => void,
    createChat: () => void;
    chatList: any[] | null;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ children }: { children: React.ReactNode }) {

    const { user } = React.useContext(AuthContext)!;
    const [messages, setMessages] = useState<message[]>([]);

    const [chatList, setChatList] = useState<Chat[] | null>([]);
    const [localChatID, setLocalChatID] = useState<Chat | null>(null)

    const createChat = async () => {
        try {
            const chatRef = doc(collection(db, "chats"));
            await setDoc(chatRef, {
                id: chatRef.id,
                hostName: user?.name,
                hostId: user?.id,
                createdAt: new Date(),
                public: true,
            });
            alert("Chat criado com sucesso! " + chatRef.id);

        } catch (error) {

            console.error("Erro ao criar chat:", error);
            alert("Erro ao criar chat. Tente novamente.");
        }
    }


    useEffect(() => {
        const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot)=>{
            const fetchedChats: any = [];
            querySnapshot.forEach((doc)=>{
                fetchedChats.push({
                    id: doc.id, ...doc.data()
                })
            })
            setChatList(fetchedChats)
            console.log("Chats carregados: ", fetchedChats)
        })
        return ()=> unsubscribe()


    }, [])


    const useChat = async (chatID: any) => {
        try {
            const chatRef = doc(db, "chats", chatID);
            const chatSnap = await getDoc(chatRef);

            if (chatSnap.exists()) {
                const chat = { id: chatSnap.id, ...chatSnap.data() };
                console.log("Chat encontrado:", chat);

                setLocalChatID(chatID);
                return chat;
            } else {
                console.log("Chat não encontrado");
                return null;
            }
        }
        catch (error) {
            alert("nao foi possivel selecionar o chat." + error)
            return
        }
    }
    const exitChat = () => {
        setLocalChatID(null);
    }

    useEffect(() => {
        console.log(localChatID)
    }, [setLocalChatID])


    const addMessage = async (message: any, chatID: string) => {
        if (!user) return

        const messagesRef = collection(db, "chats", chatID, "messages");

        const newMessage: message = {
            message: message,
            sender: user?.name as string,
            senderID: user?.id as string,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        await addDoc(messagesRef, newMessage);

        // setMessages(prevMessages => [...prevMessages, newMessage]);

    }

    const subscribeMessages = (chatId: string, callback: (msgs: any[]) => void) => {
        const messagesRef = collection(db, "chats", chatId, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
            callback(msgs); // chama a função passando as mensagens
        });

        return unsubscribe;
    };

    return (
        <ChatContext.Provider value={{
            chat: localChatID,
            messages,
            addMessage,
            createChat,
          
            useChat,
            exitChat,
            chatList
        }}>
            {children}
        </ChatContext.Provider>
    )
}