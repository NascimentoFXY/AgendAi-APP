import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import Icon from "../../../../../../configs/icons"
import colors from "../../../../../../configs/theme"

interface InputProps {
    placeholder: string | undefined,
    icon?: boolean
    style?: TextStyle | ViewStyle,
    value?: any,
    onChangeText?: (text: string) => void,
    maxChar?: number,
    numeric?: boolean

}
export const Input = ({ placeholder, style, icon = true, onChangeText, value, maxChar, numeric = false }: InputProps) => {
    return (
        <View style={{ borderBottomColor: colors.lightGray, borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
            <TextInput
                style={[{ fontSize: 20, flexGrow: 1, width: "90%" }, style]}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                maxLength={maxChar}
                keyboardType={numeric ? 'number-pad' : 'default'}
            />

            {icon && (
                <Icon.Feather name="edit-3" size={24} color="black" />
            )}
        </View>

    )
}
export default Input;