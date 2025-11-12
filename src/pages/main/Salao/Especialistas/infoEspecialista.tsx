import CustomButton from 'components/customButton';
import Icon from 'configs/icons';
import colors, { font } from 'configs/theme';
import { formatCurrency, normalizeSize } from 'configs/utils';
import { useAuthContext } from 'context/auth';
import { PromoProps, Services, useSalonContext } from 'context/salonContext';
import { useNavigation } from '@react-navigation/native'
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
    Dimensions
} from 'react-native';
import { addDoc, collection, doc, getDocs, updateDoc } from '@firebase/firestore';
import { db } from 'services/firebase';
import { useAlert } from 'context/alertContext';
const { width } = Dimensions.get("window");
interface InfoCardProps {
    nomeServico: string;
    intervalo: string;
    preco: string;
    descricao: string;
    duracao?: string;
    navigation: any;
    specialist: any;
    id: any;
    promoList: PromoProps[],
    index: any
}







const Cards = (props: InfoCardProps) => {
    function onPress() {
        props.navigation.navigate("Scheduling", {
            specialist: props.specialist, // vindo do contexto
            service: {
                itemName: props.nomeServico,
                itemDescription: props.descricao,
                itemPrice: props.preco,
                itemDuration: props.duracao,
                itemId: props.id,
            } as Services["types"][0]
        });
    }

    const isInPromo = props.promoList.some((promo) => promo.aplicableTo == "all" || promo.service == props.nomeServico)
    console.log(props.nomeServico, "[isInPromo?]", isInPromo)
    console.log("card Index", props.index)
    const calcPromo = (price: any) => {
        try {
            if (!isInPromo) return formatCurrency(price);

            // Converter para número (caso venha como string)
            let finalPrice = parseFloat(price);

            // Filtrar todas as promoções aplicáveis a este serviço
            const applicablePromos = props.promoList.filter(
                (promo) => promo.aplicableTo === "all" || promo.service === props.nomeServico
            );

            // Aplicar cada promoção em sequência
            applicablePromos.forEach((promo) => {
                const promoValue = parseFloat(promo.valor);
                const isPercent = promo.tipoValor === "porcentagem";

                if (isPercent) {
                    finalPrice -= finalPrice * (promoValue / 100);
                } else {
                    finalPrice -= promoValue;
                }

                // Evitar preço negativo
                if (finalPrice < 0) finalPrice = 0;
            });

            return formatCurrency(finalPrice);

        } catch (error) {
            console.error("Erro ao calcular promoção:", error);
            return formatCurrency(price);
        }
    };


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
                {isInPromo ? (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={[styles.cardPriceOld]}>
                            {formatCurrency(props.preco)}
                        </Text>
                        <Text style={[styles.cardPriceNew]}>
                            {calcPromo(props.preco)}
                        </Text>
                    </View>
                ) : (
                    <Text style={[styles.cardPrice]}>
                        {formatCurrency(props.preco)}
                    </Text>
                )}

                <TouchableOpacity style={styles.cardBtn} onPress={onPress}>
                    <Text style={{ color: colors.white, fontFamily: font.poppins.regular }}>Agendar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default function InfoEspecialista({ navigation }: any) {
    const { salon, isOwner, specialist, fetchCupons, promoList } = useSalonContext()!;
    const [selectedRating, setSelectedRating] = useState<number>(5);
    const [comment, setComment] = useState("");
    const [isAlreadyRated, setAlreadyRated] = useState(false);
    const { user } = useAuthContext()!;
    const [loading, setLoading] = useState(false);
    const showAlert = useAlert().showAlert

    const addRatingToSpecialist = async (specialistId: string, selectedRating: number, salonId: string) => {
        try {
            const ratingsRef = collection(db, "salon", salonId, "specialists", specialistId, "ratings");
            const specialistRef = doc(db, "salon", salonId, "specialists", specialistId);

            // Adiciona nova avaliação
            await addDoc(ratingsRef, {
                value: selectedRating,
                comment: comment,
                createdAt: new Date()
            });

            // Busca todas as avaliações para recalcular a média
            const snapshot = await getDocs(ratingsRef);
            const ratings = snapshot.docs.map(doc => doc.data().value);

            const average =
                ratings.length > 0
                    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                    : selectedRating;

            // Atualiza a média no documento do especialista
            await updateDoc(specialistRef, { ratingAverage: Number(average.toFixed(1)) });
            setAlreadyRated(true)
            showAlert("Avaliação enviada!", "success")
            console.log(`✅ Avaliação registrada (${selectedRating}) e média atualizada: ${average.toFixed(1)}`);
        } catch (error) {
            console.error("Erro ao adicionar avaliação ao especialista:", error);
        }
    };


    console.log("promo", promoList)
    if (loading) return;
    return !loading && (
        <SafeAreaView style={styles.container}>
            {/* Banner */}
            <View style={{ backgroundColor: colors.lightGray }}>

                <View style={{ width: width, aspectRatio: 16 / 9, backgroundColor: colors.debug, padding: 20, alignItems: "center", flexDirection: "row", }}>
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
                    <Image style={styles.specialistPhoto} source={{ uri: specialist?.image || undefined }}></Image>
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>{specialist?.name}</Text>
                    <Text style={{ fontSize: 16, color: colors.darkGray }}>{specialist?.profession}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <Icon.AntDesign name="star" size={24} color={colors.primary} />
                        <Text style={{ fontFamily: font.poppins.semibold, fontSize: 24 }}>{parseFloat(specialist?.ratingAverage || 5 as any).toFixed(1)}</Text>

                    </View>

                    {!isAlreadyRated && 
                    <View style={{ alignItems: "center", padding: 20, width: "80%" }}>
                        <Text>Avaliar profissional</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>

                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setSelectedRating(star)}>
                                    <Icon.FontAwesome
                                        name={star <= selectedRating ? "star" : "star-o"}
                                        size={28}
                                        color={colors.primary}
                                        style={{ marginHorizontal: 2 }}
                                    />
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => addRatingToSpecialist(specialist?.id!, selectedRating, salon?.id!)}
                            >
                                <Text>Enviar</Text><Icon.FontAwesome name='send' />
                            </TouchableOpacity>
                        </View>
                        <View style={{width: "100%", backgroundColor: colors.debug}}>
                            <TextInput placeholder='Comentário (opcional)' onChangeText={setComment} style={{flexGrow:1,backgroundColor: colors.white, padding: 10 }} />
                        </View>
                    </View>}
                </View>



                <ScrollView>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", padding: 20, }}>
                        <Text style={styles.sectionTitle}>Lista de Serviços</Text>
                        <Text style={styles.itemAmount}>({specialist?.services.length})</Text>
                    </View>
                    {specialist?.services.map((item, index) => (
                        <Cards
                            key={item.itemId}
                            id={item.itemId}
                            nomeServico={item.itemName}
                            intervalo={item.itemDuration + " Minutos" || ""}
                            preco={item.itemPrice}
                            descricao={item.itemDescription || ""}
                            duracao={item.itemDuration}
                            navigation={navigation}
                            specialist={specialist}
                            promoList={promoList}
                            index={index}
                        />

                    ))}
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
    },
    cardPriceOld: {
        fontFamily: font.poppins.medium,
        color: colors.lightGray,
        textDecorationLine: 'line-through',
        fontSize: 14,
    },

    cardPriceNew: {
        fontFamily: font.poppins.bold,
        color: colors.primary,
        fontSize: 16,
    },

});