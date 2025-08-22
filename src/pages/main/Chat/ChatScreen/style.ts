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
    title: {
        flex: 1,
        textAlign: "center",
        fontWeight: "bold"
    },
    label: {
        padding: 20,
        color: colors.lightGray,
        fontWeight: 500
    },

});