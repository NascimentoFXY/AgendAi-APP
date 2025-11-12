import MainHeader from 'components/homeScreenComponents/header';
import Icon from 'configs/icons';
import { useAuthContext } from 'context/auth';
import { useSalonContext } from 'context/salonContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { styles } from 'pages/main/home/style';
import colors, { font } from 'configs/theme';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { normalizeSize } from 'configs/utils';


type Filtro = {
    filters?: {
        genero?: string;
        servico?: string;
        rating?: number;
    };
};

export const TopSaloesCardsData = ({ rating, name, salonId, image, description, address, item, navigation }: any) => {
    const { loadSalon } = useSalonContext()!
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={{ flexDirection: 'row', gap: 10, margin: 10, paddingVertical: 10 }}
            onPress={async () => (navigation.navigate("Salao"), await loadSalon(salonId))}>
            <View>
                <View style={[styles.SaloesCards, { height: 120, aspectRatio: 16 / 9, borderRadius: 10, }]}>
                    <Image source={{ uri: image }} style={{ resizeMode: "cover", position: "absolute", width: "100%", height: "100%" }} />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: font.poppins.bold, fontSize: normalizeSize(18) }} numberOfLines={2}>{name}</Text>
                <Text style={{ fontFamily: font.poppins.regular, flexWrap: "wrap", flex: 1 }} lineBreakMode='tail' numberOfLines={2}>{description}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: "auto", alignItems: "center" }}>

                    <Text style={{ fontFamily: font.poppins.regular, marginRight: "auto", fontSize: 10, }}>{address.split(",")[2]}</Text>
                    {rating && <Text style={{ fontFamily: font.poppins.regular, marginLeft: "auto" }}>{rating}
                        <Icon.AntDesign name='star' color={colors.primary} />
                    </Text>}
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default function Catalogo({ filtro }: { filtro?: string }) {
    const route = useRoute<RouteProp<Record<string, Filtro>, string>>();
    const { filters } = route.params || {}; // <-- Recebe filtros da navegação

    // console.log("filtros recebidos", filters)
    const { user } = useAuthContext()!
    const { salon, salonCList, fetchSalons, loadSalon } = useSalonContext()!


    const [averageRatings, setAverageRatings] = useState<{ [salonId: string]: number }>({});
    const [loading, setLoading] = useState(false);

    const saloesFiltrados = salonCList?.filter((salon) => {
        // Se não houver filtro nem filtros, retorna todos
        if (!filtro && !filters) return true;

        // Normaliza o texto de pesquisa
        const texto = filtro?.toLowerCase().trim() || "";

        // Condição de busca textual
        const matchTexto =
            !texto ||
            salon.name?.toLowerCase().includes(texto) ||
            salon.addres?.toLowerCase().includes(texto) ||
            salon.description?.toLowerCase().includes(texto) ||
            salon.services?.some(
                (serv) =>
                    serv.serviceName?.toLowerCase().includes(texto) ||
                    serv.types?.some(
                        (type) =>
                            type.itemName?.toLowerCase().includes((texto || filters?.servico!)) ||
                            type.itemDescription?.toLowerCase().includes((texto || filters?.genero!))
                    )
            );

        // Condição de filtro por avaliação (se existir)
        const matchRating =
            !filters?.rating || Number(salon.rating || 0) >= Number(filters.rating);

        // Retorna o salão apenas se atender ambas condições
        return matchTexto && matchRating;
    });


    const navigation = useNavigation<any>()


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    {!filtro && <Text style={{ fontFamily: font.abrilfatface, fontSize: 20, textAlign: "center", padding: 20 }}>
                        Encontre
                        novos
                        lugares
                    </Text>}
                    {filtro && <Text style={{ fontFamily: font.abrilfatface, fontSize: 20, textAlign: "center", padding: 20 }}>
                        Resultados para: "{filtro}"
                    </Text>}
                    <TouchableOpacity onPress={() => { navigation.navigate("Explore") }}>
                        <Text style={{ textAlign: "center", color: colors.primary }}>
                            <Icon.Ionicons name="location-sharp"></Icon.Ionicons>
                            Abrir no mapa
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {!loading && saloesFiltrados?.length! > 0 ? saloesFiltrados?.map((key) => (
                        <TopSaloesCardsData key={key.id} name={key.name} rating={key.rating.toFixed(1) || 0.0}
                            salonId={key.id}
                            image={key.image}
                            description={key.description}
                            address={key.addres}
                            item={key}
                            navigation={navigation}
                        />
                    ))

                        : (
                            <View>
                                <Text style={{ margin: "auto", fontFamily: font.poppins.semibold, fontSize: 18, width: "50%", textAlign: "center", color: colors.lightGray }}>Nenhum estabelecimento encontrado.</Text>
                            </View>
                        )
                    }

                    {loading && <ActivityIndicator size={70} style={{ width: Dimensions.get("window").width, alignItems: "center" }} color={colors.primary} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

