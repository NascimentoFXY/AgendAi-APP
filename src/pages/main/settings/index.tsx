import React, { useRef, useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
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
import UserOptions from '../../../components/perfil/options/userProfile';
import colors from '../../../configs/theme';
import { styles } from './styles';
import CustomButton from '../../../components/customButton';
import Icon from 'configs/icons';
export default function UserSettings({ navigation }: any) {
    const { user } = useContext(AuthContext)!
    return (


        <SafeAreaView style={styles.container}>
            {/* HEADER====================================== */}
            <SafeAreaView style={styles.headerContainer}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={colors.lightGray} />}
                    border='Circle'
                    type='absolute'
                    left={20}
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                    onPress={()=> navigation.goBack()}/>
                <Text style={{ fontWeight: "bold", fontSize: 16, }}> Configurações</Text>

            </SafeAreaView>
            {/* =============================================== */}
            <UserOptions icon={<Feather name='user' size={40} color={colors.secondary} />} title='Editar Perfil'
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
            />
            <UserOptions icon={<Feather name='lock' size={40} color={colors.secondary} />} title='Conta'
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
            />
            {

              
            }
            <UserOptions icon={<Ionicons name='notifications' size={40} color={colors.secondary} />} title='Notificação'
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
            />

        </SafeAreaView>
    );
};