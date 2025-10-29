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
import { useNavigation } from '@react-navigation/native'
import colors, { font } from '../../../../configs/theme';
import { RatingComments } from '../../../../components/Salao/RatingScreenComps';
import { SalonContext } from 'context/salonContext';
import { normalizeFont } from 'configs/utils';

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
export default function Rating() {
    const navigation = useNavigation<any>()

    const { ratings, setRatingFilter, ratingFilter } = React.useContext(SalonContext)!
    return (
        <ScrollView
            overScrollMode='never'
            stickyHeaderIndices={[1]}
            style={[
                styles.container, {
                    backgroundColor: colors.background

                }]}>

            <View>

                {/* Header Section */}
                <View style={{ backgroundColor: colors.background }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Avaliações</Text>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate("AddRating")}>
                            <Feather name="edit" size={18} color={colorSet.color.primary} />
                            <Text style={{ color: colorSet.color.primary, marginLeft: 5, fontSize: 16 }}>Avaliar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Section */}
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                   <Text
                   style={{ fontSize: 16, fontFamily: font.poppins.medium, marginBottom: 10 }}>
                    Filtrar por:
                   </Text>
                </View>


            </View>
            {/* Filter Section */}
            <ScrollView
                horizontal
                nestedScrollEnabled={true}
                style={{ flexDirection: 'row', paddingLeft: 20, marginBottom: 20 }}>



                <TouchableOpacity style={{
                    backgroundColor: ratingFilter === "desc" ? colorSet.color.primary : colorSet.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    marginRight: 10,
                }}
                    onPress={() => { setRatingFilter && setRatingFilter("desc"); console.log("[avaliações][avaliações]filtro recentes") }}>

                    <Text style={{ color: ratingFilter === "desc" ? colors.white : colorSet.text, fontWeight: ratingFilter === "desc" ? 'bold' : "normal" }}>Recentes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: ratingFilter === "asc" ? colorSet.color.primary : colorSet.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    marginRight: 10,}}
                    onPress={() => { setRatingFilter && setRatingFilter("asc"); console.log("[avaliações]filtro antigos") }}>

                    <Text style={{ color: ratingFilter === "asc" ? colors.white : colorSet.text, fontWeight: ratingFilter === "asc" ? 'bold' : "normal" }}>Antigos</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: ratingFilter === "withPhotos" ? colorSet.color.primary : colorSet.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,}}
                    onPress={() => { setRatingFilter && setRatingFilter("withPhotos"); console.log("[avaliações]filtro com fotos") }}>
                    <Text style={{color: ratingFilter === "withPhotos" ? colors.white : colorSet.text, fontWeight: ratingFilter === "withPhotos" ? 'bold' : "normal"}}>Com fotos</Text>
                </TouchableOpacity>
            </ScrollView>

            {/*------------------ Ratings List Section ----------------------------*/}
            {ratings.length === 0 && (
                <View style={{ alignItems: 'center', marginTop: 25, marginBottom: 50, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, color: colorSet.darkGray, textAlign: 'center' }}>
                        Nenhuma avaliação encontrada. Seja o primeiro a avaliar este salão!
                    </Text>
                </View>
            )}
            {ratings.map((rating) => (
              
                <RatingComments
                    id={rating.sender!.id}
                    key={rating.id}
                    name={rating.sender!.name}
                    rating={rating.value}
                    time={new Date(rating.createdAt?.seconds * 1000).toLocaleDateString()}
                    comment={rating?.comment || ""}
                    image={rating?.image || null}
                    userPhoto={rating.sender!.image}
                />))}

        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        width: width
    },
    title: {
        fontSize: normalizeFont(20),
        color: '#000',
        fontFamily: font.poppins.bold
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});