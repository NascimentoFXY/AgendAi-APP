import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ViewStyle,
    TextStyle,
    Image
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import { styles } from './style';
import colors from '../../../configs/theme';
import TabBarButton from '../../../components/TabBar';
import { useNavigation } from "@react-navigation/native";

import { ChatContext } from '../../../context/chatContext';
import { AuthContext } from 'context/auth';
import { findUserImage } from 'configs/utils';


const ChatComp = ({ chatName, time, lastMessage, chatID, targetImage, isOnline }: any,) => {

    const navigation = useNavigation<any>();
    const name = chatName || "Nome do Usuário";
    const message = lastMessage || "Lorem ipsum dolor, sit amet consectetur...";
    const hour = time || "Horário";

    const { useChat, exitChat } = useContext(ChatContext)!

    return (
        <TouchableOpacity
            onPress={() => (navigation.navigate("Home", { screen: "ChatScreen" }), useChat(chatID))}
            activeOpacity={0.8}>
            <View style={styles.chatContainer}>

                {targetImage ? <View style={[styles.chatImage, { backgroundColor: "#00fffff" }]} >
                    <Image style={[styles.chatImage, { marginRight: 0 }]} source={{ uri: targetImage }} />
                    <View style={[styles.chatPersonStatus, isOnline ? { backgroundColor: "#06da17ff", elevation: 2 } : null]} />
                </View> :
                    <View style={styles.chatImage} >
                        <View style={[styles.chatPersonStatus, isOnline ? { backgroundColor: "#00ff15ff" } : null]} />
                    </View>}

                <View style={{ flex: 1 }}>

                    <View style={styles.chatTop}>
                        <Text numberOfLines={2} style={styles.chatName}>{name}</Text>
                        <Text style={{ fontWeight: "bold", color: colors.lightGray, marginLeft: "auto" }}>12:00</Text>
                    </View>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chatLastMessage}>{lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}



export default function Chat() {
    const { createChat, deleteAllChats, chatList, messages } = useContext(ChatContext)!;
    const navigation = useNavigation();
    const { user } = useContext(AuthContext)!

    const [chatImages, setChatImages] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        if (!chatList) return
        const fetchImages = async () => {
            const newImages: { [key: string]: string | null } = {};

            // busca imagem apenas uma vez por chat
            await Promise.all(
                chatList
                    ?.filter(chat => chat.senderID === user?.id || chat.targetID === user?.id)
                    .map(async (chat) => {
                        const targetID =
                            chat.targetID === user?.id ? chat.senderID : chat.targetID;

                        // evita buscar duas vezes se já tiver a imagem
                        if (!chatImages[chat.id]) {
                            const image = await findUserImage(targetID);
                            newImages[chat.id] = image;
                        }
                    }) || []
            );

            setChatImages((prev) => ({ ...prev, ...newImages }));
        };

        if (chatList.length > 0) fetchImages();
    }, [chatList]);

    const renderedChats = React.useMemo(() => {
        console.log("renderizou")
        return chatList
            ?.filter(chat => chat.senderID === user?.id || chat.targetID === user?.id)
            .map(chat => {
                const chatMessages = messages.filter(msg => msg.chatID === chat.id);
                const lastMessage = chatMessages.length > 0
                    ? chatMessages[chatMessages.length - 1].message
                    : "";
                const image = chatImages[chat.id];
                const targetID = chat.targetID === user?.id ? chat.senderID : chat.targetID;

                return (
                    <ChatComp
                        key={chat.id}
                        chatName={chat.targetID !== user?.id ? chat.targetName : chat.senderName}
                        lastMessage={lastMessage}
                        chatID={chat.id}
                        targetID={chat.targetID}
                        targetImage={image}
                        isOnline={true}
                    />
                );
            });
    }, [chatList, chatImages, user?.id]);
    return (
        <View style={styles.container}>
            {/*----- header---- */}
            <View style={styles.header}>

                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={"#fff"} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5" }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Chat</Text>

                <CustomButton
                    Icon={<Ionicons name="search" size={24} color={colors.lightGray} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: colors.background, borderWidth: 1, borderColor: "#c5c5c5" }}
                />
            </View>
            {/* --------- */}
            <ScrollView
                contentContainerStyle={{ gap: 20 }}>

                {renderedChats}

            </ScrollView>


            {/* botao de excluir todos os chats */}
            <CustomButton
                Icon={<Ionicons name="trash" size={24} color={"#fff"} />}
                border='Circle'
                type='absolute'
                width={80}
                height={80}
                style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5", bottom: 120, right: 20 }}
                onPress={deleteAllChats}
            />
        </View>
    )
}