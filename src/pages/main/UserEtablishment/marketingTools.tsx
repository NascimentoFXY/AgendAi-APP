import colors, { font } from 'configs/theme';
import { formatDate, normalizeSize } from 'configs/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Modal,
    TextInput,
    Image,
    ViewStyle
} from 'react-native';
import { Clipboard } from 'react-native';

import { Services, useSalonContext } from "context/salonContext";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { db } from 'services/firebase';
import pickImage from 'configs/pickImage';
import { useAlert } from 'context/alertContext';
import CustomButton from 'components/customButton';
import Icon from 'configs/icons';
import { LinearGradient } from 'expo-linear-gradient';
import TabBarButton from 'components/TabBar';

const { width } = Dimensions.get("window");
interface SelectedService {
    type: "all" | "selected";
    types: Services["types"][0] | null;
}
// Componente de cartão de cupom
export const CupomCard: React.FC<{ cupom?: any, onPress?: () => void }> = ({ cupom, onPress }) => {
    const { showAlert } = useAlert()!
    const copyCode = (codigo: string) => {
        Clipboard.setString(codigo);
        showAlert("Código " + codigo + " foi copiado.", "success")
    };
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress} onLongPress={() => copyCode(cupom.codigo)}>
            <Text style={styles.cardTitle}>{cupom?.nome || "Cupom de desconto sem nome"}</Text>
            <Text style={{ fontFamily: font.poppins.semibold, color: colors.primary }}>
                {cupom.tipoValor != "porcentagem" ? "R$" : null}{cupom?.valor}{cupom.tipoValor === "porcentagem" ? "%" : ""}
            </Text>
            <Text style={{ fontFamily: font.poppins.regular, color: colors.lightGray }}>
                Código: {cupom.codigo}
            </Text>
            <View>
                <Text style={{ fontFamily: font.poppins.regular, color: colors.lightGray, fontSize: normalizeSize(12) }}>
                    Valido até {cupom?.dataFim || "indefinido"}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function MarketingTools({ saving }: any) {
    const { salon, serviceList, SalonRef } = useSalonContext()!;
    const { showAlert } = useAlert()!
    // Estados
    const [cupons, setCupons] = useState<any[]>([]);
    const [promo, setPromo] = useState<any[]>([]);
    const [selectedCupom, setSelectedCupom] = useState<any | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingType, setEditingType] = useState<"cupom" | "promo" | null>(null);
    const [codeType, setCodeType] = useState<"random" | "personalized">("random")
    const [code, setCode] = useState("")
    const [photoList, setPhotoList] = useState<any[] | null>()
    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSecModalVisible, setIsSecModalVisible] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipoValor, setTipoValor] = useState<"fixo" | "porcentagem">("fixo");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [selectedService, setSelectedService] = useState<SelectedService>()
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [bannerWidth, setBannerWidth] = useState(0);

    const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
    const center: ViewStyle = {
        justifyContent: "center",
        alignItems: "center",
    };

    const scrollRef = useRef<ScrollView>(null);
    useEffect(() => {
        if (!photoList || photoList.length === 0) return;

        // limpa intervalos antigos
        if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);

        autoScrollInterval.current = setInterval(() => {
            setCurrentIndex((prev) => {
                const nextIndex = (prev + 1) % (photoList.length + 1); // +1 inclui o banner principal
                scrollRef.current?.scrollTo({
                    x: nextIndex * bannerWidth,
                    animated: true,
                });
                return nextIndex;
            });
        }, 4000);

        return () => {
            if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
        };
    }, [photoList]);


    useEffect(() => {
        fetch();
    }, [salon]);

    async function fetch() {
        setPhotoList(salon?.promoBannerImages)

    }


    const maxPromo = promo.reduce((max, current) => {
        if (!max) return current;
        const currentValue = Number(current.valor);
        const maxValue = Number(max.valor);
        return currentValue > maxValue ? current : max;
    }, null);

    //Salva tudo

    const Saving = async () => {
        if (!salon?.id) return
        try {
            const ref = SalonRef() as any;
            let data = {
                promoBannerImages: photoList || [],
                maxPromo: maxPromo || ""

            }
            await updateDoc(ref, data)
        } catch (er) {
            console.error(er)
        }

    }
    if (saving) {
        Saving();
    }
    // Criar cupom
    const createCupom = async () => {
        if (!salon?.id) return;
        const cupomRef = editingId
            ? doc(db, "salon", salon.id, "cupons", editingId)
            : doc(collection(db, "salon", salon.id, "cupons"));
        const parsedCode = codeType === "personalized" ? code : Math.random().toString(36).substring(2, 8).toUpperCase();
        const cupomData = {
            id: cupomRef.id,
            salonID: salon.id,
            nome,
            descricao,
            valor: parseFloat(valor),
            tipoValor,
            dataInicio,
            dataFim,
            codigo: editingId ? selectedCupom?.codigo : parsedCode,
        };

        try {
            if (isEditing) {
                await updateDoc(cupomRef, cupomData);
                setCupons(prev => prev.map(c => (c.id === editingId ? cupomData : c)));
            } else {
                await setDoc(cupomRef, cupomData);
                setCupons(prev => [...prev, cupomData]);
            }

            // Limpar tudo
            setNome("");
            setDescricao("");
            setValor("");
            setDataInicio("");
            setDataFim("");
            setTipoValor("fixo");
            setIsModalVisible(false);
            setIsEditing(false);
            setEditingId(null);
            setEditingType(null);
        } catch (err) {
            console.error("Erro ao salvar/editar cupom:", err);
        }
    };

    const createPromotion = async () => {
        if (!salon?.id) return;

        const promoRef = editingId
            ? doc(db, "salon", salon.id, "promo", editingId)
            : doc(collection(db, "salon", salon.id, "promo"));

        const promoData = {
            id: promoRef.id,
            salonID: salon.id,
            valor: parseFloat(valor),
            tipoValor,
            dataInicio,
            dataFim,
            aplicableTo: selectedService?.type,
            service: selectedService?.types?.itemName || "none",
            types: selectedService?.types || null,
        };
        

        try {
            if (isEditing) {
                await updateDoc(promoRef, promoData);
                setPromo(prev => prev.map(p => (p.id === editingId ? promoData : p)));
            } else {
                await setDoc(promoRef, promoData);
                setPromo(prev => [...prev, promoData]);
            }

            // Limpar tudo
            setValor("");
            setDataInicio("");
            setDataFim("");
            setTipoValor("fixo");
            setSelectedService({ type: "all", types: null });
            setIsDropdownVisible(false);
            setIsSecModalVisible(false);
            setIsEditing(false);
            setEditingId(null);
            setEditingType(null);
        } catch (err) {
            console.error("Erro ao salvar/editar promoção:", err);
        }
    };


    const handleCupomPress = (cupom: any) => {
        setSelectedCupom(cupom);
        editCupom(cupom)
    };
    const handlePickConteudoVisual = async (aspect1: number, aspect2: number) => {
        const result = await pickImage(aspect1, aspect2);
        if (result) setPhotoList(prev => [...prev || [], result]);
    };
    const handleFetchCuponsAndPromo = useCallback(async () => {
        if (!salon?.id) return;

        try {
            const cupomQ = query(collection(db, "salon", salon.id, "cupons"), orderBy("nome", "asc"));
            const promoQ = query(collection(db, "salon", salon.id, "promo"), orderBy("dataFim", "asc"));

            // 🔹 Executa as duas consultas em paralelo
            const [cupomSnap, promoSnap] = await Promise.all([
                getDocs(cupomQ),
                getDocs(promoQ)
            ]);

            // 🔹 Mapeia resultados em uma função auxiliar
            const mapDocs = (snap: any) =>
                snap.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data()
                }));

            // 🔹 Atualiza os estados de forma eficiente
            setCupons(mapDocs(cupomSnap));
            setPromo(mapDocs(promoSnap));

        } catch (error) {
            console.error("Erro ao buscar cupons e promoções:", error);
        }
    }, [salon?.id]);

    // Editar cupom
    const editCupom = (cupom: any) => {
        setIsEditing(true);
        setEditingId(cupom.id);
        setEditingType("cupom");

        setNome(cupom.nome);
        setDescricao(cupom.descricao);
        setValor(cupom.valor.toString());
        setTipoValor(cupom.tipoValor);
        setDataInicio(cupom.dataInicio);
        setDataFim(cupom.dataFim);

        setIsModalVisible(true);
    };

    const editPromo = (promo: any) => {
        setIsEditing(true);
        setEditingId(promo.id);
        setEditingType("promo");

        setValor(promo.valor.toString());
        setTipoValor(promo.tipoValor);
        setDataInicio(promo.dataInicio);
        setDataFim(promo.dataFim);
        setSelectedService({
            type: promo.aplicableTo,
            types: promo.types,
        });

        setIsSecModalVisible(true);
    };


    // Excluir cupom
    const deleteCupom = async (cupom: any) => {
        if (!salon?.id) return;
        try {
            const confirmed = await showAlert("Deseja realmente excluir este item?\n(Esta ação não poderá ser desfeita.)", "confirm");
            if (!confirmed) return;
            setIsModalVisible(false);
            setCupons(prev => prev.filter(c => c.id !== cupom.id));
            const docRef = doc(db, "salon", salon.id, "cupons", cupom.id)
            await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        }
    };
    const deletePromo = async (promo: any) => {
        if (!salon?.id) return;


        try {
            const confirmed = await showAlert("Deseja realmente excluir este item?\n(Esta ação não poderá ser desfeita.)", "confirm");
            if (!confirmed) return;
            const docRef = doc(db, "salon", salon.id, "promo", promo.id)
            await deleteDoc(docRef);
            setPromo(prev => prev.filter(p => p.id !== promo.id));
        } catch (err) {
            console.error(err);
        }
    };

    // Copiar código


    useEffect(() => {
        handleFetchCuponsAndPromo()
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
                                <Text style={{ fontFamily: font.poppins.medium }}>{cupons.length + promo.length} campanhas ativas</Text>
                            </View>
                        </View>

                        {/* Cupons */}
                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Cupons de desconto</Text>

                            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                <Text style={styles.button}>Criar Cupom</Text>
                            </TouchableOpacity>

                            <ScrollView contentContainerStyle={{ gap: 5 }} style={{ height: 150 }} nestedScrollEnabled>
                                {cupons.map(c => (
                                    <CupomCard key={c.id} cupom={c} onPress={() => handleCupomPress(c)} />
                                ))}
                            </ScrollView>
                        </View>

                        {/* Conteúdo visual */}
                        <View style={[styles.painelItem, { width: "100%" }]}>
                            <Text style={styles.sectionTitle}>Conteudo Visual</Text>
                            <Text style={[styles.sectionTitle, { fontSize: 12 }]}>(visivel no Banner publicitário)</Text>

                            <View style={[styles.row, { flexWrap: "wrap", flexGrow: 1 }]}>
                                <View style={{ width: "45%" }}>
                                    <TouchableOpacity style={{
                                        width: "100%",
                                        height: normalizeSize(60),
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: colors.transparentLightGray,
                                        ...center,
                                    }}
                                        onPress={() => handlePickConteudoVisual(16, 9)}>
                                        <Icon.Ionicons name='add-outline' size={50} color={colors.transparentLightGray} />
                                    </TouchableOpacity>

                                </View>
                                {photoList?.map((photo, index) => {
                                    return (
                                        <View key={index} style={{ width: "45%" }}>
                                            <TouchableOpacity
                                                style={[{
                                                    zIndex: 1,
                                                    position: "absolute",
                                                    right: -10, top: -10,
                                                    borderWidth: 1,
                                                    borderRadius: 20,
                                                    width: 30,
                                                    height: 30,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    borderColor: "red"
                                                }]}
                                                onPress={() => {
                                                    setPhotoList(prev => prev?.filter((_, i) => i != index))
                                                }}
                                            >
                                                <Icon.Ionicons name='trash' color={"red"} size={24} />
                                            </TouchableOpacity>
                                            <Image source={{ uri: photo || undefined }} style={{ width: "100%", height: normalizeSize(60), backgroundColor: colors.lightGray, borderRadius: 8 }} />
                                        </View>
                                    )
                                })
                                }

                            </View>
                        </View>
                    </View>
                    {/* =====================================Parte2========================================== */}
                    <View style={styles.SidePainel2}>
                        {/* ===========================Banner=================== */}
                        <View style={styles.painelItem}>
                            <View style={{ backgroundColor: "#bab7b77f", padding: 15, borderRadius: 5, gap: 10 }}>
                                <Text style={styles.sectionTitle}>Banner Promocional (pré-visualização)</Text>

                                <ScrollView ref={scrollRef} onLayout={(e) => setBannerWidth(e.nativeEvent.layout.width)}
                                    scrollEnabled
                                    nestedScrollEnabled
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    style={{ aspectRatio: 16 / 9, backgroundColor: colors.transparentLightGray, borderRadius: 5, }}>
                                    <View
                                        style={{ aspectRatio: 16 / 9 }}>

                                        {maxPromo ? (
                                            <View style={{
                                                position: "absolute",
                                                zIndex: 1,
                                                paddingHorizontal: 10,
                                                paddingVertical: 15,
                                            }}>
                                                <Text style={{
                                                    fontFamily: font.poppins.bold,
                                                    fontSize: normalizeSize(14),
                                                    color: "white",
                                                    textAlign: "left",
                                                    borderRadius: 8,
                                                    lineHeight: 10
                                                }}>
                                                    Descontos de até
                                                </Text>
                                                <Text style={{
                                                    fontSize: normalizeSize(24),
                                                    fontFamily: font.poppins.bold,
                                                    color: colors.primary,
                                                    textAlign: "left",

                                                }}>{maxPromo.tipoValor === "porcentagem"
                                                    ? `${maxPromo.valor}%`
                                                    : `R$ ${maxPromo.valor}`}
                                                </Text>
                                            </View>

                                        ) : (
                                            <Text style={{
                                                fontFamily: font.poppins.regular,
                                                fontSize: normalizeSize(16),
                                                color: colors.lightGray
                                            }}>
                                                Nenhuma promoção ativa no momento
                                            </Text>
                                        )}
                                        <Image source={{ uri: salon?.image || undefined }} style={{ aspectRatio: 16 / 9 }} />
                                        <LinearGradient
                                            colors={['rgba(255, 255, 255, 0)', '#00000075']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 0, y: 1 }}
                                            style={styles.linearGradient}
                                        />

                                    </View>

                                    {photoList?.map((item, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: item }}
                                            style={{

                                                aspectRatio: 16 / 9,

                                            }}
                                            resizeMode="stretch"
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                        </View>

                        {/* Promoções */}

                        <View style={styles.painelItem}>
                            <Text style={styles.sectionTitle}>Promoções e ofertas temporárias</Text>

                            <View style={{ flexDirection: "column" }}>
                                <TouchableOpacity onPress={() => setIsSecModalVisible(true)}>
                                    <Text style={styles.button}>Criar Promoção</Text>
                                </TouchableOpacity>

                            </View>

                            <ScrollView contentContainerStyle={{ gap: 5 }} nestedScrollEnabled>

                                {promo.map(p => (
                                    <View key={p.id} style={styles.cupomCard}>
                                        <View style={{ flexGrow: 1, }}>
                                            <Text style={{ fontFamily: font.poppins.bold }}>{p.service !== "none" ? p.service : "Todos os Serviços"}</Text>

                                            <Text>{p.tipoValor === "porcentagem" ? `${p.valor}%` : `R$ ${p.valor}`}</Text>
                                            <Text>Validade: {p.dataInicio} - {p.dataFim}</Text>

                                        </View>

                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                            <TouchableOpacity style={styles.actionButton} onPress={() => editPromo(p)}>
                                                <Text>Editar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.actionButton} onPress={() => deletePromo(p)}>
                                                <Text>Excluir</Text>
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
                        {isEditing ? <View style={[styles.row, { gap: 0 }]}>
                            <View style={{ width: 30, height: 30 }} />
                            <Text style={styles.modalTitle}>Editar Cupom</Text>
                            <CustomButton
                                width={30}
                                height={30}
                                border='Circle'
                                Icon={<Icon.Ionicons name='trash' color={"red"} size={24} />}
                                style={{ backgroundColor: "transparent", borderWidth: 1, borderColor: "red" }}
                                onPress={() => deleteCupom(selectedCupom)}
                            />
                        </View> :
                            <Text style={styles.modalTitle}>Novo Cupom</Text>
                        }


                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
                        </View>

                        <View style={styles.inputWrapper}>
                            {tipoValor === "fixo" && <Text style={{ paddingHorizontal: 10 }}>R$</Text>}


                            <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" value={valor} onChangeText={setValor} />
                            {tipoValor === "porcentagem" && <Text style={{ paddingHorizontal: 10 }}>%</Text>}
                        </View>

                        {/* Tipo de valor */}
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.optionButton, tipoValor === "fixo" && styles.optionButtonSelected]}
                                onPress={() => setTipoValor("fixo")}
                            >
                                <Text>Fixo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, tipoValor === "porcentagem" && styles.optionButtonSelected]}
                                onPress={() => setTipoValor("porcentagem")}
                            >
                                <Text>% Porcentagem</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={{ paddingHorizontal: 10 }}>Data inicial:</Text>
                            <TextInput style={styles.input} placeholder="Data inicial (ex: 25/10)" keyboardType='numeric' value={dataInicio || ""} onChangeText={(text) => setDataInicio(formatDate(text))} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={{ paddingHorizontal: 10 }}>Data final:</Text>
                            <TextInput style={styles.input} placeholder="Data final (ex: 30/10)" keyboardType='numeric' maxLength={5} value={dataFim} onChangeText={(text) => setDataFim(formatDate(text))} />
                        </View>

                        {/* Codigo */}
                        <Text>Código: </Text>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.optionButton, codeType === "random" && styles.optionButtonSelected]}
                                onPress={() => setCodeType("random")}
                            >
                                <Text>Aleatório</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, codeType === "personalized" && styles.optionButtonSelected]}
                                onPress={() => setCodeType("personalized")}
                            >
                                <Text>Personalizado</Text>
                            </TouchableOpacity>
                        </View>
                        {codeType === "personalized" && <View style={styles.inputWrapper}>
                            <Text style={{ paddingHorizontal: 10 }}>Código Personalizado:</Text>
                            <TextInput style={styles.input} placeholder="XXXXXX" maxLength={10} value={code.toLocaleUpperCase()} onChangeText={setCode} />
                        </View>}

                        {/* ações */}
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => setIsModalVisible(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: colors.primary }]} onPress={createCupom}>
                                <Text style={{ color: "#fff" }}>{isEditing ? "Salvar Alterações" : "Salvar"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Modal de criação de Promoção */}
            <Modal visible={isSecModalVisible} animationType="slide" transparent>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{isEditing ? "Editar promoção" : "Nova promoção"}</Text>


                        <View style={styles.inputWrapper}>
                            {tipoValor === "fixo" && <Text style={{ paddingHorizontal: 10 }}>R$</Text>}
                            <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" value={valor} onChangeText={setValor} />
                            {tipoValor === "porcentagem" && <Text style={{ paddingHorizontal: 10 }}>%</Text>}
                        </View>

                        {/* Tipo de valor */}
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.optionButton, tipoValor === "fixo" && styles.optionButtonSelected]}
                                onPress={() => setTipoValor("fixo")}
                            >
                                <Text>Fixo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, tipoValor === "porcentagem" && styles.optionButtonSelected]}
                                onPress={() => setTipoValor("porcentagem")}
                            >
                                <Text>% Porcentagem</Text>
                            </TouchableOpacity>
                        </View>
                        {/* aplicavel para */}

                        <Text style={{ paddingHorizontal: 10 }}>Aplicável para:</Text>
                        <View >
                            <TouchableOpacity
                                style={[styles.optionButton, { justifyContent: 'space-between' }]}
                                onPress={() => setIsDropdownVisible(!isDropdownVisible)}
                            >
                                <View style={styles.row}>

                                    <Text>{selectedService?.type === 'all' ? 'Todos os serviços' : selectedService?.types?.itemName || 'Selecione um serviço'}</Text>
                                    <Text>{isDropdownVisible ? '▲' : '▼'}</Text>
                                </View>

                            </TouchableOpacity>
                            {isDropdownVisible && (
                                <ScrollView nestedScrollEnabled>
                                    <TouchableOpacity
                                        style={[styles.optionButton, selectedService?.type === 'all' && styles.optionButtonSelected]}
                                        onPress={() => {
                                            setSelectedService({ type: "all", types: null });
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        <Text>Todos os serviços</Text>
                                    </TouchableOpacity>
                                    {serviceList.map((service) => (
                                        service.types.map((type, index) => (
                                            <TouchableOpacity
                                                key={type.itemId!}
                                                style={[
                                                    styles.optionButton,
                                                    selectedService?.type == "selected" && selectedService?.types?.itemId === type.itemId ? styles.optionButtonSelected : null
                                                ]}
                                                onPress={() => {
                                                    setSelectedService({

                                                        type: "selected",
                                                        types: { ...type }
                                                    });
                                                }}
                                            >
                                                <Text>{type.itemName}</Text>
                                            </TouchableOpacity>
                                        ))
                                    ))}

                                </ScrollView>
                            )}

                        </View>

                        {/* data */}
                        <View style={styles.inputWrapper}>
                            <Text style={{ paddingHorizontal: 10 }}>Data inicial:</Text>
                            <TextInput style={styles.input} placeholder="Data inicial (ex: 25/10)" value={dataInicio} onChangeText={setDataInicio} />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={{ paddingHorizontal: 10 }}>Data final:</Text>
                            <TextInput style={styles.input} placeholder="Data final (ex: 30/10)" value={dataFim} onChangeText={setDataFim} />
                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => setIsSecModalVisible(false)}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: colors.primary }]} onPress={createPromotion}>
                                <Text style={{ color: "#fff" }}>{isEditing ? "Salvar Alterações" : "Salvar"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <TabBarButton type='button' title='Salvar' onPress={Saving} />
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
    button: { justifyContent: "center", alignItems: "center", padding: 5, borderWidth: 1, borderRadius: 5, flex: 1, borderColor: colors.transparentLightGray, textAlign: "center", fontFamily: font.poppins.semibold, marginBottom: 4 },

    // Modal
    modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '85%', backgroundColor: '#fff', borderRadius: 12, padding: 20, gap: 10 },
    modalTitle: { fontFamily: font.poppins.bold, fontSize: 18, marginBottom: 10, textAlign: 'center' },
    inputWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 5, flexDirection: "row", alignItems: "center" },
    input: { padding: 10, flex: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
    optionButton: { flexGrow: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6, alignItems: 'center' },
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
    },
    linearGradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,

    }

});
