import { StyleSheet } from "react-native";
import colors from "../../configs/theme";
export const styles = StyleSheet.create({

    background: {
        flex: 1,

        backgroundColor: "#ffffffff",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 20,

    },
    point: {
        width: 15,
        height: 15,
        borderRadius: "100%",
        backgroundColor: colors.primary,
        opacity: 0.5,
    },
    pointCurrent: {
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
    pointContainer: {
        flexDirection: "row",
        gap: 6,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    modal: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        textAlign: "center",
        zIndex: 2,
        gap: 50,
    
        
        
        
    },
    titulo: {
        fontSize: 22,
        textAlign: "center",
        marginBottom: 10
    },
    negrito: {
        fontWeight: "bold"
    },
    destaque: {
        color: colors.primary,
        fontWeight: "bold"
    },
    texto: {
        fontSize: 14,
        textAlign: "center",
        color: "#777",
        marginBottom: 20
    },
    botao: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        marginBottom: 15
    },
    botaoTexto: {
        color: "#fff",
        fontWeight: "bold"
    },
    link: {
        color: "#888"
    }

})
