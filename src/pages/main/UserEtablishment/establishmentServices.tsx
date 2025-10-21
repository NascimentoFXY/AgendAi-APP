import React, { useState } from "react";
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
import { Picker } from '@react-native-picker/picker';
import Icon from "configs/icons";
const { width } = Dimensions.get("window");

interface TypeItem {
    itemId: string;
    itemDescription: string;
}

interface ServiceTypeItem {
    id: string;
    type: "Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado";
    quantity: number; // quantidade de tipos adicionados
    types: TypeItem[];
}
type serviceTypeProps = {
    id?: any,
    serviceType?: "Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado",
    quantity?: any,
    types: {
        itemId?: string,
        itemDescription: string
    }[]
}
export default function EstablishmentServices() {
    const [selectedService, setSelectedService] = useState<serviceTypeProps | null>(null);
    const [serviceType, setServiceType] = useState<"Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado">();
    const [serviceDescription, setServiceDescription] = useState("");
    const [services, setServices] = useState([{ id: Date.now(), itemDescription: '', serviceType: serviceType }]);
    const [servicesList, setServicesList] = useState<serviceTypeProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [infoDisplayVisible, setInfoDisplayVisible] = useState(false)
    const [editingService, setEditingService] = useState<serviceTypeProps | null>(null);
    const [isEditing, setIsEditing] = useState(false);


    console.log("[userEstablishment/establishmentServices] renderiou")
    const handleConfirm = () => {
        if (!serviceType) return;

        const typesArray = services.map(s => ({
            itemId: String(s.id),
            itemDescription: s.itemDescription,
        }));

        if (isEditing && editingService) {
            // Atualiza serviço existente
            setServicesList(prev =>
                prev.map(service =>
                    service.id === editingService.id
                        ? { ...service, serviceType, types: typesArray, quantity: typesArray.length }
                        : service
                )
            );
            setIsEditing(false);
            setEditingService(null);
        } else {
            // Cria novo serviço
            const newService = {
                id: String(Date.now() + Math.random()),
                serviceType,
                quantity: typesArray.length,
                types: typesArray,
            };
            setServicesList(prev => [...prev, newService]);
        }

        // Limpa inputs e fecha modal
        setServices([{ id: Date.now(), itemDescription: '', serviceType }]);
        setServiceType(undefined);
        setModalVisible(false);
    };


    const handleChangeValue = (id: number, newValue: string) => {
        setServices(prev =>
            prev.map(item => (item.id === id ? { ...item, itemDescription: newValue } : item))
        );
    };

    const handleInfoDisplay = (item: serviceTypeProps) => {
        setSelectedService(item);
        setInfoDisplayVisible(true);
    };

    const handleCampos = (acao: 'add' | 'removeOne' | 'removeAll', id?: number) => {
        if (acao === 'add') {
            setServices(prev => [...prev, { id: Date.now() + Math.random(), itemDescription: '', serviceType: serviceType }]);
            return;
        }

        if (acao === 'removeOne' && id !== undefined) {
            setServices(prev => prev.filter(item => item.id !== id));
            return;
        }

        if (acao === 'removeAll') {
            setServices([{ id: Date.now(), itemDescription: '', serviceType: serviceType }]);
            return;
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Serviços</Text>

                {
                    servicesList.length === 0 &&
                    <Text style={{ fontFamily: font.poppins.medium }}>
                        Você não possui nenhum serviço.
                    </Text>
                }
                <ScrollView contentContainerStyle={{ paddingVertical: 10, flex: 1, width: "100%", gap: 15 }}>

                    {servicesList.map((item, index) => (
                        <ServiceItem key={item.id} text={item.serviceType} amount={item.quantity} onPress={() => { setInfoDisplayVisible(true); handleInfoDisplay(item) }} />
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >

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
                                <Text key={type.itemId}>{type.itemDescription}</Text>
                            ))}

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.addButton, { marginHorizontal: "auto" }]}
                                    onPress={() => { setInfoDisplayVisible(false); setServices([{ id: Date.now(), itemDescription: '', serviceType }]); }}
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
                                                selectedService.types.map(type => ({
                                                    id: Number(type.itemId),
                                                    itemDescription: type.itemDescription,
                                                    serviceType: selectedService.serviceType
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

                {/* Modal */}
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>
                                {isEditing ? "Editar serviço" : "Adicionar serviço"}
                            </Text>
                            <Text>Tipo de serviço:</Text>
                            <Picker style={{ borderWidth: 12, height: 'auto' }} selectedValue={serviceType} onValueChange={(itemValue, itemIndex) => setServiceType(itemValue)}>

                                <Picker.Item label="Corte de cabelo" value="Corte de cabelo" />
                                <Picker.Item label="Maquiagem" value="Maquiagem" />
                                <Picker.Item label="Massagem" value="Massagem" />
                            </Picker>

                            {serviceType === "Corte de cabelo" && <>
                                {
                                    services.map((item, index) => (
                                        <View key={item.id} style={{ flexDirection: 'row', alignItems: "center" }}>

                                            <TextInput
                                                value={services[index].itemDescription}
                                                style={styles.input}
                                                placeholder="Tipo (ex: corte americano, mullet...)"
                                                onChangeText={(text) => handleChangeValue(item.id, text)}
                                            />
                                            <TouchableOpacity
                                                onPress={() => handleCampos('removeOne', item.id)}
                                                style={{ width: 22, height: 22, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", borderRadius: 2 }}>
                                                <Icon.Ionicons name="remove" color={colors.white} />
                                            </TouchableOpacity>

                                        </View>
                                    ))}
                                <TouchableOpacity
                                    onPress={() => handleCampos('add')}
                                    style={{ margin: 2, width: 22, height: 22, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", borderRadius: 2 }}>
                                    <Icon.Ionicons name="add" color={colors.white} />
                                </TouchableOpacity>

                            </>

                            }
                            {serviceType === "Maquiagem" && <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tipo (ex: Noiva, casual...)"
                                    onChangeText={setServiceDescription}
                                />
                                <TouchableOpacity style={{ width: 22, height: 22, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", borderRadius: 2 }}>
                                    <Icon.Ionicons name="add" color={colors.white} />
                                </TouchableOpacity>
                            </>

                            }
                            {serviceType === "Massagem" && <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tipo (ex: corte de cabelo, maquiagem...)"
                                    onChangeText={setServiceDescription}
                                />
                                <TouchableOpacity style={{ width: 22, height: 22, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center", borderRadius: 2 }}>
                                    <Icon.Ionicons name="add" color={colors.white} />
                                </TouchableOpacity>
                            </>

                            }
                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: "#ccc" }]}
                                    onPress={() => { setModalVisible(false); setIsEditing(false); setServices([{ id: Date.now(), itemDescription: '', serviceType }]); }}
                                >
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: colors.primary || "#007AFF" }]}
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
        margin: 2,
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
    addButton: {
        backgroundColor: colors.primary || "#007AFF",
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
        marginBottom: 10,
        flex: 1,
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
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
