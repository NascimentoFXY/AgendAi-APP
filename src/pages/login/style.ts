import { StyleSheet } from "react-native";
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
    },
    header: {
        marginTop: 50,
        width: "100%",
        alignItems: "center",
        flex: 1,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 100,
        width: "100%",
        height: 50,
        justifyContent: "center",
        textAlign: "center",
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
        width: 70,
        height: 70,
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
    backButtonContainer: {
        position: "absolute",
        top: 50,
        left: 20,
        width: 50,
        height: 50,
        backgroundColor: colors.background,
        borderRadius: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    }



});