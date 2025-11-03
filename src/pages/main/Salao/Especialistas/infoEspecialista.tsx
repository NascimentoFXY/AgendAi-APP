import CustomButton from 'components/customButton';
import Icon from 'configs/icons';
import colors, { font } from 'configs/theme';
import { normalizeSize } from 'configs/utils';
import { useAuthContext } from 'context/auth';
import { useSalonContext } from 'context/salonContext';
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
const { width } = Dimensions.get("window");
interface InfoCardProps {
    nomeServico: string;
    intervalo: string;
    preco: string;
    descricao: string;
}
const Cards = (props: InfoCardProps) => {
    function onPress() {
        //lógica de agendamento
    }
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{props.nomeServico}</Text>
                <View style={styles.cardInterval}>
                    <Icon.MaterialCommunityIcons name="clock-time-three" size={18} color={colors.lightYellow} />
                    <Text>{props.intervalo}</Text>
                </View>
            </View>

            <Text style={styles.cardDesc}>{props.descricao}</Text>

            <View style={styles.cardActionsSection}>
                <Text style={styles.cardPrice}>{props.preco}</Text>
                <TouchableOpacity style={styles.cardBtn} onPress={onPress}>
                    <Text>Agendar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default function InfoEspecialista({ navigation }: any) {
    const { salon, isOwner } = useSalonContext()!;
    const { user } = useAuthContext()!;
    return (
        <SafeAreaView style={styles.container}>
            {/* Banner */}
            <View style={{backgroundColor: colors.lightGray }}>

                <View style={{width: width, aspectRatio: 16/9, backgroundColor: colors.debug, padding: 20, alignItems: "center", flexDirection: "row",  }}>
                    <CustomButton
                        Icon={<Icon.Ionicons name="arrow-back" size={24} color="white" />}
                        border='Circle'
                        width={50}
                        height={50}
                        style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                        onPress={() => (navigation.goBack())}
                    />
                </View>
                <Image source={{ uri: salon?.image }} style={{ aspectRatio: 16 / 9, width: width, position: "absolute" }}></Image>
            
            </View>
            {/* ------ */}

            <View style={styles.modalContainer}>
                <View style={styles.specialistInfoContainer}>
                    <Image style={styles.specialistPhoto}></Image>
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>Nome do Especialista</Text>
                    <Text style={{ fontSize: 16, color: colors.darkGray }}>Profissão do Especialista</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <Icon.AntDesign name="star" size={16} color={colors.primary} />
                        <Text>5.0</Text>
                        <Text style={{ fontSize: 16, color: colors.darkGray, marginLeft: 20 }}>(Avaliação) </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", padding: 20, }}>
                        <Text style={styles.sectionTitle}>Lista de Serviços</Text>
                        <Text style={styles.itemAmount}>(quantidade)</Text>
                    </View>

                    <Cards nomeServico="Corte de Cabelo" intervalo="30 min" preco="R$ 50,00" descricao="Corte de cabelo masculino ou feminino, com estilo personalizado." />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        marginTop: -30,
        backgroundColor: colors.background,

    },
    specialistInfoContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        paddingBottom: 20,
        marginBottom: 20,
        borderRadius: 20,

    },
    specialistPhoto: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: colors.darkGray,
        borderWidth: 12,
        borderColor: colors.background,
        marginTop: -50,
    },
    //Section Titles
    sectionTitle: {
        fontSize: normalizeSize(20),
        fontFamily: font.poppins.bold,
    },
    itemAmount: {
        fontSize: normalizeSize(16),
        color: colors.primary,
        fontFamily: font.poppins.bold,
    },
    //Cards Styles
    card: {
        padding: 15,
        elevation: 2,
        backgroundColor: colors.background,
        borderRadius: 10,
        margin: 10
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardName: {
        fontSize: normalizeSize(18),
        fontFamily: font.poppins.semibold,

    },
    cardDesc: {
        fontSize: normalizeSize(14),
        color: colors.darkGray,
        marginVertical: 10,
        fontFamily: font.poppins.regular,
    },
    cardBtn: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    cardActionsSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardPrice: {
        fontSize: normalizeSize(16),
        fontFamily: font.poppins.semibold,
        color: colors.primary,
    },
    cardInterval: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    }
});