import colors, { font } from 'configs/theme';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import UserRatings from './userProfileSections/userRatings';
import { LoadingModal, normalizeSize, capitalizeFirstLetter } from 'configs/utils';
import Icon from 'configs/icons';
import { useAuthContext } from 'context/auth';
import pickImage from 'configs/pickImage';
import TabBarButton from 'components/TabBar';
import UserSaved from './userProfileSections/userSaved';

const { width, height } = Dimensions.get('window');

export default function UserProfile() {
    const { user } = useAuthContext()!;
    const [isLoading, setLoading] = useState<boolean>(false);
    const [userBaner, setUserBanner] = useState<string | null>(null);
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [hasEdited, setHasEdited] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        const loadUserData = async () => {
            if (!user) return;
            setUserPhoto(user?.image!);
            setUserName(user?.name!);
            setUserEmail(user?.email!);
        };
        setLoading(false);
        loadUserData();
    }, []);
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
        await pickImage(1, 1).then((imageUri) => {
            if (imageUri) {
                setUserPhoto(imageUri);
                setHasEdited(true);
            }
        });
        setLoading(false);
    }
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
                <TouchableOpacity activeOpacity={0.7} style={styles.editBannerButton}
                    onPress={pickBannerImageFromGalery}
                >
                    <Icon.Ionicons
                        name="camera"
                        size={normalizeSize(15)}
                        color={colors.background}
                    />
                    <Text style={styles.editBannerText}>Editar</Text>
                </TouchableOpacity>
            </View>

            {/* Modal / Content */}
            <ScrollView contentContainerStyle={{paddingBottom: 250}} style={{borderRadius: 20,paddingTop: 80, marginTop: -100}} >
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
                                    <Text style={[styles.userInfoText, { fontSize: normalizeSize(16) }]} numberOfLines={2}>
                                        {capitalizeFirstLetter(user?.name!) || 'Nome do Usuário'}
                                    </Text>
                                    <TouchableOpacity style={styles.editUserInfoButton}>
                                        <Icon.AntDesign
                                            name="edit"
                                            size={normalizeSize(16)}
                                            color={colors.darkGray}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.userInfoTextWrapper}>
                                    <Text style={styles.userInfoText} numberOfLines={1}>
                                        {user?.email!}
                                    </Text>
                                    <TouchableOpacity style={styles.editUserInfoButton}>
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
                            <TouchableOpacity>
                                <Text style={styles.tabText}>Minhas avaliações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.tabText}>Avaliações sobre mim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.tabText}>Salvos</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    {/* Content Scroll */}
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                        <UserRatings />
                        <UserSaved />
                    </ScrollView>
                </View>
            </ScrollView>
            {hasEdited && <TabBarButton title='Salvar' />}
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
