import { StyleSheet } from "react-native";
import colors from "../../../../configs/colors";
export const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        flex: 1
    },
    TabBarButton: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 210
    },
    Tab: {
        position: "absolute",
        width: "100%",
        padding: 30,
        backgroundColor: colors.background,
        height: 120,
        bottom: 0,
        borderTopColor: "#a5a5a555",
        borderTopWidth: 1
    },
    TopCurve: {
        position: "absolute",
        top: -50,
        width: "150%",
        height: 150,
        backgroundColor: "#D97171",
        borderBottomLeftRadius: "100%",
        borderBottomRightRadius: "100%",
    },
    contentContainer:{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    content:{
   
        padding: 20,
        borderWidth: 0.9,
        borderRadius: 20,
        borderColor: "#0000000f",
        height: 500,
        gap: 20,
        backgroundColor: colors.background,
        justifyContent: 'space-around',
        boxShadow: "#0000",
        elevation: 2,
    },
    label:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#a0a0a0"
    },
    label2:{
        fontSize: 16,
        fontWeight: "bold",
        
    },
    labelContainer:{
        justifyContent: "space-between",
        flexDirection: "row"
    }
})