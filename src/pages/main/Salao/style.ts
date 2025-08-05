import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../configs/colors";
const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        width: width
    },
    SalaoImagem: {
        width: "100%",
        height: 250,
        borderRadius: 20,
        backgroundColor: colors.primary,
        zIndex: 1,
        marginBottom: -50,
    },
    modalContainer: {

        backgroundColor: colors.background,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        borderBottomColor: "#3838386b",
        borderBottomWidth: 2,
        paddingBottom: 0,
        zIndex: 2,

    },

    SalaoNome: {
        paddingHorizontal: 20,
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    SalaoSubTitle: {
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
    },
    SalaoInfoText: {

    },
    SalaoLocContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
        gap: 10

    },
    SalaoLocText: {

        flexDirection: "row",
        gap: 5
    },
    SalaoContacts: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        marginBottom: -20,
        justifyContent: "space-between",
    },


    salaoNavigationScroll: {
        flexDirection: "row",
        gap: 30,
        overflow: "visible",



    },
    salaoNavigationOptions: {
        flexDirection: "row",
        gap: 30,
        overflow: "visible",
        paddingLeft: 20,





    },
    NavigationOptions: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        top: 2,

    },
    NavigationOptionsText: {
        fontSize: 16,
        color: "#757575"

    },
    underline: {
        width: "120%",
        height: 5,
        backgroundColor: colors.primary,
        position: "absolute",
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    }
});