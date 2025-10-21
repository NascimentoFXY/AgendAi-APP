import { collection, doc, updateDoc } from "@firebase/firestore";
import { Notification } from "components/notifications/Notification";
import NotificationAction from "components/notifications/notificationAction";
import NotificationActions from "components/notifications/notificationActions";
import { useAuthContext } from "context/auth";
import { useNotificationContext } from "context/notificationsContext";
import { useEffect } from "react";
import { View } from "react-native";
import { db } from "services/firebase";

export default function NotificationScreen({ navigation }: any) {
    const { notificationList, fetchNotifications } = useNotificationContext()!
    const { user } = useAuthContext()!

    const updateStatus = async (notificationID: any, status: "accepted" | "denied") => {
        const notificationRef = doc(db, "users", user?.id!, "notifications", notificationID)
        updateDoc(notificationRef, {
            status: status
        })

    }
    useEffect(() => {
        const unsub = fetchNotifications();
        return () => unsub(); // limpa o listener ao desmontar a tela
    }, [user?.id]);
    return (
        <View>

            {
                notificationList
                    ?.filter((item) => item.status == "pending")
                    .map((item, index) => (

                        <Notification.Root key={item.id}>
                            <Notification.Title title={item.title} subtitle={item.subtitle} />
                            <NotificationActions>
                                <NotificationAction type="accept" onPress={() => updateStatus(item.id, "accepted")} />
                                <NotificationAction onPress={() => updateStatus(item.id, "denied")} />
                            </NotificationActions>
                        </Notification.Root>

                    ))
            }
        </View>
    )
}