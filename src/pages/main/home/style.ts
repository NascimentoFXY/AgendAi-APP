import { StyleSheet } from "react-native";
import colors from "../../../configs/colors";

export const styles = StyleSheet.create({


    container: {
        paddingBottom: 20,
    },
    header: {
        padding: 30,
        backgroundColor: '#fff'
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    notificationButton: {
        backgroundColor: '#ffffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterButton: {
        backgroundColor: '#d77a7a',
        marginLeft: 8,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    contentHeaderTitle: {
        fontSize: 20,
        flex: 1,
        fontWeight: "bold"
    },
    especialCards: {
        backgroundColor: "#242424ff",
        width: 400,
        height: 260,
        borderRadius: 30,
        padding: 12,
    },
    serviceCards: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    SaloesCards: {
        backgroundColor: "#a5a5a5",
        width: 300,
        height: 220,
        borderRadius: 30,
        padding: 12,
    },
    saloesRating: {
        backgroundColor: "#fff", width: 100, height: 50, borderRadius: 100, justifyContent: "center", alignItems: "center", flexDirection: "row"
    },
    saloesHeart: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        color: colors.primary,
    },
})

