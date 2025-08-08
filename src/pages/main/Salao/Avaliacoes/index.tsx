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

import colors from '../../../../configs/colors';
import {RatingComments} from '../../../../components/Salao/RatingScreenComps';

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
                <SafeAreaView style={{ backgroundColor: colors.background }}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Avaliações</Text>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="edit" size={18} color={colorSet.color.primary} />
                            <Text style={{ color: colorSet.color.primary, marginLeft: 5, fontSize: 16 }}>Avaliar</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Search Section */}
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colorSet.lightGray,
                        borderRadius: 50,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderColor: colorSet.gray,
                        borderWidth: 1,
                    }}>
                        <Ionicons name="search-outline" size={20} color={colorSet.darkGray} />
                        <TextInput
                            placeholder="Procurar por avaliações"
                            placeholderTextColor={colorSet.darkGray}
                            style={{ marginLeft: 10, fontSize: 16, flex: 1 }}
                        />
                    </View>
                </View>


            </View>
            {/* Filter Section */}
            <ScrollView horizontal
                style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, zIndex: 2,}}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colorSet.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    marginRight: 10,
                }}>
                    <Feather name="filter" size={18} color={colorSet.darkGray} />
                    <Text style={{ marginLeft: 5, color: colorSet.text }}>Filtro</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: colorSet.color.primary,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    marginRight: 10,
                }}>
                    <Text style={{ color: colors.background, fontWeight: 'bold' }}>Recentes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: colorSet.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    marginRight: 10,
                }}>
                    <Text style={{ color: colorSet.text }}>Antigos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: colorSet.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                }}>
                    <Text style={{ color: colorSet.text }}>Com fotos</Text>
                </TouchableOpacity>
            </ScrollView>

            <RatingComments
                name="Quandale Dingle"
                followers="33 Seguidores"
                rating="5.0"
                time="8 horas atrás"
                comment="Fui aí cortar meu cabelo, super recomendo o lugar. Me atenderam muito bem, apesar de eu ser careca."
            />
            <RatingComments
                name="Amanda B. Silva"
                followers="15 Seguidores"
                rating="5.0"
                time="10 horas atrás"
                comment="Excelente serviço! Adorei o corte e a cor do meu cabelo. O atendimento foi impecável."
            />
            <RatingComments
                name="João Dias"
                followers="50 Seguidores"
                rating="5.0"
                time="1 dia atrás"
                comment="Amei o corte!"
            />
            <RatingComments
                name="Maria Souza"
                followers="78 Seguidores"
                rating="4.5"
                time="1 semana atrás"
                comment="Muito bom o atendimento, mas o agendamento demorou um pouco."
            />
            <RatingComments
                name="Roberto Santos"
                followers="23 Seguidores"
                rating="5.0"
                time="2 semanas atrás"
                comment="Melhor barbearia da região!"
            />
            <RatingComments
                name="Ana Clara"
                followers="5 Seguidores"
                rating="5.0"
                time="3 semanas atrás"
                comment="Fui muito bem atendida. Ótimo custo benefício."
            />
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
});