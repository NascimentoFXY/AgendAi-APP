import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle
} from 'react-native';
import colors, { font } from '../../../../../configs/theme';
import Icon from '../../../../../configs/icons';
import Input from './Input/input';
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
export default function Info() {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Informações adicionais</Text>
            <Text style={styles.subTitle}>Clique nos ícones e preencha com as informações solicitadas</Text>
            <View style={{ flexDirection: "row"}}>
                <ServicesCards
                    icon={<Icon.MaterialCommunityIcons name='web' size={40} color="#rgba(255, 255, 255, 1)" />}
                    text='Websites'
                    width={80}
                    height={100}
                    textSize={15}
                    bold={false}
                    bgColor={colors.lightGray}
                    style={{marginHorizontal: "auto"}}
                />
                <ServicesCards
                    icon={<Icon.Ionicons name='call' size={40} color="#rgba(255, 255, 255, 1)" />}
                    text='Telefone'
                    width={80}
                    height={100}
                    textSize={15}
                    bold={false}
                    bgColor={colors.lightGray}
                    style={{marginHorizontal: "auto"}}
                />
            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderTopWidth: 2,
    },
    label: {
        fontFamily: font.poppins.bold,
        fontSize: 20,
        paddingVertical: 10,
        textAlign: 'center',
    },
    subTitle: {
        fontFamily: font.poppins.light,
        fontSize: 15,
    }

});