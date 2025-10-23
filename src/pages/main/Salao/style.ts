import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors, { font } from "../../../configs/theme";
import { normalizeFont } from "configs/utils";
const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        width: width,

    },
    SalaoImagem: {
        width: "100%",
        height: 250,
        backgroundColor: colors.primary,
        zIndex: 1,
        marginBottom: -50,
        justifyContent: "center"
    },
    modalContainer: {
        backgroundColor: colors.background,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomColor: "#3838386b",
        borderBottomWidth: 1,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        paddingBottom: 0,


    },
    tools: {
        flexDirection: "row",
        gap: 10,
        marginLeft: "auto"
    },
    SalaoNome: {
        paddingHorizontal: 20,
        fontSize: 24,
        fontFamily: font.poppins.bold,

    },
    SalaoSubTitle: {
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
        fontFamily: font.poppins.regular
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
        paddingHorizontal:20,
        backgroundColor: colors.background
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
    none: {
        display: "none"
    },

    TabBarButton: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 210,



    },
    Tab: {
        position: "absolute",
        width: "100%",
        padding: 30,
        backgroundColor: colors.background,
        height: normalizeFont(110),
        bottom: 0,
        borderTopColor: "#a5a5a555",
        borderTopWidth: 1,
        zIndex: 99
    },
    amount: {
        fontSize: 18, fontWeight: "bold", color: colors.primary
    },
    serviceTitle: {
        fontSize: 18, fontWeight: "bold"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 10
    },
    //---------------------------------------- modal de agendamento
    title: {
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 10
    },
    subTitle: {
        fontWeight: "bold",
        marginVertical: 10,
        color: colors.subTitle,
        paddingLeft: 20,
        fontSize: 16
    },
    cards: {
        backgroundColor: colors.primary,
        width: 100,
        height: 70,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cardsText: {
        color: colors.textSecondary

    }
});