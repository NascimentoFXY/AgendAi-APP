import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";


export default function NotificationActions({children, style}:{children:React.ReactNode, style?: ViewStyle}){
    return(
        <View style={[styles.container, style]}>
            {children}
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        gap: 5,
        marginLeft: "auto",
    },
})