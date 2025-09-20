import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../configs/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        padding: 20,
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: "row"
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
    chatContainer: {
        padding: 20,
        backgroundColor: colors.background,
        borderColor: colors.transparentLightGray,
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 20,
        flexDirection: 'row'

    },
    chatTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    
    chatName: {
        fontSize: 18,
        fontWeight: "bold",

    },
    chatLastMessage: {
        color: colors.transparentLightGray,
        fontSize: 16,
        width: "90%" 
    
    },
    chatImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: colors.primary,
        marginRight: 20,

    },
    chatPersonStatus:{
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: colors.lightGray,
        position: 'absolute',
        bottom: 0,
        right: 0,
    }

});