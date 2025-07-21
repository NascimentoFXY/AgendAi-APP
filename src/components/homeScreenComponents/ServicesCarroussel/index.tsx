import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';


import Carroussel from '../carroussel';

type ServicesProps = {
    icon?: React.ReactNode,
    text?: string,
    color?: string,
    width?: number,
    height?: number,
    textSize?: number
}


const ServicesCards: React.FC<ServicesProps> = ({
    icon,
    text,
    color,
    width = 120,
    height,
    textSize = 16,

}) => {
    return (
        <>
                <TouchableOpacity activeOpacity={0.6} style={{ width: width, borderRadius: 30, padding: 12, alignItems: "center"}}>

                    <View style={{ backgroundColor: "#deb49f", width: width, height: width, borderRadius: 1000, alignItems: "center", justifyContent: "center" }}>
                        {icon}
                    </View>

                    <Text style={{ fontSize: textSize, fontWeight: "bold", textAlign: "center", color: color }}>
                        {text}
                    </Text>

                </TouchableOpacity>
                <View />
        </>
    )

}

export default ServicesCards