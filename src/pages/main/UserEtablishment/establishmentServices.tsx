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
import { normalizeFont } from "configs/utils";

const { width } = Dimensions.get("window");

interface ServiceTypeProps {
    id?: any;
    serviceType?: "Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado";
    price?: string;
    quantity?: any;
    types: {
        itemId?: string;
        itemDescription: string;
        itemPrice: string;
    }[];
}

export default function EstablishmentServices() {
    const { addServicesToSalon, updateServices, serviceList, fetchServices, deleteService } =
        useSalonContext()!;

    const [selectedService, setSelectedService] = useState<ServiceTypeProps | null>(null);
    const [serviceType, setServiceType] = useState<
        "Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado"
    >();
    const [services, setServices] = useState([
        { id: Date.now(), itemDescription: "", itemPrice: "", serviceType: serviceType },
    ]);
    const [servicesList, setServicesList] = useState<ServiceTypeProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [infoDisplayVisible, setInfoDisplayVisible] = useState(false);
    const [editingService, setEditingService] = useState<ServiceTypeProps | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const handleConfirm = async () => {
    if (!serviceType) return;

    const typesArray = services.map((s) => ({
        itemId: String(s.id),
        itemDescription: s.itemDescription,
        itemPrice: s.itemPrice,
    }));

    // Verifica se já existe um serviço do mesmo tipo
    const existingService = serviceList.find(
        (s) => s.serviceType === serviceType
    );

    if (existingService) {
        // 🔄 Atualiza o serviço existente em vez de criar um novo
        const updatedData = {
            ...existingService,
            serviceType,
            types: [...existingService.types, ...typesArray], // adiciona os novos tipos
            quantity: existingService.types.length + typesArray.length,
        };

        await updateServices(updatedData);
        alert(`O serviço "${serviceType}" foi atualizado com sucesso!`);

        setIsEditing(false);
        setEditingService(null);
    } else {
        // ➕ Cria um novo serviço normalmente
        const newService = {
            serviceType,
            quantity: typesArray.length,
            types: typesArray,
        };

        await addServicesToSalon(newService);
        alert(`O serviço "${serviceType}" foi adicionado com sucesso!`);
    }

    // 🔁 Reseta o formulário
    setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceType }]);
    setServiceType(undefined);
    setModalVisible(false);

    // Atualiza a lista do contexto
    fetchServices();
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

    const handleInfoDisplay = (item: ServiceTypeProps) => {
        setSelectedService(item);
        setInfoDisplayVisible(true);
    };

    const handleCampos = (acao: "add" | "removeOne" | "removeAll", id?: number) => {
        if (acao === "add") {
            setServices((prev) => [
                ...prev,
                { id: Date.now() + Math.random(), itemDescription: "", itemPrice: "", serviceType },
            ]);
            return;
        }

        if (acao === "removeOne" && id !== undefined) {
            setServices((prev) => prev.filter((item) => item.id !== id));
            return;
        }

        if (acao === "removeAll") {
            setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceType }]);
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
                            text={item.serviceType}
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
                            <Text style={styles.modalTitle}>{selectedService?.serviceType}</Text>

                            {selectedService?.types.map((type) => (
                                <View key={type.itemId} style={{ padding: 5, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderRadius: 20, borderColor: colors.lightGray }}>
                                    <Text>{type.itemDescription}</Text>

                                    <Text>R$ {type.itemPrice}</Text>
                                </View>
                            ))}

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.addButton, { marginHorizontal: "auto" }]}
                                    onPress={() => {
                                        setInfoDisplayVisible(false);
                                        setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceType }]);
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
                                            setServiceType(selectedService.serviceType);
                                            setServices(
                                                selectedService.types.map((type) => ({
                                                    id: Number(type.itemId),
                                                    itemDescription: type.itemDescription,
                                                    itemPrice: type.itemPrice,
                                                    serviceType: selectedService.serviceType,
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
                                selectedValue={serviceType}
                                onValueChange={(itemValue) => setServiceType(itemValue)}
                            >
                                <Picker.Item label="Corte de cabelo" value="Corte de cabelo" />
                                <Picker.Item label="Maquiagem" value="Maquiagem" />
                                <Picker.Item label="Massagem" value="Massagem" />
                                <Picker.Item label="Manicure" value="Massagem" />
                                <Picker.Item label="Personalizado" value="Personalizado" />
                            </Picker>

                            {/* Campos dinâmicos */}
                            {services.map((item) => (
                                <View
                                    key={item.id}
                                    style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
                                >
                                    <View
                                        style={[
                                            styles.form,
                                        ]}
                                    >
                                        <TextInput
                                            value={item.itemDescription}
                                            style={[styles.input, { flexGrow: 1, marginRight: 5 }]}
                                            placeholder="Descrição do tipo"
                                            onChangeText={(text) => handleChangeDescription(item.id, text)}
                                        />
                                        <TextInput
                                            keyboardType="numeric"
                                            value={item.itemPrice}
                                            placeholder="Preço R$"
                                            style={[styles.input, { width: normalizeFont(90) }]}
                                            onChangeText={(text) => handleChangePrice(item.id, text)}
                                        />
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
                                        setServices([{ id: Date.now(), itemDescription: "", itemPrice: "", serviceType }]);
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
        marginRight: "auto",
        flexGrow: 1,
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
        flexGrow: 1,
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
