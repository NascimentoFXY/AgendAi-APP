import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
  TouchableOpacityProps,
} from 'react-native';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

type IconComponent = React.ComponentType<React.ComponentProps<typeof AntDesign>>;
type PositionType = 'absolute' | 'normal';

type CustomButtonProps = TouchableOpacityProps & {
  Icon?: IconComponent;
  IconName?: string;
  IconSize?: number;
  text?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  color?: string;
  backcolor?: string;
  type?: PositionType;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  Icon,
  IconName,
  IconSize = 20,
  text = '',
  width = 40,
  height = 40,
  color = '#000',
  backcolor = '#ccc',
  type = 'normal',
  top,
  bottom,
  left,
  right,
  style,
  onPress,
  ...rest
}) => {
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      width,
      height,
      backgroundColor: backcolor,
      position: type === 'absolute' ? 'absolute' : 'relative',
      top,
      bottom,
      left,
      right,
      flexDirection: 'row',
      gap: 5,
    },
    style,
  ];

  const textStyle: StyleProp<TextStyle> = {
    color,
    fontSize: 16,
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} {...rest}>
      {Icon && IconName && <Icon name={IconName} size={IconSize} color={color} />}
      {text !== '' && <Text style={textStyle}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default CustomButton;
