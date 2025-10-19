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

const { width } = Dimensions.get("window");

export default function EstablishmentEspecialist() {
  const [especialistaEmail, setEspecialistaEmail] = useState("");
  const [servico, setServico] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [especialistaList, setEspecialistaList] = useState([]);


  const handleConfirm = () => {
    if (!especialistaEmail || !servico) {
      alert("Preencha todos os campos!");
      return;
    }

    const Especialista={

    }

    alert("O convite foi enviado para:"+ especialistaEmail + ". \nAguardando solicitação." );

    setModalVisible(false);
    setEspecialistaEmail("");
    setServico("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Especialistas</Text>

        <Text style={{fontFamily: font.poppins.medium}}>
          Você não possui nenhum especialista
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >

          <Text style={styles.addButtonText}>Adicionar especialista</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Convidar especialista</Text>

              <TextInput
                style={styles.input}
                placeholder="Email do especialista"
                value={especialistaEmail}
                onChangeText={setEspecialistaEmail}
              />

              <TextInput
                style={styles.input}
                placeholder="Serviço (ex: corte de cabelo, maquiagem...)"
                value={servico}
                onChangeText={setServico}
              />

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
