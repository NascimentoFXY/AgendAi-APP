import React, { useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ScrollViewProps
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';
import colors from '../../../../configs/colors';
import CustomButton from '../../../../components/customButton';

export default function ScheduleFinal({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.TopCurve} />
            <CustomButton
                Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                border='Circle'
                type='absolute'
                width={50}
                height={50}
                top={20}
                left={20}
                style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                onPress={() => navigation.goBack()}
            />

            {/*----------------------- MAIN--------------------- */}
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text>Salão: La Mar</Text>
                    <Text>Endereço: La Mar</Text>
                    <Text>Endereço: La Mar</Text>
                    <Text>Data de Reserva: La Mar</Text>
                    <Text>Horario de Reserva: La Mar</Text>
                    <Text>Especialista: La Mar</Text>

                </View>

            </View>

            <View style={styles.Tab}>
                <TouchableOpacity
                    onPress={() => navigation.popToTop()}
                    style={styles.TabBarButton}>
                    <Text style={{ color: "#fff" }}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}