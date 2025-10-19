import { Notification } from "components/notifications/Notification";
import NotificationAction from "components/notifications/notificationAction";
import NotificationActions from "components/notifications/notificationActions";
import { useAuthContext } from "context/auth";
import { useNotificationContext } from "context/notificationsContext";
import { View } from "react-native";

export default function NotificationScreen({ navigation }: any) {
    const { notificationList } = useNotificationContext()!
    const { user } = useAuthContext()!
    return (
        <View>

            {
                notificationList
                ?.filter((item) => item.targetID === user?.id!)
                        .map((item, index) => (

                            <Notification.Root key={item.id}>
                                <Notification.Title title={item.title} subtitle={item.subtitle} />
                                <NotificationActions>
                                    <NotificationAction type="accept" />
                                    <NotificationAction />
                                </NotificationActions>
                            </Notification.Root>

                        ))
            }
        </View>
    )
}