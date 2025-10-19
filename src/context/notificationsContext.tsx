import React, { createContext, useContext, useState } from "react";
import { useAuthContext } from "./auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "services/firebase";
import { getUserByEmail } from "configs/utils";
interface Notifications {
    id?: string,
    title: string,
    subtitle?: string,
    targetID: string,
    type?: "buttons" | "readonly"
}
interface NotificationContextType {
    notificationList: Notifications[] | null,
    notifyUser: (userEmail: string, userName: string) => Promise<void>,
}
const NotificationContext = createContext<NotificationContextType | null>(null)
export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuthContext()!
    const [notificationList, setNotificationList] = useState<Notifications[] | null>([
        {
            id: "1",
            title: "José esta te chamando para ser um especialista de La Mar!",
            type: "buttons",
            subtitle: "Deseja aceitar?",
            targetID: "YrVyEbDRwlgiLLjo2jDsQKmeJ272"
        },
        {
            id: "2",
            title: "José esta te chamando para ser um especialista de La Mar!",
            type: "buttons",
            subtitle: "Deseja aceitar?",
            targetID: "nenhum"
        },
    ])
    const notifyUser = async (userEmail: string, senderName: string) => {
        const user = await getUserByEmail(userEmail);
        const newNotification: Notifications = {
            id: Date.now().toString(),
            title: `${senderName} está te chamando para ser um especialista!`,
            subtitle: "Deseja aceitar?",
            type: "buttons",
            targetID: user?.id!,
        }
        setNotificationList(prev => prev ? [...prev, newNotification] : [newNotification])
    }
    return (

        <NotificationContext.Provider value={{ notificationList: notificationList, notifyUser }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)
    return context;
}