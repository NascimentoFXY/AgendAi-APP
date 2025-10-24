import colors, { font } from 'configs/theme';
import { normalizeFont } from 'configs/utils';
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
const { width } = Dimensions.get("window")

export const CupomCard: React.FC = () => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>
                Cupom de desconto
            </Text>
            <Text style={{ fontSize: normalizeFont(12) }}>Cortes masculinos</Text>
            <Text style={{ fontFamily: font.poppins.regular, color: colors.primary }}>
                R$ 20
            </Text>
            <View>
                <Text style={{ fontFamily: font.poppins.regular, color: colors.lightGray, fontSize: normalizeFont(12) }}>Valido até 30/10</Text>
            </View>

        </View>
    )
}
export default function MarketingTools() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Ferramentas de Marketing</Text>

                <View style={styles.painel}>
                    <View style={styles.SidePainel1}>

                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Resumo</Text>
                            <View style={{ padding: 12, backgroundColor: colors.transparentLightGray, borderRadius: 12 }}>
                                <Text style={{ fontFamily: font.poppins.medium }}>5 campanhas ativas</Text>
                            </View>
                        </View>

                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Cupons e desconto</Text>
                            <ScrollView contentContainerStyle={{ gap: 5 }} style={{ height: 150 }} nestedScrollEnabled>
                                <CupomCard/>
                                <CupomCard/>
                                <CupomCard/>
                            </ScrollView>
                        </View>
                        <View style={styles.painelItem}>

                            <Text style={styles.sectionTitle}>Conteudo Visual (?)</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>

                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity style={{ width: "100%", height: normalizeFont(60), backgroundColor: colors.debug, borderRadius: 8 }}>

                                    </TouchableOpacity>
                                    <Text style={{ textAlign: "center" }}>Antes e depois</Text>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity style={{ width: "100%", height: normalizeFont(60), backgroundColor: colors.debug, borderRadius: 8 }}>

                                    </TouchableOpacity>
                                    <Text style={{ textAlign: "center" }}>Videos</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={styles.SidePainel2}>

                        <View style={styles.painelItem}>
                            <View style={{ backgroundColor: "#bab7b77f", padding: 20, borderRadius: 5, gap: 10 }}>
                                <Text style={styles.sectionTitle}>Banner Promocional</Text>
                                <View style={{ padding: 10, backgroundColor: colors.transparentLightGray, borderRadius: 10, height: 80, justifyContent: "center", }}>
                                    <View>
                                        <Text style={{ fontFamily: font.poppins.bold, fontSize: 25 }}>20%</Text>
                                        <Text style={{ fontFamily: font.poppins.bold, fontSize: 20 }}>off</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ padding: 6, backgroundColor: "#fff", borderRadius: 6, borderWidth: 1, borderColor: colors.transparentLightGray }}>
                                    <Text style={{ textAlign: "center", }}>Editar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}> Promoções e ofertas temporárias</Text>
                            <TouchableOpacity>
                                <Text style={[styles.button, { alignSelf: "flex-end", marginBottom: 4, }]}>
                                    Criar Cupom
                                </Text>
                            </TouchableOpacity>
                            <View style={{ gap: 5 }}>
                                <View style={styles.cardContainer}>
                                    <Text style={styles.cardTitle}>Sexta da manicure</Text>
                                    <Text>01/06 - 12/06</Text>
                                    <Text>Manicure</Text>
                                </View>
                                <View style={styles.cardContainer}>
                                    <Text style={styles.cardTitle}>Sexta da manicure</Text>
                                    <Text>01/06 - 12/06</Text>
                                    <Text>Manicure</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: colors.background,
        marginVertical: 2,
        flex: 1,
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingBottom: 120,
        // backgroundColor: colors.debug
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    painel: {
        width: width,
        flexDirection: "row",
        paddingVertical: 20,
    },
    SidePainel1: {
        flex: 4,

    },
    SidePainel2: {
        flex: 5,
    },
    painelItem: {
        padding: 13,
        borderRadius: 20,
    },
    cardContainer: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.transparentLightGray,
        paddingHorizontal: 15,
        paddingVertical: 4,
        justifyContent: "center",

    },
    cardTitle: {
        fontFamily: font.poppins.medium,
        width: "100%"
    },
    sectionTitle: {
        fontFamily: font.poppins.bold
    },
    button: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.transparentLightGray,
        justifyContent: "center",
        alignItems: "center",
    }
});
