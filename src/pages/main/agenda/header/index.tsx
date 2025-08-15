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
import CustomButton from '../../../../components/customButton';
import colors from '../../../../configs/colors';


export default function ScheduleHeader({navigation}: any) {
    return (
    
        <View style={styles.headerContainer}>
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
            <Text> aaaaaaaaaaaaaaaaa</Text>
        </View>
    )
}