import colors, { font } from 'configs/theme';
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import UserRatings from './userProfileSections/userRatings';
import { normalizeFont } from 'configs/utils';
import Icon from 'configs/icons';
const { width, height } = Dimensions.get('window');
export default function UserProfile() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bannerContainer}>

                <TouchableOpacity activeOpacity={0.7} style={{ position: "absolute", bottom: 25, right: 20, backgroundColor: colors.primary, padding: 5, borderRadius: 10,flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Icon.Ionicons name='camera' size={normalizeFont(15)} color={colors.background} />
                    <Text style={{color: colors.white,fontFamily: font.poppins.regular, textAlign: "center", fontSize: normalizeFont(12)}}>Editar</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContainer}>
                {/* modal header */}
                <View style={styles.modalHeader}>
                    {/* user info */}
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ padding: 20, backgroundColor: colors.background, borderRadius: 200, marginTop: -50, alignSelf: "flex-start" }}>
                            <View style={styles.userPhoto} />
                            <TouchableOpacity activeOpacity={0.7} style={{ width: 45, height: 45, borderRadius: 200, backgroundColor: colors.debug, position: "absolute", bottom: 20, right: 20 }} />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userInfoText} numberOfLines={1}>User Long Name-------------------------------</Text>
                            <Text style={styles.userInfoText} numberOfLines={1}>User Email</Text>
                        </View>
                    </View>
                    <ScrollView horizontal contentContainerStyle={{ padding: 20, gap: 20 }}>
                        {/* options list */}
                        <TouchableOpacity>
                            <Text>
                                Minhas avaliações
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                                Avaliações sobre mim
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                                Salvos
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {/* <View style={{height: height, width: width}}/> */}

                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    <UserRatings />

                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    //banner
    bannerContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //modal styles
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        marginTop: -20,
        backgroundColor: colors.background,
        overflow: "visible"
    },
    modalHeader: {
        borderRadius: 20,
        borderBottomWidth: 1,

    },

    userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: "#ccc",
    },
    userInfo: {
        paddingVertical: 15,
        gap: 5,
    },
    userInfoText: {
        maxWidth: "80%",
    }
});