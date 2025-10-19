import React, { createContext, useContext, useState } from "react";
import { useAuthContext } from "./auth";
interface Notifications {
    id?: string,
    title: string,
    subtitle?: string,
    targetID: string,
    type?: "buttons" | "readonly"
}
interface NotificationContextType {
    notificationList: Notifications[] | null,
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
            title: "oi",
            type: "buttons",
            subtitle: "subtitulo",
            targetID: "all"
        },
    ])

    return (

        <NotificationContext.Provider value={{ notificationList: notificationList }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    const context = useContext(NotificationContext)
    return context;
}