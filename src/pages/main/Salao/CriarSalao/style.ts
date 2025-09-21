import { StyleSheet } from "react-native";
import colors from "../../../../configs/theme";

export const styles = StyleSheet.create({
    container:{
        flex:1
    },
    foto:{
        height: 250,
        backgroundColor: colors.lightGray,
        alignItems: "center",
        flexDirection: "row",

        zIndex: 1
    },
    modal:{
        backgroundColor:colors.background,
        marginTop: -20,
        borderRadius: 20,
        zIndex: 2,
    }
})