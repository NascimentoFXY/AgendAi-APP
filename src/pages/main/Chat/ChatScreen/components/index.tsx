import React, { useContext, useEffect, useRef, useState } from 'react';
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
    Image
} from 'react-native';
import { styles } from '../style';
import CustomButton from '../../../../../components/customButton';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import colors, { font } from '../../../../../configs/theme';
import { ChatContext } from '../../../../../context/chatContext';
import { useNavigation } from '@react-navigation/native'
import { db } from 'services/firebase';
import { doc, getDoc } from '@firebase/firestore';
import Icon from 'configs/icons';
import { findUserImage } from 'configs/utils';
import { AuthContext } from 'context/auth';


const ChatHeaderData = React.memo(({ name, status, chatImage }: any) => {
    return (
        <View style={{ flex: 1, flexDirection: "row", }}>
            {/* IMAGEM */}
            {chatImage ?
                <Image source={{ uri: chatImage }} style={{ width: 60, height: 60, backgroundColor: colors.white, borderRadius: 50 }} />
                :
                <View style={{ width: 60, height: 60, backgroundColor: colors.lightGray, borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                    <Icon.Ionicons name="person-sharp" size={30} color="#676767ff" />
                </View>}
            {/* DATA CONTAINER */}
            <View style={{ gap: 10, padding: 5, flex: 1 }}>
                {/* NOME */}
                <Text numberOfLines={2} style={{ fontFamily: font.poppins.bold, fontSize: 16, color: colors.white }}>
                    {name}
                </Text>
                {/* STATUS */}
                <Text style={{ fontSize: 14, color: "#ffffffbb", fontWeight: "bold" }}>
                    {status}
                </Text>
            </View>
        </View>
    )
})
export default function ChatHeader() {
    // console.log("chatHeader atualizou")
    
    const chatContext = useContext(ChatContext)!;
    const authContext = useContext(AuthContext)!;
    const navigation = useNavigation();
    const { chat } = chatContext
    const { user } = authContext
    const [chatImage, setChatImage] = useState<string | null>(null);
    const [chatname, setChatName] = useState<string>("")
    useEffect(() => {
        let isMounted = true;
        console.log("chatHeader Montado")
        
        const fetchImage = async () => {
            if (!chat?.targetID) return;
            
            try {
                const targetName = chat.targetID !== user?.id? chat.targetName : chat.senderName
                const targetID = chat.targetID === user?.id ? chat.senderID : chat.targetID
                const image = await findUserImage(targetID);
                if (isMounted) {
                    setChatImage(image);
                    setChatName(targetName)
                    console.log("Fetch image")
                    console.log("Fetch Name")
                }
            } catch (error) {
                console.error("Erro ao buscar imagem do target:", error);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
        };
    }, [chat?.targetID]);

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
            <ChatHeaderData name={chatname} status={"online"} targetID={chat.targetID} chatImage={chatImage} />

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