import Icon from "configs/icons";
import colors from "configs/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface ActionProps{
    style?: ViewStyle,
    onPress?: ()=> void,
    type?: "deny" | "accept"
}
export default function NotificationAction({style, onPress, type = "deny"}: ActionProps){
    return(
        <TouchableOpacity style={[styles.container, 
        type =="deny"?
        styles.deny:
        styles.accept,
        style]} onPress={onPress}>
            {type==="deny"&&<Icon.AntDesign name="close"/>}
            {type==="accept"&&<Icon.AntDesign name="check"/>}
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: colors.background,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    deny:{
    
    },
    accept:{
        backgroundColor: colors.primary,
    }
})