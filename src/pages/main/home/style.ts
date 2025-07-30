import { StyleSheet } from "react-native";
import colors from "../../../configs/colors";

export const styles = StyleSheet.create({


    container: {
        flex: 1,
        padding: 20
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
    serviceCards: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    link: {
        color: colors.primary,
    },
})

