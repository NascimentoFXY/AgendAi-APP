import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../../configs/colors';

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
    message1:{
        borderWidth: 1,
        padding:20,
        borderRadius: 10,
        alignSelf: "flex-start",
        maxWidth: "70%",
        marginVertical: 3,
        marginLeft: 20,
     

    },
    message2:{
        borderWidth: 1,
        padding:20,
        borderRadius: 10,
        alignSelf: "flex-end",
        maxWidth: "70%",
        marginRight: 20,
        marginVertical: 3,
        backgroundColor: colors.primary,
        color: colors.white,

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
    userDataShow:{
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        alignSelf: "flex-start",
        width: "50%",
        alignItems: "center"
    },

});