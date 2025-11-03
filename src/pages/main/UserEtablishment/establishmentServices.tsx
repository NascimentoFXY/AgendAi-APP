import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
} from "react-native";
import colors, { font } from "configs/theme";
import ServiceItem from "components/Salao/ServicesScreenOptions";
import { Picker } from "@react-native-picker/picker";
import Icon from "configs/icons";
import { useSalonContext } from "context/salonContext";
import { formatCurrency, normalizeSize } from "configs/utils";
import { useAlert } from "context/alertContext";

const { width } = Dimensions.get("window");

export interface ServiceTypeProps {
    id?: any;
    serviceName?: "Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado";
    price?: string;
    quantity?: any;
    types: {
        itemId?: string;
        itemDescription: string;
        itemPrice: string;
        itemDuration?: any;
    }[];
}

export default function EstablishmentServices() {
    const { addServicesToSalon, updateServices, serviceList, fetchServices, deleteService } =
        useSalonContext()!;
    const { showAlert } = useAlert();
    const [selectedService, setSelectedService] = useState<ServiceTypeProps | null>(null);
    const [serviceName, setServiceName] = useState<
        "Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado"
    >();
    const [servicesList, setServicesList] = useState<ServiceTypeProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [infoDisplayVisible, setInfoDisplayVisible] = useState(false);
    const [editingService, setEditingService] = useState<ServiceTypeProps | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [customServiceName, setCustomServiceName] = useState(""); // Novo estado
    const [serviceDuration, setServiceDuration] = useState(""); // Novo estado
    const [services, setServices] = useState([
        { id: Date.now(), itemDescription: "", itemPrice: "", serviceName: serviceName, itemDuration: serviceDuration },
    ]);


    useEffect(() => {
        fetchServices();
    }, []);

    const handleConfirm = async () => {
        if (!serviceName) return;
        const confirmed = await showAlert("Deseja salvar as informações?", "confirm");
        if (!confirmed) return;

        if (serviceName === "Personalizado" && !customServiceName.trim()) {
            alert("Digite o nome do serviço personalizado antes de continuar.");
            return;
        }

        const finalServiceType =
            serviceName === "Personalizado" ? customServiceName.trim() : serviceName;

        const typesArray = services.map((s) => ({
            itemId: String(s.id),
            itemDescription: s.itemDescription,
            itemPrice: s.itemPrice,
            itemDuration: s.itemDuration,
        }));

        // Verifica se já existe um serviço do mesmo tipo
        const existingService = serviceList.find(
            (s) => s.serviceName === serviceName
        );

        if (existingService) {
            // Atualiza o serviço existente em vez de criar um novo
            const updatedData = {
                ...existingService,
                serviceName: finalServiceType,
                types: [...existingService.types, ...typesArray], // adiciona os novos tipos
                quantity: existingService.types.length + typesArray.length,
            };

            await updateServices(updatedData);
            await showAlert("Serviço atualizado com sucesso!", "success")

            setIsEditing(false);
            setEditingService(null);
        } else {
            //  Cria um novo serviço normalmente
            const newService = {
                serviceName: finalServiceType,
                quantity: typesArray.length,
                types: typesArray,
            };

            await showAlert(`O serviço "${finalServiceType}" foi adicionado com sucesso!`);
            await addServicesToSalon(newService);
        }

        // 🔁 Reseta o formulário
        setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceName, itemDuration: "" }]);
        setServiceName(undefined);
        setModalVisible(false);
        setCustomServiceName("");
        // Atualiza a lista do contexto
        await fetchServices();
    };


    const handleChangeDescription = (id: number, newValue: string) => {
        setServices((prev) =>
            prev.map((item) => (item.id === id ? { ...item, itemDescription: newValue } : item))
        );
    };

    const handleChangePrice = (id: number, newValue: string) => {
        const numericValue = newValue.replace(/[^\d,]/g, '').replace(',', '.');

        setServices((prev) =>
            prev.map((item) => (item.id === id ? { ...item, itemPrice: numericValue } : item))
        );
    };
    const handleChangeDuration = (id: number, newValue: string) => {
        const numericValue = newValue.replace(/[^\d,]/g, '').replace(',', '.');

        setServices((prev) =>
            prev.map((item) => (item.id === id ? { ...item, itemDuration: numericValue } : item))
        );
    };

    const handleInfoDisplay = (item: ServiceTypeProps) => {
        setSelectedService(item);
        setInfoDisplayVisible(true);
    };

    const handleCampos = (acao: "add" | "removeOne" | "removeAll", id?: number) => {
        if (acao === "add") {
            setServices((prev) => [
                ...prev,
                { id: Date.now() + Math.random(), itemDescription: "", itemPrice: "", serviceName, itemDuration: "" },
            ]);
            return;
        }

        if (acao === "removeOne" && id !== undefined) {
            setServices((prev) => prev.filter((item) => item.id !== id));
            return;
        }
    };

    const handleDeleteService = async () => {
        if (!editingService) return;
        await deleteService(editingService).then(() => {
            alert("Serviço excluído com sucesso");
        });
        setModalVisible(false);
        setIsEditing(false);
        fetchServices();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Serviços</Text>

                {serviceList.length === 0 && (
                    <Text style={{ fontFamily: font.poppins.medium }}>
                        Você não possui nenhum serviço.
                    </Text>
                )}

                <ScrollView
                    contentContainerStyle={{ paddingVertical: 10, flex: 1, width: "100%", gap: 15 }}
                >
                    {serviceList.map((item) => (
                        <ServiceItem
                            key={item.id}
                            text={item.serviceName}
                            amount={item.quantity}
                            onPress={() => handleInfoDisplay(item)}
                        />
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.addButtonText}>Adicionar Serviços</Text>
                </TouchableOpacity>

                {/* Modal de informações */}
                <Modal
                    visible={infoDisplayVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setInfoDisplayVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>{selectedService?.serviceName}</Text>

                            {selectedService?.types.map((type) => (
                                <View key={type.itemId} style={{ padding: 5, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderRadius: 20, borderColor: colors.lightGray }}>
                                    <Text>{type.itemDescription}</Text>

                                    <Text>{formatCurrency(type.itemPrice)}</Text>
                                </View>
                            ))}

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.addButton, { marginHorizontal: "auto" }]}
                                    onPress={() => {
                                        setInfoDisplayVisible(false);
                                        setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceName, itemDuration: "" }]);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Fechar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.addButton, { marginHorizontal: "auto" }]}
                                    onPress={() => {
                                        setInfoDisplayVisible(false);
                                        setIsEditing(true);
                                        setEditingService(selectedService);

                                        if (selectedService) {
                                            setServiceName(selectedService.serviceName);
                                            setServices(
                                                selectedService.types.map((type) => ({
                                                    id: Number(type.itemId),
                                                    itemDescription: type.itemDescription,
                                                    itemPrice: type.itemPrice,
                                                    serviceName: selectedService.serviceName,
                                                    itemDuration: type.itemDuration,
                                                }))
                                            );
                                        }

                                        setModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Atualizar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Modal principal */}
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            {isEditing && (
                                <TouchableOpacity
                                    onPress={handleDeleteService}
                                    activeOpacity={0.7}
                                    style={{
                                        backgroundColor: colors.primary,
                                        width: 40,
                                        height: 40,
                                        position: "absolute",
                                        borderRadius: 200,
                                        zIndex: 20,
                                        right: 10,
                                        top: 10,
                                    }}
                                >
                                    <Icon.MaterialCommunityIcons
                                        name="delete"
                                        size={20}
                                        color={colors.background}
                                        style={{ margin: "auto" }}
                                    />
                                </TouchableOpacity>
                            )}

                            <Text style={styles.modalTitle}>
                                {isEditing ? "Editar serviço" : "Adicionar serviço"}
                            </Text>

                            <Text>Tipo de serviço:</Text>
                            <Picker
                                style={{ borderWidth: 12, height: "auto" }}
                                selectedValue={serviceName}
                                onValueChange={(itemValue) => setServiceName(itemValue)}
                            >
                                <Picker.Item label="Corte de cabelo" value="Corte de cabelo" />
                                <Picker.Item label="Maquiagem" value="Maquiagem" />
                                <Picker.Item label="Massagem" value="Massagem" />
                                <Picker.Item label="Manicure" value="Massagem" />
                                <Picker.Item label="Personalizado" value="Personalizado" />
                            </Picker>
                            {serviceName === "Personalizado" && (
                                <View style={{ marginTop: 10, marginBottom: 15 }}>
                                    <Text style={{ marginBottom: 5 }}>
                                        Nome do serviço personalizado:
                                    </Text>
                                    <TextInput
                                        value={customServiceName}
                                        onChangeText={setCustomServiceName}
                                        placeholder="Ex: Design de sobrancelha"
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "#ccc",
                                            borderRadius: 8,
                                            padding: 10,
                                        }}
                                    />
                                </View>
                            )}
                            {/* Campos dinâmicos */}
                            {services.map((item) => (

                                <View
                                    key={item.id}
                                    style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
                                >
                                    <View style={styles.form}>
                                        <TextInput
                                            value={item.itemDescription}
                                            style={[styles.input]}
                                            placeholder="Descrição do tipo"
                                            onChangeText={(text) => handleChangeDescription(item.id, text)}
                                        />
                                        <View style={{flexDirection: "row"}}>
                                            <TextInput
                                                keyboardType="numeric"
                                                value={item.itemPrice}
                                                placeholder="Preço R$"
                                                style={[styles.input, {width: "50%"}]}
                                                onChangeText={(text) => handleChangePrice(item.id, text)}
                                            />
                                            <TextInput
                                                keyboardType="numeric"
                                                value={item.itemDuration}
                                                placeholder="duração (minutos)"
                                                style={[styles.input, {width: "50%"}]}
                                                onChangeText={(text) => handleChangeDuration(item.id, text)}
                                            />
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => handleCampos("removeOne", item.id)}
                                        style={{
                                            width: 26,
                                            height: 26,
                                            backgroundColor: colors.primary,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Icon.Ionicons name="remove" color={colors.white} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={() => handleCampos("add")}
                                style={{
                                    marginTop: 5,
                                    width: 28,
                                    height: 28,
                                    backgroundColor: colors.primary,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 4,
                                }}
                            >
                                <Icon.Ionicons name="add" color={colors.white} />
                            </TouchableOpacity>

                            {/* Ações */}
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#ccc" }]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        setIsEditing(false);
                                        setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceName, itemDuration: "" }]);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: colors.primary }]}
                                    onPress={handleConfirm}
                                >
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
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
    form: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: colors.transparentLightGray,
   
        borderRadius: 20,
        paddingVertical: 8,
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingBottom: 120,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: font.poppins.medium,
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: font.poppins.bold,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        flexGrow: 1
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#fff",
        fontFamily: font.poppins.medium,
        textAlign: "center",
    },
});
