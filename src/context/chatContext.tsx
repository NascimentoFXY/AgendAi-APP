import React, { useState, createContext, use, useEffect } from "react";
import { AuthContext } from "./auth";
import { db } from "../services/firebase";
import { setDoc, doc, collection, query, orderBy, getDocs, addDoc, onSnapshot, getDoc, deleteDoc, serverTimestamp, Timestamp } from "@firebase/firestore";
interface message {
    id?: string,
    message: string,
    sender: string,
    senderID: string,
    time: any,

}
interface Chat {
    id: string;
    hostId: string;
    hostName: string;
    public?: boolean;
    createdAt: any;
}


interface ChatContextType {
    chat: Chat,
    messages: message[];
    addMessage: (message: string, chatID: string) => Promise<void>;
    useChat: (ChatID: any) => void,
    exitChat: () => void,
    createChat: () => void;
    deleteAllChats: () => void;
    chatList: any[] | null;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ children }: { children: React.ReactNode }) {

    const { user } = React.useContext(AuthContext)!;
    const [messages, setMessages] = useState<message[]>([]);

    const [chatList, setChatList] = useState<Chat[] | null>([]);
    const [chat, setChat] = useState<Chat | null>(null)

    
    const createChat = async () => {
        // try {
        //     const chatRef = doc(collection(db, "chats"));
        //     const docRef = await setDoc((chatRef), {
        //         id: chatRef.id,
        //         hostName: user?.name,
        //         hostId: user?.id,
        //         createdAt: new Date(),
        //         public: true,
        //     });
        //     alert("Chat criado com sucesso! " + chatRef.id);

        // } catch (error) {

        //     console.error("Erro ao criar chat:", error);
        //     alert("Erro ao criar chat. Tente novamente.");
        // }
    }
    const deleteAllChats = async () => {
        // const docRef = await getDocs(collection(db, "chats"))
        // docRef.forEach(Items => {
        //     deleteDoc(doc(db, "chats", Items.id))
        // });

    }
    // ============carregar chats=================================//
    // useEffect(() => {
    //     if(!user) return;
    //     const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const fetchedChats: any = [];
    //         querySnapshot.forEach((doc) => {
    //             fetchedChats.push({
    //                 id: doc.id, ...doc.data()
    //             })
    //         })
    //         setChatList(fetchedChats)
    //         console.log("Chats carregados: ", fetchedChats.map((doc: Chat) => (doc.id)))
    //     })
    //     return () => unsubscribe()


    // }, [user])

//------------ao apertar no chat--------------------//
    const useChat = async (chatID: any) => {
        // try {
        //     const chatRef = doc(db, "chats", chatID);
        //     const chatSnap = await getDoc(chatRef);

        //     if (chatSnap.exists()) {
        //         const chat = { id: chatSnap.id, ...chatSnap.data() };
        //         console.log("Chat encontrado:", chat.id);
        //         setChat(chat as Chat)
        //         console.log("chat clicado: ", chat)
        //         return chat;
        //     } else {
        //         console.log("Chat não encontrado");
        //         return null;
        //     }
        // }
        // catch (error) {
        //     alert("nao foi possivel selecionar o chat." + error)
        //     return
        // }
    }
    const exitChat = () => {
        setChat(null);
    }

//----------------------adicionar mensagem---------------------//
    const addMessage = async (message: any, chatID: string) => {
        // if (!user) return

        // const messagesRef = collection(db, "chats", chatID, "messages");

        // const newMessage: message = {

        //     message: message,
        //     sender: user?.name as string,
        //     senderID: user?.id as string,
        //     time: serverTimestamp(),
        // };

        // await addDoc(messagesRef, newMessage);

        // setMessages(prevMessages => [...prevMessages, newMessage]);

    }
//-----------------------------checar mensagens em tempo real---------------------//
    useEffect(() => {
        // if (!chat?.id) return;
        // const q = query(collection(db, "chats", chat.id, "messages"), orderBy("time", "asc"))
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     const msgs = querySnapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //         time: doc.data().time?.toDate ? doc.data().time.toDate() : new Date(),
        //     }))
        //     setMessages(msgs as any)
        // })

        // return () => unsubscribe()
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
 