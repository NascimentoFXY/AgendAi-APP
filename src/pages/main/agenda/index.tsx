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
    NativeScrollEvent
} from 'react-native';
import ScheduleHeader from './header';
import { styles } from './style';
import colors from '../../../configs/colors';




export default function Agenda({navigation}: any) {
    const scrollRef = useRef<ScrollView>(null);
    return (
        <View style={{ flex: 1 }}>
            {/* ========HEADER=================== */}
            <ScheduleHeader navigation={navigation} ref={scrollRef} />
            {/* ================================== */}
            <ScrollView horizontal>
                {/* ==============================Conteudo======================================== */}
            </ScrollView>
            <Text>Agenda</Text>
        </View>
    )
}