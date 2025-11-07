import React, { useContext, useRef, useState } from 'react';
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
import colors from '../../../../configs/theme';
import CustomButton from '../../../../components/customButton';
import { ScheduleContext } from 'context/scheduleContext';
import { capitalizeFirstLetter, formatCurrency } from 'configs/utils';

export default function ScheduleFinal({ navigation }: any) {
    try {

        const { createSchedule, scheduleData } = useContext(ScheduleContext)!
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
                            <Text style={styles.label2}>{scheduleData.salonName}</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Endereço: </Text>
                            <Text style={styles.label2} numberOfLines={2}>{`${(scheduleData.address)}`}</Text>

                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Data de Reserva: </Text>
                            <Text style={styles.label2}>{scheduleData.date.split("|")[1]}</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Horario de Reserva:</Text>
                            <Text style={styles.label2}> {scheduleData.time}</Text>
                        </View>

                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Especialista: </Text>
                            <Text style={styles.label2}> {capitalizeFirstLetter(scheduleData.specialist.name)} </Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Serviço: </Text>
                            <Text style={styles.label2}> {capitalizeFirstLetter(scheduleData.service.itemName)} </Text>
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Valor: </Text>
                            <Text style={styles.label2}> {formatCurrency(scheduleData.service.itemPrice)} </Text>
                        </View>
                    </View>

                </View>

                <View style={styles.Tab}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ScheduleConclusion'); createSchedule(scheduleData) }}
                        style={styles.TabBarButton}>
                        <Text style={{ color: "#fff" }}>Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    catch (er) {
        console.log(er)
    }
}