import React, { useRef, useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../../context/auth';
import { ChatContext } from '../../../../context/chatContext';


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
import TabBarButton from '../../../../components/TabBar';
import { Timestamp } from '@firebase/firestore';

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
    message: string,
    sender: string,
    senderID: string,
    time: any,
}
const isLastFromUser = (messages: message[], index: number) => {
    const current = messages[index]
    const next = messages[index + 1]
    //retorna true quando:
    //  quando nao tiver próximo, ou seja, for o último da lista
    //  ou quando o próximo for de outro usuário
    return !next || next.sender !== current.sender
}


const isSameTime = (message: message[], index: number) => {
    const currentMessage = message[index];
    const nextMessage = message[index + 1];
    if (!nextMessage) return true;
    return nextMessage.time !== currentMessage.time;
}

export default function ChatScreen({ navigation }: any) {
    const chatContext = useContext(ChatContext);
    const { user, } = useContext(AuthContext)!;

    if (!chatContext) {
        throw new Error("ChatContext not provided. Make sure to wrap your component with a ChatProvider.");
    }
    const { messages, addMessage, exitChat, chatID } = chatContext;
    const [textInputValue, setTextInputValue] = useState("")


    const processedMessages = messages.map((msg, i) => ({
        ...msg,
        isLastFromUser: !messages[i + 1] || messages[i + 1].senderID !== msg.senderID,

    }));

    const submitMessage = async () => {
        console.log(chatID)
        if (!textInputValue) return;

        addMessage(textInputValue, chatID)
            .then(() => setTextInputValue("")) // limpa input após enviar
            .catch(err => console.error("Erro ao enviar mensagem:", err));
    };


    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

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

                <ScrollView contentContainerStyle={{ paddingBottom: 120 }} ref={scrollViewRef} >

                    {processedMessages.map((item, index) => (
                        <View key={item.id}>
                            <Text style={[item.sender === user?.name ? styles.message2 : styles.message1]}>{item.message}</Text>

                           <Text style={{ color: colors.lightGray, alignSelf: item.senderID == user?.id ? "flex-end" : "flex-start", paddingHorizontal: 10 }}>
                                horario
                            </Text>

                            {/* horario */}
                            {
                                item.isLastFromUser && (

                                    <View key={item.id} style={{
                                        flexDirection: "row",
                                        padding: 5,
                                        marginBottom: 20,
                                        justifyContent: "space-between",
                                        width: "30%",
                                        alignSelf: item.senderID === user?.id ? "flex-end" : "flex-start",
                                        alignItems: "center",
                                        backgroundColor: item.senderID === user?.id ? colors.lightGray : colors.primary

                                    }}>
                                        {/* Imagem */}
                                        <View style={{ backgroundColor: colors.primary, width: 30, height: 30, borderRadius: 100, }} />
                                        {/* Nome */}
                                        <Text style={{ flex: 1, paddingLeft: 20, }}>{item.sender}</Text>
                                    </View>
                                )
                            }


                        </View>
                    ))}
                </ScrollView>

                <TabBarButton
                    title='Enviar Mensagem'
                    type='input1'
                    textInputValue={textInputValue}
                    onChangeText={(text) => setTextInputValue(text)}
                    onPress={() => submitMessage()}
                />
            </View>
        </SafeAreaView>
    );
};