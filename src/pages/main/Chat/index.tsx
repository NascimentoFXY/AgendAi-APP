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
    TextStyle
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import { styles } from './style';
import colors from '../../../configs/colors';
import TabBarButton from '../../../components/TabBar';
import { useNavigation } from "@react-navigation/native";
import { ChatContext } from '../../../context/chatContext';
const ChatComp = ({ chatName, time, lastMessage, chatID }: any,) => {

    const navigation = useNavigation<any>();
    const name = chatName || "Nome do Usuário";
    const message = chatID || "Lorem ipsum dolor, sit amet consectetur...";
    const hour = time || "Horário";

    const {useChat, exitChat} = useContext(ChatContext)!
    return (
        <TouchableOpacity
            onPress={() => (navigation.navigate("Home", {screen: "ChatScreen"}), useChat(chatID))}
            activeOpacity={0.8}>
            <View style={styles.chatContainer}>
                
                <View style={styles.chatImage} >
                    <View style={styles.chatPersonStatus} />
                </View>

                <View style={{ flex: 1 }}>

                    <View style={styles.chatTop}>
                        <Text style={styles.chatName}>{name}</Text>
                        <Text style={{ fontWeight: "bold", color: colors.lightGray }}>{hour}</Text>
                    </View>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chatLastMessage}>{message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default function Chat({ navigation }: any) {
    const { createChat, chatList, fetchChats } = useContext(ChatContext)!;
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchChats().then(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
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

            <ScrollView
                contentContainerStyle={{ gap: 20 }}>

                {!loading && chatList && chatList.map(chat => (
                    <ChatComp key={chat.id} chatName={chat.hostName} lastMessage={""} chatID={chat.id}/>
                ))}
               
            </ScrollView>


            <CustomButton
                Icon={<Ionicons name="chatbubble-ellipses" size={24} color={"#fff"} />}
                border='Circle' 
                type='absolute'
                width={80}
                height={80}
                style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5", bottom: 20, right: 20 }}
                onPress={createChat}
                />
            <CustomButton
                Icon={<Ionicons name="reload" size={24} color={"#fff"} />}
                border='Circle' 
                type='absolute'
                width={80}
                height={80}
                style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5", bottom: 120, right: 20 }}
                onPress={fetchChats}
                />
        </View>
    )
}