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
    iconRadius?: number,
    textSize?: number,
    bold?: boolean,
}


const ServicesCards: React.FC<ServicesProps> = ({
    icon,
    text,
    color,
    width = 120,
    iconRadius = width,
    height = 100,
    textSize = 16,
    bold = true

}) => {
    return (
        <>
                <TouchableOpacity activeOpacity={0.6} style={{ width: width, height: height, borderRadius: 30, alignItems: "center", overflow: "visible"}}>

                    <View style={{ backgroundColor: "#deb49f", width: iconRadius, height: iconRadius, borderRadius: 1000, alignItems: "center", justifyContent: "center" }}>
                        {icon}
                    </View>

                    <Text style={{ fontSize: textSize, fontWeight: bold? "bold": "normal", textAlign: "center", color: color, }}>
                        {text}
                    </Text>

                </TouchableOpacity>
                <View />
        </>
    )

}

export default ServicesCards // uso de componentização para melhorar a manutenção do código