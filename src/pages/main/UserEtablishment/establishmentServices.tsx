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
    quantity?: string,
    types?: {
        itemId?: string,
        itemDescription: string
    }[]
}
export default function EstablishmentServices() {
    const [serviceType, setServiceType] = useState<"Corte de cabelo" | "Maquiagem" | "Massagem" | "Personalizado">();
    const [serviceDescription, setServiceDescription] = useState("");
    const [services, setServices] = useState([{ id: Date.now(), itemDescription: '', serviceType: serviceType }]);
    const [servicesList, setServicesList] = useState<serviceTypeProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);


    const handleConfirm = (index: number) => {
        setServicesList(prev => [...prev, { id: Date.now() + Math.random(), serviceType: serviceType, types: [{ itemId: String(Date.now()), itemDescription: services[index].itemDescription }] }])
    };

    const handleChangeValue = (id: number, newValue: string) => {
        setServices(prev =>
            prev.map(item => (item.id === id ? { ...item, itemDescription: newValue } : item))
        );
    };
    const addTypeToService = (serviceId: string, newTypeDescription: string) => {
        setServicesList(prev => prev.map(service => {
            if (service.id === serviceId) {
                return {
                    ...service,
                    types: [...service.types, { itemId: String(Date.now()), itemDescription: newTypeDescription }]
                }
            }
            return service;
        }));
    }
    const addOrUpdateService = (typeDescription: string, serviceId?: number | string) => {
        if (serviceId) {
            // Adiciona um tipo a um serviço existente
            setServicesList(prev =>
                prev.map(service =>
                    service.id === serviceId
                        ? {
                            ...service,
                            types: [...service.types, { itemId: String(Date.now()), itemDescription: typeDescription }]
                        }
                        : service
                )
            );
        } else {
            // Cria um novo serviço com um tipo
            if (!serviceType) return; // evita criar serviço sem tipo selecionado
            setServicesList(prev => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    serviceType: serviceType,
                    types: [{ itemId: String(Date.now()), itemDescription: typeDescription }]
                }
            ]);
        }
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

                <Text style={{ fontFamily: font.poppins.medium }}>
                    Você não possui nenhum serviço.
                </Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >

                    <Text style={styles.addButtonText}>Adicionar Serviços</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ paddingVertical: 10, flex: 1, width: "100%" }}>

                    {servicesList.map((item, index) => (
                        <ServiceItem key={index} text={item.serviceType} />
                    ))}
                </ScrollView>

                {/* Modal */}
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Adicionar serviço</Text>
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
                                    onPress={() => setModalVisible(false)}
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
        fontWeight: "600",
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
        fontWeight: "bold",
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
        fontWeight: "600",
    },
});
