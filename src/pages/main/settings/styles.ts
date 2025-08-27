import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../configs/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    secondaryOptions: {
        backgroundColor: colors.background,
        borderBottomWidth: 2,
        borderColor: colors.lightGray
    },
    headerContainer:{
        height: 100,
        justifyContent: "center",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",

    },

});