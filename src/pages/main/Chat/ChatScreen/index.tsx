import React, {
    useRef,
    useState,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { AuthContext } from "../../../../context/auth";
import { ChatContext } from "../../../../context/chatContext";
import { styles } from "./style";
import colors, { font } from "../../../../configs/theme";
import TabBarButton from "../../../../components/TabBar";
import ChatHeader from "./components";
import { formatFirestoreTimestamp } from "configs/utils";
import pickImage from "configs/pickImage";
import { storage } from "services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Icon from "configs/icons";

const uploadImageAndSaveToFirestore = async (imageUri: string, chatID?: string) => {
    try {
        if (!imageUri || !chatID) return console.log("algo não está sendo salvo");
        const response = await fetch(imageUri);
        const blob = await response.blob();

        const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
        const storageRef = ref(storage, `images/chats/chat${chatID}/${Date.now()}_${imageName}`);

        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Erro ao carregar imagem ou salvar no Firestore:", error);
        throw error;
    }
};

export default function ChatScreen({ navigation }: any) {
    const { user } = useContext(AuthContext)!;
    const chatContext = useContext(ChatContext);
    const [imageSend, setImageSend] = useState<string | undefined>();
    const flatListRef = useRef<FlatList>(null);

    if (!chatContext) {
        throw new Error(
            "ChatContext not provided. Make sure to wrap your component with a ChatProvider."
        );
    }

    const { messages, addMessage, chat } = chatContext;
    const [textInputValue, setTextInputValue] = useState("");

    // Processa mensagens
    const processedMessages = useMemo(
        () =>
            messages.map((msg, i) => ({
                ...msg,
                isLastFromUser:
                    !messages[i + 1] || messages[i + 1].senderID !== msg.senderID,
                isFirst:
                    !messages[i - 1] || messages[i - 1].senderID !== msg.senderID,
            })),
        [messages]
    );

    const imagePicker = async () => {
        const response = await pickImage(1, 1);
        if (!response) return;
        setImageSend(response);
    };

    const submitMessage = useCallback(async () => {
        if (!textInputValue.trim()) return;
        try {
            // let _imageSend;
            // if (imageSend) {
            //     const imageResponse = await uploadImageAndSaveToFirestore(imageSend, chat.id);
            //     _imageSend = imageResponse;
            //     console.log("enviando ao storage");
            // }
            await addMessage(textInputValue, chat?.id, imageSend || undefined);
            setTextInputValue("");
            setImageSend(undefined);
            flatListRef.current?.scrollToEnd({ animated: true });
        } catch (err) {
            console.error("Erro ao enviar mensagem:", err);
        }
    }, [textInputValue, addMessage, chat?.id, imageSend]);

    // Scroll automático ao receber novas mensagens
    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages.length]);

    if (!chat?.targetID) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    const renderMessage = ({ item, index }: { item: any; index: number }) => {
        const { display } = formatFirestoreTimestamp(item.time);

        return (
            <View key={item.id || index}>
                <View
                    style={[
                        styles.message,
                        item.senderID === user?.id ? styles.senderMessage : null,
                        item.isFirst ? null : styles.lastMessageStyle,
                    ]}
                >
                    {item.messageImage && (
                        <>
                            <Image
                                style={{
                                    width: 250,
                                    height: 250,
                                    borderRadius: 5,
                                    marginBottom: 5,
                                }}
                                source={{ uri: item.messageImage }}
                            />
                            <Text style={{position: "absolute",zIndex: -1, top: 20, left: 20, fontSize: 10, fontFamily: font.poppins.bold, color: colors.lightGray}}>Por questões de armazenamento, só quem enviou a imagem pode ver</Text>
                        </>
                    )}

                    <Text
                        style={{
                            color: item.senderID === user?.id ? colors.white : "#000",
                        }}
                    >
                        {item.message}
                    </Text>

                    <Text
                        style={{
                            color:
                                item.senderID === user?.id
                                    ? colors.white
                                    : colors.lightGray,
                            alignSelf:
                                item.senderID === user?.id ? "flex-end" : "flex-start",
                            padding: 10,
                            paddingHorizontal: 0,
                        }}
                    >
                        {display}
                    </Text>
                </View>

                {item.isLastFromUser && (
                    <View
                        key={`${item.id}-info`}
                        style={{
                            flexDirection: "row",
                            padding: 5,
                            paddingHorizontal: 20,
                            marginBottom: 20,
                            justifyContent:
                                item.senderID === user?.id ? "flex-end" : "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={{ uri: item.senderImage }}
                            style={{
                                backgroundColor: colors.primary,
                                width: 30,
                                height: 30,
                                borderRadius: 100,
                            }}
                        />
                        <Text
                            style={{
                                paddingLeft: 10,
                                fontWeight: "bold",
                                maxWidth: "70%",
                            }}
                            numberOfLines={1}
                        >
                            {item.sender}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader />

            <View style={styles.messagesContainer}>
                <Text style={styles.title}>HOJE</Text>

                <FlatList
                    ref={flatListRef}
                    data={processedMessages}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    renderItem={renderMessage}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                />

                {imageSend && (
                    <View
                        style={{
                            backgroundColor: colors.background,
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 20,
                            borderColor: colors.lightGray,
                            position: "absolute",
                            bottom: 120,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.closebtn}
                            onPress={() => {
                                setImageSend(undefined);
                            }}
                        >
                            <Icon.Ionicons name="close" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: imageSend }}
                            style={{ flex: 1, width: 120, height: 120 }}
                        />
                    </View>
                )}

                <TabBarButton
                    title="Enviar Mensagem"
                    type="input1"
                    textInputValue={textInputValue}
                    onChangeText={setTextInputValue}
                    onPress={submitMessage}
                    onAction={imagePicker}
                />
            </View>
        </SafeAreaView>
    );
}
