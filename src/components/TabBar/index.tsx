// TabBarButton.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import colors from "../../configs/colors"; // ajuste o caminho conforme seu projeto

type TabBarButtonProps = {
    title: string;
    onPress?: (event: GestureResponderEvent) => void;
};

export default function TabBarButton({ title, onPress }: TabBarButtonProps) {
    return (
        <View style={styles.Tab}>
            <TouchableOpacity onPress={onPress} style={styles.TabBarButton}>
                <Text style={{ color: "#fff" }}>{title}</Text>
            </TouchableOpacity>
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
    Tab: {
        position: "absolute",
        width: "100%",
        padding: 30,
        backgroundColor: colors.background,
        height: 120,
        bottom: 0,
        borderTopColor: "#a5a5a555",
        borderTopWidth: 1,

    },
});
