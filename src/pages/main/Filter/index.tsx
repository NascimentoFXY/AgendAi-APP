import React, { useState } from 'react';
import {
    Dimensions,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../../components/customButton';
import { styles } from './style';
import colors from '../../../configs/theme';
import TabBarButton from '../../../components/TabBar';
import Checkbox from '../../../components/checkbox/checkbox';

const width = Dimensions.get("window").width;

// === COMPONENTE DE OPÇÃO DE FILTRO ===
const FilterOptions = ({ optionTitle, optionColor, onPress, style }: any) => (
    <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[{
            backgroundColor: optionColor === 'primary' ? colors.primary : colors.background,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            borderRadius: 20,
            borderColor: colors.transparentLightGray,
            borderWidth: optionColor === "primary" ? 0 : 1,
        }, style]}
    >
        <Text style={{
            color: optionColor === 'primary' ? colors.textSecondary : colors.subTitle
        }}>
            {optionTitle}
        </Text>
    </TouchableOpacity>
);

// === ESTRELAS (AVALIAÇÃO) ===
const Stars = ({ rating = 0, color = colors.primary }: { rating: number, color?: string }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 5 }}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons
                    key={i}
                    name="star"
                    size={20}
                    color={i <= rating ? color : colors.lightGray}
                />
            ))}
        </View>
    );
};


export default function Filters({ navigation }: any) {
    // Estados de filtro
    const [selectedGenero, setSelectedGenero] = useState<'todos' | 'masculino' | 'feminino'>('todos');
    const [selectedServico, setSelectedServico] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    // Simples mock dos serviços
    const servicos = ['Cortes', 'Maquiagem', 'Barbearia', 'Massagem'];

    // === Lógica de aplicar filtros ===
    const handleFiltrar = () => {
        const filters = {
            genero: selectedGenero,
            servico: selectedServico,
            rating: selectedRating,
        };
        console.log(filters)

        // Envia os filtros como parâmetro
        navigation.navigate("Catalogo", { filters });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={"#fff"} />}
                    border='Circle'
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5" }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Filtros</Text>
            </View>

            {/* Gênero */}
            <View style={{ flexDirection: 'row', height: 50, marginVertical: 20, justifyContent: "space-around" }}>
                <FilterOptions
                    optionTitle='Todos'
                    optionColor={selectedGenero === 'todos' ? 'primary' : undefined}
                    onPress={() => setSelectedGenero('todos')}
                    style={{ width: 80 }}
                />
                <FilterOptions
                    optionTitle='Masculino'
                    optionColor={selectedGenero === 'masculino' ? 'primary' : undefined}
                    onPress={() => setSelectedGenero('masculino')}
                    style={{ width: 120 }}
                />
                <FilterOptions
                    optionTitle='Feminino'
                    optionColor={selectedGenero === 'feminino' ? 'primary' : undefined}
                    onPress={() => setSelectedGenero('feminino')}
                    style={{ width: 120 }}
                />
            </View>

            {/* Serviços */}
            <View>
                <Text style={styles.label2}>SERVIÇOS</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 60, width }}
                    contentContainerStyle={{ paddingHorizontal: 20, flexDirection: 'row', gap: 20 }}
                >
                    {servicos.map((serv) => (
                        <FilterOptions
                            key={serv}
                            optionTitle={serv}
                            optionColor={selectedServico === serv ? 'primary' : undefined}
                            onPress={() => setSelectedServico(serv)}
                            style={{ width: 100 }}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Avaliações */}
            <View>
                <Text style={styles.label2}>AVALIAÇÕES</Text>
                <View style={{ gap: 25, padding: 20 }}>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <View key={rating} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Stars rating={rating} />
                            {rating < 5 && <Text>({rating.toFixed(1)}) ou acima</Text>}
                            {rating == 5 && <Text>({rating.toFixed(1)})</Text>}
                            <Checkbox
                                checked={selectedRating === rating}
                                onChange={() => setSelectedRating(rating === selectedRating ? null : rating)}
                            />
                        </View>
                    ))}
                </View>
            </View>

            {/* Botão de filtrar */}
            <View style={{ position: "absolute", bottom: 0, left: 0, width: "100%", flex: 1, zIndex: 1 }}>

                <TabBarButton title='Filtrar' onPress={handleFiltrar} />
            </View>
        </View>
    );
}
