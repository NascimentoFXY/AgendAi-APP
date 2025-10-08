import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,

} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getUserNameById } from '../../../services/firebase'; // Importe sua função de busca
import Icon from 'configs/icons';
// import colors from '../../../configs/colors';
const getInitials = (fullName: string): string => {
    // Se não houver nome, retorna uma string vazia para evitar erros
    if (!fullName) {
        return '';
    }
    //ex: Joao Silva -> "JS"
    const names = fullName.split(' ');

    // Pega a primeira letra da primeira palavra
    // Ex: "João" -> "J"
    let initials = names[0][0] || '';

    // Se houver mais de uma palavra no nome (ex: nome e sobrenome)...
    if (names.length > 1) {
        // ...pega a primeira letra da última palavra (o sobrenome)
        // Ex: "Silva" -> "S"
        initials += names[names.length - 1][0] || '';
    }

    // Converte as iniciais para maiúsculas e retorna
    // Ex: "JS"
    return initials.toUpperCase();
};
const colors = {
    background: '#fff',
    color: {
        primary: '#E0777B',
    },
    gray: '#ccc',
    lightGray: '#f0f0f0',
    darkGray: '#888',
    text: '#333',
};

const { width } = Dimensions.get("window")

export const RatingComments = ({ id, followers, rating, time, comment, image }: any) => {
    const [name, setName] = useState<string>("Usuário Desconhecido");
    useEffect(() => {
        const fetchName = async () => {
            if (id) {
                const fetchedName = await getUserNameById(id);
                setName(fetchedName || "Usuário Desconhecido");
            }
        };
        fetchName();
    }, [id]);
    const initials = getInitials(name);
    const initialsSafe = initials && initials.trim() !== '' ? initials : 'U';
    // Componente para um único item de avaliação
    return (
        <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>

                {/* ImagePlaceholder */}
                <View style={{
                    width: 45, height: 45, marginRight: 10, marginVertical: 5, borderRadius: 25,
                    backgroundColor: '#E0777B', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{initialsSafe}</Text>
                </View>

                <View style={styles.reviewInfo}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text }}>{name}</Text>
                    <Text style={{ color: colors.darkGray }}>{followers}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="star" size={16} color={colors.color.primary} />
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 5, color: colors.text }}>{rating + ".0"}</Text>
                </View>
                <Text style={{ color: colors.darkGray, marginLeft: 10 }}>{time}</Text>
            </View>
           {comment && <Text style={styles.reviewText}>{comment}</Text>}
            <View style={{ flexDirection: 'row' }}>
                <Icon.AntDesign name="star" size={18} color={
                    rating >= 1 ?
                        colors.color.primary
                        : colors.lightGray
                } />
                <Icon.AntDesign name="star" size={18} color={
                    rating >= 2 ?
                        colors.color.primary
                        : colors.lightGray
                } />
                <Icon.AntDesign name="star" size={18} color={
                    rating >= 3 ?
                        colors.color.primary
                        : colors.lightGray
                } />
                <Icon.AntDesign name="star" size={18} color={
                    rating >= 4 ?
                        colors.color.primary
                        : colors.lightGray
                } />
                <Icon.AntDesign name="star" size={18} color={
                    rating === 5 ?
                        colors.color.primary
                        : colors.lightGray
                } />

            </View>
            {image && (
                <Image
                    style={{ width: 100, height: 100, borderRadius: 10, marginTop: 10 }}
                    source={{ uri: image }} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        width: width
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderColor: colors.gray,
        borderWidth: 1,
    },
    filterContainer: {
        paddingVertical: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    activeFilterButton: {
        backgroundColor: colors.color.primary,
    },
    filterButtonText: {
        color: colors.text,
    },
    activeFilterButtonText: {
        color: colors.background,
        fontWeight: 'bold',
    },
    reviewItem: {
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        resizeMode: "cover",
    },
    reviewInfo: {
        flex: 1,
    },
    reviewText: {
        color: colors.text,
        marginBottom: 10,
    },
});