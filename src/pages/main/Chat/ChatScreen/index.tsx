import React, { useRef, useState, useContext } from 'react';
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
import { FlatList } from 'react-native-gesture-handler';
import TabBarButton from '../../../../components/TabBar';

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
const isLastFromUser = (messages: message[], index: number) => {
    const current = messages[index]
    const next = messages[index + 1]
    //retorna true quando:
    //  quando nao tiver próximo, ou seja, for o último da lista
    //  ou quando o próximo for de outro usuário
    return !next || next.sender !== current.sender
}

export default function ChatScreen({ navigation }: any) {

    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        throw new Error("ChatContext not provided. Make sure to wrap your component with a ChatProvider.");
    }

    const { messages, addMessage } = chatContext;
    const [textInputValue, setTextInputValue] = useState("")

    const submitMessage = () => {
        //chama a função addMessage do contexto
        
        textInputValue ? addMessage(textInputValue) : null;
        setTextInputValue("");
    };



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


                <ScrollView contentContainerStyle={{ paddingBottom: 120 }} >
                    {messages.map((item, message) => (

                        <View key={item.id}>
                            <Text style={[item.isSender ? styles.message2 : styles.message1]}>{item.message}</Text>
                            {
                                isLastFromUser(messages, message) && (
                                    <View key={message} style={[!item.isSender ? styles.userDataShow : styles.none]}>
                                        {/* Imagem */}
                                        <View style={{ backgroundColor: colors.primary, width: 30, height: 30, borderRadius: 100, }} />
                                        {/* Nome e horário */}
                                        <Text style={{ flex: 1, paddingLeft: 20, }}>{item.sender}</Text>
                                        <Text style={{ color: colors.lightGray }}>{item.time}</Text>
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