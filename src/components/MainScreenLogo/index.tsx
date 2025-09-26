import React from "react";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet
} from "react-native";

import colors, { font } from "../../configs/theme";


import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'; // Ícone do check
import Checkbox from "../../components/checkbox/checkbox";
import { Input } from "../../components/input";
import { LinearGradient } from "expo-linear-gradient";
const opacity1 = 1
const opacity2 = 0.
export default function MainScreen() {
    return (

        <View style={{ width: "100%", height: "100%" }}>

            <LinearGradient
                colors={['#3245de', '#a953d7', '#9f2384', '#ff4174ff']} // degrade roxo > rosa > laranja
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.9 }}
                style={[styles.container, { position: "absolute", opacity: opacity1, zIndex: 1 }]}
            >
                <Text style={styles.logo}>AgendAí
                    <View style={{ position: "absolute", right: 0, top: 2, }}><Text style={[styles.logo, { fontSize: 20 }]}>©</Text></View>
                </Text>
            </LinearGradient>

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        flexDirection: "column-reverse"
    },
    logo: {
        fontSize: 40,
        color: 'white',
        width: "100%",
        textAlign:"center",
        fontFamily: font.abrilfatface
    }
});

