
import colors, { font } from "configs/theme"
import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
export default function notifcationTitle({ title, subtitle }: { title: string, subtitle?: string }) {
    const [details, showDetails] = useState(false)
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={()=>showDetails(!details) } style={{flex: 1}}>
            <Text style={styles.title} numberOfLines={details?5:2 }>
                {title}
            </Text>
            {subtitle&&
            <Text style={styles.subtitle}>
                {subtitle}
            </Text>}
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: font.poppins.bold
    },
    subtitle:{
        fontFamily: font.poppins.medium
    }
})