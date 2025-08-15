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
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Salão: </Text>
                        <Text style={styles.label2}>La Mar</Text>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Endereço: </Text>
                        <Text style={styles.label2}>Rua Euclides Zalgo, Endereço 0293</Text>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.label2}> Johan liebert</Text>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Data de Reserva: </Text>
                        <Text style={styles.label2}> La Mar</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Telefone: </Text>
                        <Text style={styles.label2}> 55 11 22345-6789</Text>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Horario de Reserva:</Text>
                        <Text style={styles.label2}> 07:00 horas da Manhã</Text>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Especialista: </Text>
                        <Text style={styles.label2}> Cabeleireira - Lavínia </Text>
                    </View>
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