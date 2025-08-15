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
import CustomButton from '../../../../components/customButton';
import colors from '../../../../configs/colors';

interface ScheduleHeaderProps {
    navigation: any;
    currentPage?: number;
    scrollToPage?: (page: number) => void;
}
export default function ScheduleHeader({ navigation, currentPage, scrollToPage }: ScheduleHeaderProps) {

    return (
        <>
            <SafeAreaView style={styles.headerContainer}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={colors.lightGray} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16 }}> Agendamentos</Text>
                <CustomButton
                    Icon={<Ionicons name="search" size={24} color={colors.lightGray} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}

                />
            </SafeAreaView>
            <View>
                <View
                    style={styles.NavigationOptions}


                >

                    <TouchableOpacity
                        style={styles.headerNavigationOptions}
                        onPress={() => scrollToPage !== undefined ? scrollToPage(0) : null}>

                        <Text style={[styles.NavigationOptionsText, currentPage === 0 ? { color: colors.primary } : styles.NavigationOptionsText]}>  Proximos</Text>
                        <View style={currentPage === 0 ? styles.underline : styles.none} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.headerNavigationOptions}
                        onPress={() => scrollToPage !== undefined ? scrollToPage(1) : null}>

                        <Text style={[styles.NavigationOptionsText, currentPage === 1 ? { color: colors.primary } : styles.NavigationOptionsText]}>Concluidos</Text>
                        <View style={currentPage === 1 ? styles.underline : styles.none} />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.headerNavigationOptions}
                        onPress={() => scrollToPage !== undefined ? scrollToPage(2) : null}>

                        <Text style={[styles.NavigationOptionsText, currentPage === 2 ? { color: colors.primary } : styles.NavigationOptionsText]}>Cancelados</Text>
                        <View style={currentPage === 2 ? styles.underline : styles.none} />
                    </TouchableOpacity>

                </View>
            </View>

        </>
    )
}