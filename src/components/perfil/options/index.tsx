import React from 'react';
import {
    TextInput,
    TextInputProps,
    View,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ViewProps
} from 'react-native';

interface PerfilOptions extends ViewProps {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    style?: ViewStyle;
    inputStyle?: TextStyle;
}

const perfilOptions: React.FC<PerfilOptions> = ({
    leftIcon,
    rightIcon,
    style,
    inputStyle,
    ...props
}) => {
    return (
        <View style={[styles.container, style]}>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

            <TextInput
                style={[styles.input, inputStyle]}
                placeholderTextColor="#999"
                {...props}
            />

            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
    );
};

export default perfilOptions;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 30,
        paddingHorizontal: 12,
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
});
