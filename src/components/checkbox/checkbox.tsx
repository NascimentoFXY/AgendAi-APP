import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../configs/theme";

export interface CheckboxProps {
  checked?: boolean; // controle externo (opcional)
  defaultChecked?: boolean; // valor inicial, se for não controlado
  onChange?: (checked: boolean) => void; // callback ao mudar
  size?: number; // tamanho do quadrado
  color?: string; // cor quando marcado
  borderColor?: string; // cor da borda quando desmarcado
  iconColor?: string; // cor do ícone
  rounded?: boolean; // deixar circular
  style?: ViewStyle; // estilo extra
}

/**
 * Checkbox flexível e reutilizável.
 * Pode ser controlado internamente ou externamente.
 */
export default function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  size = 24,
  color = colors.primary,
  borderColor = "#ccc",
  iconColor = "#fff",
  rounded = false,
  style,
  ...props
}: CheckboxProps) {
  // Se o estado for controlado externamente, usa `checked`
  // Se não, controla internamente com `internalChecked`
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    const newValue = !isChecked;
    if (!isControlled) setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.checkbox,
        {
          width: size,
          height: size,
          borderRadius: rounded ? size / 2 : 4,
          backgroundColor: isChecked ? color : colors.background,
          borderColor: isChecked ? color : borderColor,
        },
        style,
      ]}
      onPress={toggle}
      {...props}
    >
      {isChecked && (
        <Ionicons name="checkmark" size={size * 0.7} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
