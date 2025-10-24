import colors, { font } from 'configs/theme';
import { normalizeFont } from 'configs/utils';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Modal,
    TextInput
} from 'react-native';
import { Clipboard } from 'react-native';

import { useSalonContext } from "context/salonContext";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from 'services/firebase';
import pickImage from 'configs/pickImage';
import { useAlert } from 'context/alertContext';

const { width } = Dimensions.get("window");

// Componente de cartão de cupom
export const CupomCard: React.FC<{ cupom?: any, onPress?: () => void }> = ({ cupom, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <Text style={styles.cardTitle}>{cupom?.descricao || "Cupom de desconto"}</Text>
            <Text style={{ fontSize: normalizeFont(12) }}>{cupom?.duracao || "Cortes masculinos"}</Text>
            <Text style={{ fontFamily: font.poppins.regular, color: colors.primary }}>
                {cupom.tipoValor != "porcentagem" ? "R$" : ""} {cupom?.valor || 20}{cupom.tipoValor === "porcentagem" ? "%" : ""}
            </Text>
            <View>
                <Text style={{ fontFamily: font.poppins.regular, color: colors.lightGray, fontSize: normalizeFont(12) }}>
                    Valido até {cupom?.duracao || "30/10"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function MarketingTools() {
    const { salon } = useSalonContext()!;
    const { showAlert } = useAlert()!
    // Estados
    const [cupons, setCupons] = useState<any[]>([]);
    const [selectedCupom, setSelectedCupom] = useState<any | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [conteudoVisualImage, setConteudoVisualImage] = useState<string | null>(null);

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipoValor, setTipoValor] = useState<"fixo" | "porcentagem">("fixo");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [isEditing, setIsEditing] = useState(false)
    // Criar cupom
    const createCupom = async () => {
        if (!salon?.id) return;

        const cupomRef = doc(collection(db, "salon", salon.id, "cupons"));

        const cupomData = {
            id: cupomRef.id,
            salonID: salon.id,
            nome,
            descricao,
            valor: parseFloat(valor),
            tipoValor,
            dataInicio,
            dataFim,
            codigo: Math.random().toString(36).substring(2, 8).toUpperCase(),
        };
        await setDoc(cupomRef, cupomData);
        setCupons(prev => [...prev, cupomData]);

        // Limpar campos
        setNome("");
        setDescricao("");
        setValor("");
        setDataInicio("");
        setDataFim("");
        setTipoValor("fixo");
        setIsModalVisible(false);
    };

    const handleCupomPress = (cupom: any) => {
        setSelectedCupom(cupom);
        console.log("Cupom selecionado:", cupom);
    };

    const handlePickBannerImage = async () => {
        const result = await pickImage(1, 1);
        if (result) setBannerImage(result);
    };

    const handlePickConteudoVisual = async (aspect1: number, aspect2: number) => {
        const result = await pickImage(aspect1, aspect2);
        if (result) setConteudoVisualImage(result);
    };
    const handleFetchCupons = async () => {

        const cupomRef = collection(db, "salon", salon?.id!, "cupons");
        const q = query(cupomRef, orderBy("nome", "asc"))
        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setCupons([])
                return
            };
            const cupons = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setCupons(cupons)
        } catch (er) {
            console.error(er)
        }
    }
    // Editar cupom
    const editCupom = (cupom: any) => {

        setNome(cupom.nome);
        setDescricao(cupom.descricao);
        setValor(cupom.valor.toString());
        setTipoValor(cupom.tipoValor);
        setDataInicio(cupom.dataInicio);
        setDataFim(cupom.dataFim);
        setIsModalVisible(true);

    };

    // Excluir cupom
    const deleteCupom = async (cupom: any) => {
        if (!salon?.id) return;


        try {
            const confirmed = await showAlert("Deseja realmente excluir este cupom?", "confirm");
            if (!confirmed) return;
            const docRef = doc(db, "salon", salon.id, "cupons", cupom.id)
            await deleteDoc(docRef);
            setCupons(prev => prev.filter(c => c.id !== cupom.id));
        } catch (err) {
            console.error(err);
        }
    };

    // Copiar código
    const copyCode = (codigo: string) => {
        Clipboard.setString(codigo);
        showAlert("Código " + codigo + " foi copiado.", "confirm")
    };

    useEffect(() => {
        handleFetchCupons()
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Ferramentas de Marketing</Text>

                <View style={styles.painel}>
                    <View style={styles.SidePainel1}>
                        {/* Resumo */}
                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Resumo</Text>
                            <View style={{ padding: 12, backgroundColor: colors.transparentLightGray, borderRadius: 12 }}>
                                <Text style={{ fontFamily: font.poppins.medium }}>{cupons.length} campanhas ativas</Text>
                            </View>
                        </View>

                        {/* Cupons */}
                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Cupons e desconto</Text>
                            <ScrollView contentContainerStyle={{ gap: 5 }} style={{ height: 150 }} nestedScrollEnabled>
                                {cupons.map(c => (
                                    <CupomCard key={c.id} cupom={c} onPress={() => handleCupomPress(c)} />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Conteúdo visual */}
                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Conteudo Visual</Text>
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity style={{ width: "100%", height: normalizeFont(60), backgroundColor: colors.lightGray, borderRadius: 8 }}
                                        onPress={() => handlePickConteudoVisual(4, 3)}
                                    />
                                    <Text style={{ textAlign: "center" }}>Antes e depois</Text>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity style={{ width: "100%", height: normalizeFont(60), backgroundColor: colors.lightGray, borderRadius: 8 }}
                                        onPress={() => handlePickConteudoVisual(16, 9)}
                                    />
                                    <Text style={{ textAlign: "center" }}>Videos</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.SidePainel2}>
                        {/* Banner */}
                        <View style={styles.painelItem}>
                            <View style={{ backgroundColor: "#bab7b77f", padding: 20, borderRadius: 5, gap: 10 }}>
                                <Text style={styles.sectionTitle}>Banner Promocional</Text>
                                <TouchableOpacity style={{ padding: 10, backgroundColor: colors.transparentLightGray, borderRadius: 10, height: 80, justifyContent: "center" }}
                                    onPress={handlePickBannerImage}
                                >
                                    <Text style={{ fontFamily: font.poppins.bold, fontSize: 25 }}>
                                        {bannerImage ? "Imagem selecionada" : "20%"}
                                    </Text>
                                    <Text style={{ fontFamily: font.poppins.bold, fontSize: 20 }}>off</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Promoções */}

                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Promoções e ofertas temporárias</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                <Text style={[styles.button, { alignSelf: "flex-end", marginBottom: 4 }]}>Criar Cupom</Text>
                            </TouchableOpacity>

                            <ScrollView style={{ maxHeight: 200, }} contentContainerStyle={{ gap: 5 }} nestedScrollEnabled>
                                {cupons.map(c => (
                                    <View key={c.id} style={styles.cupomCard}>
                                        <View style={{ flexGrow: 1, }}>
                                            <Text style={{ fontFamily: font.poppins.bold }}>{c.nome}</Text>
                                            <Text>{c.descricao}</Text>
                                            <Text>{c.tipoValor === "porcentagem" ? `${c.valor}%` : `R$ ${c.valor}`}</Text>
                                            <Text>Validade: {c.dataInicio} - {c.dataFim}</Text>
                                            <Text>Código: {c.codigo}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                            <TouchableOpacity style={styles.actionButton} onPress={() => editCupom(c)}>
                                                <Text>Editar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.actionButton} onPress={() => deleteCupom(c)}>
                                                <Text>Excluir</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.actionButton} onPress={() => copyCode(c.codigo)}>
                                                <Text>Copiar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>

                    </View>
                </View>
            </View>

            {/* Modal de criação de cupom */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Novo Cupom</Text>

                        <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
                        <TextInput placeholder="Descrição" style={styles.input} value={descricao} onChangeText={setDescricao} />
                        <TextInput placeholder="Valor" style={styles.input} keyboardType="numeric" value={valor} onChangeText={setValor} />

                        {/* Tipo de valor */}
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.optionButton, tipoValor === "fixo" && styles.optionButtonSelected]}
                                onPress={() => setTipoValor("fixo")}
                            >
                                <Text>R$ Fixo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, tipoValor === "porcentagem" && styles.optionButtonSelected]}
                                onPress={() => setTipoValor("porcentagem")}
                            >
                                <Text>% Porcentagem</Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput placeholder="Data inicial (ex: 25/10)" style={styles.input} value={dataInicio} onChangeText={setDataInicio} />
                        <TextInput placeholder="Data final (ex: 30/10)" style={styles.input} value={dataFim} onChangeText={setDataFim} />

                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => setIsModalVisible(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: colors.primary }]} onPress={createCupom}>
                                <Text style={{ color: "#fff" }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { width, backgroundColor: colors.background, marginVertical: 2, flex: 1 },
    content: { justifyContent: "center", alignItems: "center", padding: 20, paddingBottom: 120 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    painel: { width, flexDirection: "row", paddingVertical: 20 },
    SidePainel1: { flex: 4 },
    SidePainel2: { flex: 5 },
    painelItem: { padding: 13, borderRadius: 20 },
    cardContainer: { borderRadius: 12, borderWidth: 1, borderColor: colors.transparentLightGray, paddingHorizontal: 15, paddingVertical: 4, justifyContent: "center" },
    cardTitle: { fontFamily: font.poppins.medium, width: "100%" },
    sectionTitle: { fontFamily: font.poppins.bold },
    button: { padding: 5, borderWidth: 1, borderRadius: 5, borderColor: colors.transparentLightGray, justifyContent: "center", alignItems: "center" },

    // Modal
    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 20, gap: 10 },
    modalTitle: { fontFamily: font.poppins.bold, fontSize: 18, marginBottom: 10, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 5 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    optionButton: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, alignItems: 'center' },
    optionButtonSelected: { backgroundColor: colors.transparentLightGray },

    cupomCard: {

        justifyContent: 'space-between',
        padding: 8,
        borderWidth: 1,
        borderColor: colors.transparentLightGray,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    actionButton: {
        padding: 6,
        outlineWidth: 1,
        outlineColor: colors.transparentLightGray,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
