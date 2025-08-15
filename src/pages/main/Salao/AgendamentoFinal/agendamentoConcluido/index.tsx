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
import { styles } from '../style';
import colors from '../../../../../configs/colors';
import CustomButton from '../../../../../components/customButton';


export default function ScheduleConclusion({ navigation }: any) {
    return (
        <View style={styles.container2}>

<CustomButton
                Icon={<Ionicons name="arrow-back" size={24} color={colors.lightGray}/>}
                border='Circle'
                type='absolute'
                width={50}
                height={50}
                top={20}
                left={20}
                style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                onPress={() => navigation.popToTop()}
            />
            <View style={styles.conclusionIconContainer} >
                <Entypo name='check' size={80} color={colors.background}/>
            </View>
            <Text style={styles.title}>Agendamento Concluido</Text>
            <Text>Seu agendamento foi concluido com sucesso</Text>
            <View style={styles.Tab2}>
                <TouchableOpacity
                    onPress={() => navigation.popToTop()}
                    style={styles.TabBarButton2}>
                    <Text style={{ color: colors.primary, fontWeight: "bold" }}>Retornar à tela principal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}