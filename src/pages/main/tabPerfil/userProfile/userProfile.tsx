import colors, { font } from 'configs/theme';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TextInput
} from 'react-native';
import UserRatings from './userProfileSections/userRatings';
import { LoadingModal, normalizeSize, capitalizeFirstLetter } from 'configs/utils';
import Icon from 'configs/icons';
import { useAuthContext } from 'context/auth';
import pickImage from 'configs/pickImage';
import TabBarButton from 'components/TabBar';
import UserSaved from './userProfileSections/userSaved';
import { db, uploadImageAndSaveToFirestore } from 'services/firebase';
import { doc, updateDoc } from '@firebase/firestore';
import { useAlert } from 'context/alertContext';

const { width, height } = Dimensions.get('window');

export default function UserProfile() {
    const { user, refreshUserData } = useAuthContext()!;
    const [isLoading, setLoading] = useState<boolean>(false);
    const [userBaner, setUserBanner] = useState<string | null>(null);
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [hasEdited, setHasEdited] = useState<boolean>(false);
    const scrollRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [editName, setEditName] = useState(false)
    const [editEmail, setEditEmail] = useState(false)
    const pages = [1, 2, 3]

    const alert = useAlert().showAlert
    const handleSave = async () => {
        try {
            setLoading(true)
            console.log("id do usuario:", user?.id)
            const userRef = doc(db, "users", user?.id!);
            const imagePath = `images/users/${user?.id}/userPhoto.jpg`
            console.log("[Imagem tentando ser enviada:]", userPhoto)
            const ImageURL = await uploadImageAndSaveToFirestore(userPhoto!, imagePath)
            console.log("[ImagemURL Gerada:]",ImageURL);
            const newData = {
                image: ImageURL,
                name: userName,
                email: userEmail,
                
            }
            if (user)
                await updateDoc(userRef, newData);
            alert("Dados atualizados", "success")
        } catch (er) {
            console.warn(er)
            alert("Um erro ocorreu, tente novamente.", "error")
        } finally{
            refreshUserData();
            setLoading(false)
        }
        
    }
    useEffect(() => {
        setLoading(true);
        const loadUserData = async () => {
            if (!user) return;
            setUserPhoto(user?.image!);
            setUserName(user?.name!);
            setUserEmail(user?.email!);
            setLoading(false);
        };
        loadUserData();
    }, []);


    useEffect(() => {
        if (userName != user?.name || userEmail != user?.email || userPhoto != user?.image) {
            setHasEdited(true)
        }
        else {
            setHasEdited(false)
        }
    }, [userName, userEmail, userPhoto != user?.image]);
    const pickBannerImageFromGalery = async () => {
        setLoading(true);
        await pickImage(16, 9).then((imageUri) => {
            if (imageUri) {
                setUserBanner(imageUri);
                setHasEdited(true);
            }
        });
        setLoading(false);
    }
    const pickUserPhotoFromGalery = async () => {
        setLoading(true);
        const userRef = doc(db, "users", user?.id!);
        const path = `images/users/${user?.id}/userPhoto.jpg`
        const image = await pickImage(1, 1);
        if (!image) {
            setLoading(false);
            return
        };

        setUserPhoto(image)
        setLoading(false);
    }
    console.log("Foto selecionada:",userPhoto)
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width)
        // console.log(pageIndex)
        setCurrentPage(pageIndex);
    }, [width])

    const scrollToPage = useCallback((pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < pages.length && scrollRef.current) {
            scrollRef.current.scrollTo({ x: width * pageIndex, animated: true });
        } else {

            console.warn(`Página com índice ${pageIndex} não encontrada.`);
        }
    }, [width, pages]);

    return (
        <SafeAreaView style={styles.container}>
            <LoadingModal loading={isLoading} />

            {/* Banner */}
            <View style={styles.bannerContainer}>
                <Image
                    source={{ uri: userBaner || userPhoto || undefined }}
                    blurRadius={userBaner ? 0 : 5}
                    style={[styles.bannerImage, userBaner && { opacity: 1 }]}
                />
                
            </View>

            {/* Modal / Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: 250 }} style={{ borderRadius: 20, paddingTop: 80, marginTop: -100 }} >
                {/* Header */}
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        {/* User Info */}
                        <View style={styles.userInfoContainer}>
                            <View style={styles.userPhotoWrapper}>
                                <Image source={{ uri: userPhoto || undefined }} style={styles.userPhoto} />
                                <TouchableOpacity onPress={pickUserPhotoFromGalery} activeOpacity={0.7} style={styles.changePhotoButton}>
                                    <Icon.Ionicons
                                        name="camera"
                                        size={normalizeSize(20)}
                                        color={colors.background}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.userInfo}>
                                <View style={styles.userInfoTextWrapper}>


                                    {!editName && <Text style={[styles.userInfoText, { fontSize: normalizeSize(16) }]} numberOfLines={2}>
                                        {capitalizeFirstLetter(userName!) || 'Nome do Usuário'}
                                    </Text>}
                                    {editName &&
                                        <TextInput style={[styles.userInfoText, { fontSize: normalizeSize(16), borderBottomWidth: 1 }]} value={userName!} onChangeText={setUserName} />

                                    }

                                    <TouchableOpacity style={styles.editUserInfoButton} onPress={() => setEditName(!editName)}>
                                        <Icon.AntDesign
                                            name="edit"
                                            size={normalizeSize(16)}
                                            color={colors.darkGray}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.userInfoTextWrapper}>
                                    {!editEmail && <Text style={[styles.userInfoText, { fontSize: normalizeSize(16) }]} numberOfLines={2}>
                                        {userEmail || 'Email do Usuário'}
                                    </Text>}
                                    {editEmail &&
                                        <TextInput style={[styles.userInfoText, { fontSize: normalizeSize(16), borderBottomWidth: 1 }]} value={userEmail!} onChangeText={setUserEmail} />

                                    }
                                    <TouchableOpacity style={styles.editUserInfoButton}
                                        onPress={() => setEditEmail(!editEmail)}
                                    >
                                        <Icon.AntDesign
                                            name="edit"
                                            size={normalizeSize(16)}
                                            color={colors.darkGray}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* other actions */}
                        <ScrollView contentContainerStyle={styles.otherActionsContainer} horizontal showsHorizontalScrollIndicator={false}>


                            <TouchableOpacity style={styles.otherActionButton}>
                                <Text style={styles.otherActionText}>
                                    Central de ajuda
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.otherActionButton}>
                                <Text style={styles.otherActionText}>
                                    Conta
                                </Text>
                            </TouchableOpacity>


                        </ScrollView>

                        {/* Tabs */}
                        <ScrollView horizontal contentContainerStyle={styles.tabsContainer} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => { scrollToPage(0) }}>
                                <Text style={styles.tabText}>Minhas avaliações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { scrollToPage(1) }}>
                                <Text style={styles.tabText}>Favoritos</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>

                    {/* Content Scroll */}
                    <ScrollView
                        ref={scrollRef}
                        onScroll={handleScroll}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}>

                        <UserRatings />
                        <UserSaved />

                    </ScrollView>
                </View>
            </ScrollView>
            {hasEdited && <TabBarButton title='Salvar' onPress={async()=>handleSave()} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },

    /** Banner */
    bannerContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#000000ff',

    },
    editBannerButton: {
        position: 'absolute',
        bottom: 25,
        right: 20,
        backgroundColor: colors.primary,
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    editBannerText: {
        color: colors.white,
        fontFamily: font.poppins.regular,
        textAlign: 'center',
        fontSize: normalizeSize(12),
    },
    editUserInfoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    /** Modal / Header */
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: colors.background,
        width: width
    },
    modalHeader: {
        borderRadius: 20,
        borderBottomWidth: 1,

    },

    /** User Info */
    userInfoContainer: {
        flexDirection: 'row',
    },
    userPhotoWrapper: {
        padding: 20,
        backgroundColor: colors.background,
        borderRadius: 200,
        marginTop: -50,
        alignSelf: 'flex-start',
    },
    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#ccc',
    },
    changePhotoButton: {
        width: 45,
        height: 45,
        borderRadius: 200,
        backgroundColor: colors.lightGray,
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    userInfo: {
        paddingVertical: 15,
        gap: 5,
        justifyContent: 'center',
        width: normalizeSize(width * 0.55),
    },
    userInfoTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userInfoText: {
        fontFamily: font.poppins.semibold,
        fontSize: normalizeSize(14),
        color: colors.textPrimary,
    },

    /** Other actions */

    otherActionsContainer: {
        paddingHorizontal: 20,
    },
    otherActionButton: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.lightGray,
        marginHorizontal: 10
    },
    otherActionText: {
        color: colors.lightGray,
        fontFamily: font.poppins.bold,
        fontSize: normalizeSize(12),
    },
    /** Tabs */
    tabsContainer: {
        padding: 20,
        gap: 20,
    },
    tabText: {
        fontFamily: font.poppins.regular,
        fontSize: normalizeSize(14),
        color: colors.darkGray,
    },
});
