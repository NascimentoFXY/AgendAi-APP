import { StyleSheet } from "react-native";
import colors from "../../configs/colors";
export const styles = StyleSheet.create({

    background: {
        flex: 1, 
        padding: 50,
        backgroundColor: "#ffff",   
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    point:{
        width: 15,
        height: 15,
        borderRadius: "100%",
        backgroundColor: colors.primary,
        opacity: 0.5,
    },
    point1: {
        width: 20,
        height: 20,
        borderRadius: "100%",
        backgroundColor: colors.primary,
    },
    avanceButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    pointContainer:{
        flexDirection:"row",
        gap: 6,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }


})
