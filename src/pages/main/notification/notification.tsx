import { collection, doc, updateDoc } from "@firebase/firestore";
import CustomButton from "components/customButton";
import { Notification } from "components/notifications/Notification";
import NotificationAction from "components/notifications/notificationAction";
import NotificationActions from "components/notifications/notificationActions";
import Icon from "configs/icons";
import colors, { font } from "configs/theme";
import { normalizeFont } from "configs/utils";
import { useAuthContext } from "context/auth";
import { useNotificationContext } from "context/notificationsContext";
import { useSalonContext } from "context/salonContext";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { db } from "services/firebase";

export default function NotificationScreen({ navigation }: any) {
    const { notificationList, fetchNotifications } = useNotificationContext()!
    const { user } = useAuthContext()!
    const { salon, addSpecialistToSalon } = useSalonContext()!

    const updateStatus = async (notificationID: any, status: "accepted" | "denied") => {
        const notificationRef = doc(db, "users", user?.id!, "notifications", notificationID)
        await updateDoc(notificationRef, {
            status: status
        })

    }
    useEffect(() => {
        const unsub = fetchNotifications();
        console.log("montou")
        return () => (unsub(), console.log("desmontou")); // limpa o listener ao desmontar a tela
    }, [user?.id]);
    return (
        <View>
            <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                <CustomButton
                    Icon={<Icon.AntDesign color={colors.lightGray} name="arrow-left" />}
                    border="Circle"
                    style={{ borderWidth: 1, borderColor: colors.lightGray, backgroundColor: colors.background }}
                    onPress={()=>{navigation.goBack()}}
                />
                <Text style={{ fontFamily: font.poppins.bold, fontSize: normalizeFont(20), margin: "auto" }}>Notificações</Text>
            </View>
            {
               notificationList
                    ?.map((item, index) => (

                        <Notification.Root key={item.id}>
                            <Notification.Title title={item.title} subtitle={item.subtitle} />
                            <NotificationActions>
                                <NotificationAction type="accept" onPress={() => { updateStatus(item.id, "accepted"), addSpecialistToSalon && addSpecialistToSalon(item.salonID, user!, item.service || "indefinido") }} />
                                <NotificationAction onPress={() => updateStatus(item.id, "denied")} />
                            </NotificationActions>
                        </Notification.Root>

                    ))
            }
        </View>
    )
}