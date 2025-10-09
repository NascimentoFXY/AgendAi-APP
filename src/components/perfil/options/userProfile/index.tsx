import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle, Text, TouchableOpacity, Image } from 'react-native';
import colors from '../../../../configs/theme';

interface UserOptionsProps {
    image?: string,
    icon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    style?: ViewStyle,
    subtitleStyle?: TextStyle,
    title?: string,
    titleStyle?: TextStyle
    subTitle?: string,
    onPress?: () => void

}

const UserOptions: React.FC<UserOptionsProps> = ({
    image = "",
    icon,
    rightIcon,
    title,
    subTitle,
    style,
    titleStyle,
    subtitleStyle,
    onPress,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.container, style]}>


            {image && (<Image source={{uri: image}} style={styles.image} />)}
            {icon && (icon)}

            <View style={{flexDirection: "column"}}>

                <Text style={[styles.title, titleStyle]}>{title}</Text>
                {subTitle && <Text style={[styles.subTitle, subtitleStyle]}>{subTitle}</Text>}
            </View>

            {rightIcon && (<View style={styles.rightIcon}>{rightIcon}</View>)}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%",
        backgroundColor: "#000",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: colors.primary
    },
    title: {
        color: colors.white,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    subTitle: {
        color: colors.white,
        padding: 20,
        fontSize: 16,

    },
    rightIcon: {
        position: "absolute",
        right: 20,
    }
})
export default UserOptions;