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
import ProfessionalCard from "components/Salao/EspecialistaScreen";
import { capitalizeFirstLetter, getUserByEmail, sendNotification } from "configs/utils";
import { useAuthContext } from "context/auth";
import { useNotificationContext } from "context/notificationsContext";
import { User } from 'context/auth'
import { useSalonContext } from "context/salonContext";
import { collection, doc, getDoc, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "services/firebase";
const { width } = Dimensions.get("window");


export interface Specialist {
  id: string,
  name: string,
  email: string,
  rating?: string,
  service: string,
  image?: string,
}
export default function EstablishmentEspecialist() {
  const { notificationList, notifyUserByEmail } = useNotificationContext()!
  const { user } = useAuthContext()!
  const { salon } = useSalonContext()!
  const [especialistaEmail, setEspecialistaEmail] = useState("");
  const [servico, setServico] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [especialistaList, setEspecialistaList] = useState<Specialist[]>();

  const width = Dimensions.get("window").width;
  const calcCardsWidth = (width / 2) - 40;
  // console.log(salon?.id)
  const getUserHandler = async (email: string) => {
    const user = await getUserByEmail(email)
    console.log(user)
    return user
  }

  const handleConfirm = async () => {
    if (!especialistaEmail || !servico) {
      alert("Preencha todos os campos!");
      return;
    }
    const userRes = await getUserHandler(especialistaEmail)
    if (!userRes) return

    notifyUserByEmail(userRes.email, user?.name!, salon?.id!, servico)

    alert("O convite foi enviado para: " + userRes.name + ". \nAguarde a solicitação.");

    setModalVisible(false);
    setEspecialistaEmail("");
    setServico("");
  };
  useEffect(() => {
    const fetchSpecialists = async () => {

      if (!salon?.id) return
      console.log(salon.id)
      try {
        const specialistRef = collection(db, "salon", salon?.id!, "specialists")
        const q = query(specialistRef, orderBy("name", "desc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return;
        const specialists = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as { name: string, email: string, service: string }
        }))
        setEspecialistaList(specialists)
      } catch (er) {
        console.error("[establishmentEspecialist] ", er)
      }
    }

    fetchSpecialists()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Especialistas</Text>

        <Text style={{ fontFamily: font.poppins.medium }}>
          Você não possui nenhum especialista
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >

          <Text style={styles.addButtonText}>Adicionar especialista</Text>
        </TouchableOpacity>


        {/* Cards de especialistas */}
        <SafeAreaView style={styles.professionalContainer}>

          {especialistaList?.map((item, index) =>
            <>


              <ProfessionalCard
                key={item.id}
                userPhoto={item.image} // imagem do usuario
                name={capitalizeFirstLetter(item.name)} // nome
                profession={item.service} // serviço ex: Corte de Cabelo
                cardWidth={calcCardsWidth-20} />
            </>
          )
          }
        </SafeAreaView>

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
  professionalContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 120,
    gap: 20,
    justifyContent: "center",
    paddingTop: 20,
    flexWrap: "wrap"
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
