import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Certifique-se de ter o @expo/vector-icons instalado

// 1. Definição das Props
interface ServiceItemProps {
    text?: string; // Opcional, com valor padrão
    amount?: number; // Opcional, com valor padrão (ex: "30 Tipos")
    iconName?: keyof typeof AntDesign.glyphMap; // Nome do ícone do AntDesign
    onPress?: () => void; // Função a ser executada ao pressionar
    style?: ViewStyle; // Para customizar o estilo do TouchableOpacity
    textStyle?: TextStyle; // Para customizar o estilo do texto principal
    amountStyle?: TextStyle; // Para customizar o estilo do texto da quantidade
    iconColor?: string; // Cor do ícone
    iconSize?: number; // Tamanho do ícone
}

// 2. Componente Funcional
const ServiceItem: React.FC<ServiceItemProps> = ({
    text = 'Cortes de Cabelo', // Valor padrão para o texto
    amount = 30,       // Valor padrão para a quantidade
    iconName = 'arrow-right',   // Valor padrão para o ícone
    onPress,
    style,
    textStyle,
    amountStyle,
    iconColor = '#3b000084',   // Valor padrão para a cor do ícone
    iconSize = 20,             // Valor padrão para o tamanho do ícone
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]} // Combina estilos padrão com os passados via prop
            onPress={onPress}
        >
            {/* Texto Principal */}
            <Text style={[styles.mainText, textStyle]}>{text}</Text>

            {/* Texto da Quantidade */}
            <Text style={[styles.amountText, amountStyle]}>{amount} Tipos</Text>

            {/* Ícone */}
            <AntDesign
                name={iconName}
                size={iconSize}
                color={iconColor}
                style={styles.icon}
            />
        </TouchableOpacity>
    );
};

// 3. Estilos (mantidos separados para organização e performance)
const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Note: removi 'ff' no final, que não é um formato de cor válido em RN Stylesheet sem prefixo
        borderRadius: 10,
        elevation: 1, // Sombra para Android
        flexDirection: 'row',
    },
    mainText: {
        flex: 1, // Permite que o texto principal ocupe o máximo de espaço
        paddingLeft: 30,
        // Cores e tamanhos de fonte padrão podem ser definidos aqui ou nas props
    },
    amountText: {
        padding: 10,
        // Cores e tamanhos de fonte padrão podem ser definidos aqui ou nas props
    },
    icon: {
        paddingRight: 10,
    },
});

export default ServiceItem;