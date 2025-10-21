import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./auth";
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "@firebase/firestore";
import { db } from "services/firebase";
import { getUserByEmail } from "configs/utils";
export interface Notifications {
    id?: string,
    title: string,
    subtitle?: string,
    targetID: string,
    createdAt: any,
    type?: "buttons" | "readonly",
    status?: "pending" | "denied" | "accepted"
}
interface NotificationContextType {
    notificationList: Notifications[] | null,
    notifyUserByEmail: (userEmail: string, senderName: string) => Promise<any>,
    fetchNotifications: () => () => void;
}
const NotificationContext = createContext<NotificationContextType | null>(null)
export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuthContext()!
    const [notificationList, setNotificationList] = useState<Notifications[] | null>([])
    const [notification, setNotification] = useState<Notifications>()

    function fetchNotifications() {
        if(!user){
            return () => {};
        }
        const userRef = collection(db, "users", user?.id!, "notifications")
        const q = query(userRef, orderBy("createdAt", "asc"))
        
  
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notifications: Notifications[] = querySnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() as Notifications }))
                // filtra apenas notificações que têm campo "status"
                .filter(n => n.status !== undefined);

            setNotificationList(notifications);
        });

        return unsubscribe; // você pode chamar isso para parar de escuta
    }


    const notifyUserByEmail = async (userEmail: string, senderName: string) => {
        const userRes = await getUserByEmail(userEmail);
        if (!userRes) return
        try {
            const notificationsRef = doc(collection(db, "users", userRes?.id!, "notifications"));
            const newNotification: Notifications = {
                id: notificationsRef.id,
                title: `${senderName} está te convidando para ser um especialista!`,
                subtitle: "Deseja aceitar?",
                type: "buttons",
                targetID: userRes?.id!,
                createdAt: new Date(),
                status: "pending"
            }
            await setDoc(notificationsRef, newNotification);

            console.log("Notificação enviada");
            setNotificationList(prev => prev ? [...prev, newNotification] : [newNotification])
            return { success: true };
        } catch (error) {
            console.error("Erro ao enviar notificação:", error);
            return { success: false, error };
        }
    }
    return (

        <NotificationContext.Provider value={{ notificationList: notificationList, notifyUserByEmail, fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)
    return context;
}