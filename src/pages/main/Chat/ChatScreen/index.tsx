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
import { styles } from './style';
import CustomButton from '../../../../components/customButton';
import colors from '../../../../configs/colors';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

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
interface message {
    id: number,
    message: string,
    sender: string,
    time: string,
    isSender: boolean,

}
const messages: message[] = [
    { id: 1, message: "Oi!", sender: "Cleiton", time: "13:01", isSender: false },
    { id: 2, message: "Olá!", sender: "user2", time: "13:01", isSender: true },
    { id: 3, message: "Como ficou o corte?", sender: "Cleiton", time: "13:02", isSender: false },
    { id: 4, message: "Gostou?", sender: "Cleiton", time: "13:02", isSender: false },
    { id: 5, message: "Ficou muito massa!", sender: "user2", time: "13:03", isSender: true },
    { id: 6, message: "Boa!", sender: "Cleiton", time: "13:03", isSender: false },
]
const isLastFromUser = (messages: message[], index: number) => {
    const current = messages[index]
    const next = messages[index + 1]
    return !next || next.sender !== current.sender
}

export default function ChatScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            {/* ================================================HEADER================================================ */}
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
                <ChatHeaderData name={"Cleiton"} status={"online"} />
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
            <View style={styles.messagesContainer}>
                <Text style={styles.title}>HOJE</Text>


                <ScrollView>
                    {messages.map((item, message) => (

                        <View>
                            <Text key={item.id} style={[item.isSender ? styles.message2 : styles.message1]}>{item.message}</Text>
                            {
                                isLastFromUser(messages, message) && (
                                    <View style={styles.userDataShow}>
                                        {/* Imagem */}
                                        <View style={item.isSender ?
                                            { display: "none" } :
                                            { backgroundColor: colors.primary, width: 50, height: 50, borderRadius: 100 }} />
                                        {/* Nome e horário */}
                                        <Text>{item.isSender ? null : item.sender}</Text>
                                        <Text>{item.isSender ? null : item.time}</Text>
                                    </View>
                                )
                            }


                        </View>
                    ))}
                </ScrollView>



            </View>
        </SafeAreaView>
    );
};