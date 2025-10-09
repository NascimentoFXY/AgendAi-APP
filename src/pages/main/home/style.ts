import { StyleSheet } from "react-native";
import colors, { font } from "../../../configs/theme";
import { LinearGradient } from "expo-linear-gradient";

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
        fontFamily: font.abrilfatface
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
        overflow: "hidden",
    },
    saloesRating: {
        backgroundColor: "#fff",
        width: 100,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    cardBottom:{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "auto",
        padding: 10,
        paddingLeft: 20,
    },
    cardTitle:{
        fontFamily: font.poppins.bold,
        fontSize: 15,
        color: colors.white,
        shadowColor: colors.primary,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        width: 130,
    },
    saloesHeart: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
        right: 10
    },
    link: {
        color: colors.primary,
    },
    linearGradient:{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
     
    }
})

