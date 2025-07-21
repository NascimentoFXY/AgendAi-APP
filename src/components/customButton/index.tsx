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
  View
} from 'react-native';

type IconComponent = React.ComponentType<React.ComponentProps<any>>;
type PositionType = 'absolute' | 'normal';
type Border = 'Round' | 'Square' | 'Circle'

type CustomButtonProps = TouchableOpacityProps & {
  Icon?: React.ReactNode;
  text?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  color?: string;
  backcolor?: string;
  type?: PositionType;
  border?: Border;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  Icon,
  text = '',
  width = 40,
  height = 40,
  color = '#000',
  backcolor = '#ccc',
  type = 'normal',
  border = 'Square',
  top,
  bottom,
  left,
  right,
  style,
  onPress,
  ...rest
}) => {


  const getBorderRadius = () => {
    switch (border) {
      case 'Square':
        return 0;
      case 'Circle':
        return 1000; // valor alto para simular um círculo
      case 'Round':
      default:
        return 12; // ou o que for considerado "arredondado"
    }
  };

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      width,
      height,
      backgroundColor: backcolor,
      position: type === 'absolute' ? 'absolute' : 'relative',
      borderRadius:
        getBorderRadius(),
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
      {Icon && <View>{Icon}</View>}
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
