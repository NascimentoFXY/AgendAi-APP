// TabBarButton.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent, TextInput, ViewStyle } from "react-native";
import colors from "../../configs/theme"; // ajuste o caminho conforme seu projeto
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from "../input";


type TabBarButtonProps = {
    title: string;
    type?: "button" | "input1";
    textInputValue?: string;
    onChangeText?: (text: string) => void;
    onPress?: (event: GestureResponderEvent) => void;
    onAction?: ()=> void
    style?: ViewStyle;
    bgColor?: any;

};

export default function TabBarButton({onAction, title, onPress, onChangeText,type = "button", textInputValue,style, bgColor = colors.background}: TabBarButtonProps) {


    return (
        <View style={{zIndex: 999}}>

            {/* Button */}
            {type === "button" && (
                <View style={[styles.Tab, {backgroundColor: bgColor}]}>
                    <TouchableOpacity onPress={onPress} style={[styles.TabBarButton, style]}>
                        <Text style={{ color: "#fff" }}>{title}</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Input */}
            {type === "input1" && (
                <View style={[styles.Tab, {backgroundColor: bgColor}]}>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={[styles.icons, {backgroundColor: colors.white, borderWidth: 1, borderColor: colors.transparentLightGray}]}
                        onPress={onAction}
                        >
                            <MaterialCommunityIcons name="plus" size={24} color={colors.secondary} />
                        </TouchableOpacity>


                        {/* esse aqui */}
                        <TextInput placeholder="Digite sua mensagem"  value={textInputValue} onChangeText={onChangeText} style={styles.input} />




                        <TouchableOpacity style={styles.icons} onPress={onPress}>
                            <MaterialCommunityIcons name="send" size={24} color={colors.white} />
                        </TouchableOpacity>

                    </View>

                </View>
            )}
        </View>




    );
}

const styles = StyleSheet.create({
    TabBarButton: {
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 210,
    },
    input: {
        flex: 1,
        height: 50,
        padding: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        justifyContent: "space-around",

    },
    icons:{
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    Tab: {
        position: "absolute",
        width: "100%",
        padding: 30,
        height: 120,
        bottom: 0,
        borderTopColor: "#a5a5a555",
        borderTopWidth: 1,

    },
});
