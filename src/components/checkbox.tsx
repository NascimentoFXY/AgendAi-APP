import React from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'; // Ícone do check
import colors from "configs/theme";

export default function Checkbox() {
    const [checked, setChecked] = useState(false);

    return (
        <TouchableOpacity
            style={[styles.checkbox, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)}>

            {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: "#D97171",
    },

})