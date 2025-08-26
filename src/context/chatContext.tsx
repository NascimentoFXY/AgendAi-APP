import React, { useState, createContext } from "react";

interface message {
    id: number,
    message: string,
    sender: string,
    time: string,
    isSender: boolean,

}
interface ChatContextType {
    messages: message[];
    addMessage: (message: string) => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ children }: { children: React.ReactNode }) {

    const [messages, setMessages] = useState<message[]>([]);

    const addMessage = (message: string) => {
        const newMessage: message = {
            id: messages.length + 1,
            message: message,
            sender: "User", // This should be dynamic based on the actual user
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSender: true // This should also be dynamic
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    }
    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
            {children}
        </ChatContext.Provider>
    )
}