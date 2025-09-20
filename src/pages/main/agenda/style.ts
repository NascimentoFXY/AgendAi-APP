import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../configs/theme";
const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
    headerContainer:{
        height: 100,
        paddingTop: 50,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",

    },
    NavigationScroll: {
        flexDirection: "row",
        gap: 30,
        overflow: "visible",



    },
    NavigationOptions: {
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        backgroundColor: "#fff"
    },
    headerNavigationOptions: {
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
    none:{
        display: "none"
    },
});