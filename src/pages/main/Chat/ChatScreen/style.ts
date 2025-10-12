import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../../configs/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatHeader: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.primary,
        flexDirection: 'row',
        paddingVertical: 50,
        gap: 10,
        paddingHorizontal: 10,
        zIndex: 1,

    },
    messagesContainer: {
        zIndex: 2,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        flex: 1,
        marginTop: -20,
        backgroundColor: colors.background,
    },

    message: {
        borderRadius: 20,
        borderTopLeftRadius: 0,
        marginLeft: 20,
        maxWidth: "70%",
        marginVertical: 3,
        paddingHorizontal: 20,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignSelf: "flex-start",

    },
    senderMessage: {
        marginLeft: 0,
        marginRight: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
        backgroundColor: colors.primary,
        alignSelf: "flex-end",
        borderColor: colors.secondary
    },
    lastMessageStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    title: {
        padding: 20,
        textAlign: "center",
        fontWeight: 800,
        fontSize: 16,
    },
    label: {
        padding: 20,
        color: colors.lightGray,
        fontWeight: 500
    },
    closebtn: {
        position: "absolute", borderRadius: 100, borderWidth: 1, right: 10, top: 10, zIndex: 10, width: 20, height: 20, backgroundColor: colors.background, justifyContent: "center", alignItems: "center"
    },
    userDataShow: {

    },
    none: {
        display: "none"
    }

});