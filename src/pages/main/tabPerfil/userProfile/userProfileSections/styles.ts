import colors, { font } from 'configs/theme';
import { normalizeFont } from 'configs/utils';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: { flex: 1, width: width, paddingVertical: 20 },
    content: {
    },

    sectionTitle: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    Title: {
        fontSize: normalizeFont(18),
        fontFamily: font.poppins.bold
    },
    lengthText: {
        fontSize: normalizeFont(18),
        fontFamily: font.poppins.bold,
        color: colors.primary,

    }

});