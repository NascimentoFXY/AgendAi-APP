import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TouchableOpacityProps, // Para herdar todas as props de TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Certifique-se de ter o @expo/vector-icons instalado
import colors from '../../../configs/theme';

// 1. Definição das Props
interface ProfessionalCardProps extends TouchableOpacityProps { // Estende para aceitar props de TouchableOpacity como onPress
    // Props para o conteúdo do card
    name?: string; // Nome do profissional
    profession?: string; // Profissão do profissional
    rating?: number; // Avaliação numérica (ex: 5.0)

    // Props para estilização
    cardWidth?: number; // Largura do card principal (equivalente a calcCardsWidth)
    imageBackgroundColor?: string; // Cor de fundo da área da imagem (equivalente a colors.primary)
    nameTextStyle?: TextStyle; // Estilo para o texto do nome
    professionTextStyle?: TextStyle; // Estilo para o texto da profissão
    ratingContainerStyle?: ViewStyle; // Estilo para o container da avaliação
    ratingTextStyle?: TextStyle; // Estilo para o texto da avaliação
    starIconColor?: string; // Cor do ícone de estrela
    starIconSize?: number; // Tamanho do ícone de estrela
    containerStyle?: ViewStyle; // Estilo para o View mais externo do card
}

// Valores padrão para as cores e larguras
const DEFAULT_CARD_WIDTH = 150; // Largura padrão se calcCardsWidth não for passado
const DEFAULT_IMAGE_BACKGROUND_COLOR = colors.primary; // Cor de fundo padrão para a imagem (azul claro como exemplo)

// 2. Componente Funcional
const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
    name = 'Nome Padrão',
    profession = 'Profissão Padrão',
    rating = 0.0,
    cardWidth = DEFAULT_CARD_WIDTH, // Usando o padrão
    imageBackgroundColor = DEFAULT_IMAGE_BACKGROUND_COLOR, // Usando o padrão
    nameTextStyle,
    professionTextStyle,
    ratingContainerStyle,
    ratingTextStyle,
    starIconColor = '#FFA000', // Cor padrão para a estrela (laranja)
    starIconSize = 15,
    containerStyle,
    ...touchableOpacityProps // Coleta todas as outras props para passar para TouchableOpacity (ex: onPress)
}) => {
    return (
        <TouchableOpacity {...touchableOpacityProps} activeOpacity={0.9}>
            <View style={[styles.cardOuterContainer, containerStyle]}>
                {/* Área da Imagem/Capa */}
                <View
                    style={[
                        styles.imagePlaceholder,
                        { width: cardWidth, backgroundColor: imageBackgroundColor },
                    ]}
                >
                    {/* Container da Avaliação */}
                    <View style={[styles.ratingContainer, ratingContainerStyle]}>
                        <MaterialIcons
                            name="star"
                            size={starIconSize}
                            color={starIconColor}
                        />
                        <Text style={[styles.ratingText, ratingTextStyle]}>{rating.toFixed(1)}</Text>
                    </View>
                </View>

                {/* Informações do Profissional */}
                <View>
                    <Text style={[styles.nameText, nameTextStyle]}>{name}</Text>
                    <Text style={[styles.professionText, professionTextStyle]}>{profession}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// 3. Estilos
const styles = StyleSheet.create({
    cardOuterContainer: {
        backgroundColor: '#fff', // Cor de fundo do View mais externo
        padding: 10,
        borderRadius: 10,
        elevation: 2, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    imagePlaceholder: {
        height: 180,
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'flex-end', // Alinha o conteúdo (estrela) ao final
        alignItems: 'flex-end', // Alinha o conteúdo (estrela) à direita
    },
    ratingContainer: {
        backgroundColor: '#fff',
        width: 50,
        height: 25,
        borderRadius: 100, // Para fazer um círculo/oval
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute', // Permite posicionar sobre a imagem
        bottom: 10,
        right: 10,
    },
    ratingText: {
        fontSize: 12,
        marginLeft: 2, // Espaçamento entre a estrela e o texto
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    professionText: {
        fontSize: 14,
        color: '#666',
    },
});

export default ProfessionalCard;