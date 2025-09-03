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
    NativeScrollEvent
} from 'react-native';
import { styles } from '../style';
import CustomButton from '../../../../../components/customButton';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../../../configs/colors';
import { ChatContext } from '../../../../../context/chatContext';
import { useNavigation } from '@react-navigation/native'
const ChatHeaderData = ({ name, status }: any) => {
    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            {/* IMAGEM */}
            <View style={{ width: 60, height: 60, backgroundColor: colors.white, borderRadius: 50 }} />
            {/* DATA CONTAINER */}
            <View style={{ gap: 10, padding: 5 }}>
                {/* NOME */}
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.white }}>
                    {name}
                </Text>
                {/* STATUS */}
                <Text style={{ fontSize: 14, color: "#ffffffbb", fontWeight: "bold" }}>
                    {status}
                </Text>
            </View>
        </View>
    )
}
export default function ChatHeader() {
    const chatContext = useContext(ChatContext)!;
    const navigation = useNavigation();
    const { chat } = chatContext
    return (
        <View style={styles.chatHeader}>
            {/* BOTAO 1 */}
            <CustomButton
                Icon={<Ionicons name="arrow-back" size={24} color={"#fff"} />}
                border='Circle'

                width={50}
                height={50}
                style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5" }}
                onPress={() => navigation.goBack()}
            />
            {/* TITULO PRINCIPAL
            Imagem, nome e status
            */}
            <ChatHeaderData name={chat?.hostName} status={"online"} />

            {/* BOTAO 2 */}
            <CustomButton
                Icon={<Ionicons name="call" size={24} color={colors.lightGray} />}
                border='Circle'

                width={50}
                height={50}
                style={{ zIndex: 3, backgroundColor: colors.background, borderWidth: 1, borderColor: "#c5c5c5" }}
            />
            {/* BOTAO 3 */}
            <CustomButton
                Icon={<Entypo name="dots-three-vertical" size={24} color={colors.lightGray} />}
                border='Circle'

                width={50}
                height={50}
                style={{ zIndex: 3, backgroundColor: colors.background, borderWidth: 1, borderColor: "#c5c5c5" }}
            />
        </View>
    );
};