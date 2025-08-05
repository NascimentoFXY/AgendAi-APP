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
    StyleSheet
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';

// import colors from '../../../configs/colors';

const colorSet = {
    color: {
        primary: '#E0777B', // Placeholder for the pink color
    },
    gray: '#ccc',
    lightGray: '#f0f0f0',
    darkGray: '#888',
    text: '#333',
};

const { width } = Dimensions.get("window")
export const RatingComments = ({ profile, name, followers, rating, time, comment }: any) => {
    // Componente para um único item de avaliação
    return (
        <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
                <Image
                    source={{ uri: profile }}
                    style={styles.profileImage}
                />
                <View style={styles.reviewInfo}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text }}>{name}</Text>
                    <Text style={{ color: colors.darkGray }}>{followers}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome5 name="star" size={16} color={colors.color.primary} />
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 5, color: colors.text }}>{rating}</Text>
                </View>
                <Text style={{ color: colors.darkGray, marginLeft: 10 }}>{time}</Text>
            </View>
            <Text style={styles.reviewText}>{comment}</Text>
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome5 name="star" size={18} color={colors.color.primary} />
                <FontAwesome5 name="star" size={18} color={colors.color.primary} />
                <FontAwesome5 name="star" size={18} color={colors.color.primary} />
                <FontAwesome5 name="star" size={18} color={colors.color.primary} />
                <FontAwesome5 name="star" size={18} color={colors.color.primary} />
            </View>
        </View>
    );
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
    },
    reviewInfo: {
        flex: 1,
    },
    reviewText: {
        color: colors.text,
        marginBottom: 10,
    },
});