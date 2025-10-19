import Icon from "configs/icons";
import colors from "configs/theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";


export default function NotificationRoot({children}:{children:React.ReactNode}){
    return(
        <View style={styles.container}>
        
                <TouchableOpacity activeOpacity={0.9} style={styles.closeBtn}>
                    <Icon.AntDesign name="close"/>
                </TouchableOpacity>
         
            {children}
        </View> 
    )
}

const styles = StyleSheet.create({
    container:{

        borderWidth: 1,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"

    },
    closeBtn:{
        position: "absolute",
        right: -8,
        top: -8,
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 100,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center"
    }
})