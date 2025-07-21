import React, { forwardRef, Fragment, Ref } from "react";
import {
    DimensionValue,
    Text,
    TextInput,
    TextInputProps,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleProp,
    ViewStyle
} from "react-native";
import { styles } from "./style";
import colors from "../../configs/colors";
import { useState } from "react";

type InputProps = TextInputProps & {
    value?: string;
    title?: string;
    padding?: number;
    margin?: number;
    fontSize?: number;
    width?: DimensionValue;
    height?: DimensionValue;
    secureTextEntry?: boolean;
    style?: StyleProp<ViewStyle>;
    onIconPress?: () => void;
}

export const Input = forwardRef((Props: InputProps, ref: Ref<TextInput> | null) => {
    const { value, title, secureTextEntry, onIconPress, padding, margin, fontSize, width, height, style, ...rest } = Props;
    return (
        <Fragment>
            {title && <Text>{title}</Text>}
            <TextInput
                ref={ref}
                style={[
                    styles.input,
                    {
                        padding: padding ?? 12,
                        fontSize: fontSize ?? 12,
                        margin: margin ?? 0,
                        width: width ?? "100%",
                        height: height ?? "auto",
                    },
                    style
                    
                ]}
                {...rest}
                secureTextEntry={secureTextEntry}>
            </TextInput >

        </Fragment >

    );

})