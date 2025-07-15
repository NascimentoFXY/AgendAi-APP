import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../configs/colors";
export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 50,
    },
    contentContainer: {

        width: "100%",
        
    },
    header: {
        marginTop: 50,
        width: "100%",
        alignItems: "center",

    },
    inputContainer: {
        width: "100%",
        height: "auto",
        marginBottom: 20,

    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
        width: "100%",
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 100,
        width: "100%",
        height: 50,
        justifyContent: "center",
        textAlign: "center",
        marginBottom: 20,
    },
    bold: {
        fontWeight: 600,
        fontSize: 24,
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
        gap: 12,

    },
    options: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: "center",
    },
    footerCurve: {
        position: "absolute",
        bottom: -50,
        width: "150%",
        height: 150,
        backgroundColor: "#D97171",
        borderTopLeftRadius: "100%",
        borderTopRightRadius: "100%",
    },
    link: {
        color: "#7F3F3F",
        textDecorationLine: "underline",
        fontWeight: "500",
    }

});