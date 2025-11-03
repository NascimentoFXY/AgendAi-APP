import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { capitalizeFirstLetter, formatCurrency, getUserByEmail, sendNotification } from "configs/utils";
import { useAuthContext } from "context/auth";
import { useNotificationContext } from "context/notificationsContext";
import { User } from 'context/auth'
import { Services, useSalonContext } from "context/salonContext";
import { collection, doc, getDoc, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "services/firebase";
import { ServiceTypeProps } from "./establishmentServices";
const { width } = Dimensions.get("window");


export interface Specialist {
  id: string,
  name: string,
  email: string,
  rating?: string,
  service: ServiceTypeProps[],
  image?: string,
}
export default function EstablishmentEspecialist() {
  const { notificationList, notifyUserByEmail } = useNotificationContext()!
  const { user } = useAuthContext()!
  const { salon, fetchSpecialists, specialistList, addSpecialistToSalon, fetchSalons, serviceList } = useSalonContext()!
  const [especialistaEmail, setEspecialistaEmail] = useState("");
  const [especialistaProfession, setEspecialistaProfession] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<ServiceTypeProps["types"]>([])

  const width = Dimensions.get("window").width;
  const calcCardsWidth = (width / 2) - 40;
  // console.log(salon?.id)
  const getUserHandler = useCallback(async (email: string) => {
    const user = await getUserByEmail(email)
    console.log(user)
    return user
  }, [])

  const toggleOption = (type: ServiceTypeProps["types"][0]) => {
    const alreadySelected = selectedOptions.some(opt => opt.itemId === type.itemId);
    if (alreadySelected) {
      setSelectedOptions(prev => prev.filter(opt => opt.itemId !== type.itemId));
    } else {
      setSelectedOptions(prev => [...prev, type]);
    }
  };

  useEffect(() => {
    console.log("[Estab.Specialist] ", selectedOptions)
  }, [selectedOptions]);

  const handleConfirm = useCallback(async () => {
    if (!especialistaEmail || !selectedOptions) {
      alert("Preencha todos os campos!");
      return;
    }
    const userRes = await getUserHandler(especialistaEmail)
    if (!userRes) return
    try {
      const specialistRef = doc(db, "salon", salon?.id!, "specialists", userRes?.id!);


      const specialistSnap = await getDoc(specialistRef);
      if (userRes.id === user?.id && !specialistSnap.exists()) {
        addSpecialistToSalon!(salon?.id!, user, selectedOptions)
        setModalVisible(false);
        setEspecialistaEmail("");
        setEspecialistaProfession("");
        setSelectedOptions([])
        return
      } else if (specialistSnap.exists()) {
        alert(`⚠️ ${userRes.name} já foi convidado ou é especialista deste salão.`);
        return;
      }
      notifyUserByEmail(userRes.email, user?.name!, salon?.id!, selectedOptions)

      alert("O convite foi enviado para: " + userRes.name + ". \nAguarde a solicitação.");

      setModalVisible(false);
      setEspecialistaEmail("");
      setEspecialistaProfession("");
      setSelectedOptions([])
    } catch (er) {
      console.error(er)
    }
  }, [especialistaEmail, selectedOptions]);


  useEffect(() => {
    fetchSpecialists();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Especialistas</Text>

        {specialistList.length == 0 && <Text style={{ fontFamily: font.poppins.medium }}>
          Você não possui nenhum especialista
        </Text>}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >

          <Text style={styles.addButtonText}>Adicionar especialista</Text>
        </TouchableOpacity>


        {/* Cards de especialistas */}
        <SafeAreaView style={styles.professionalContainer}>

          {specialistList?.map((item, index) => (
            // {console.log("[ITEM ID]", item.id)}
            <ProfessionalCard
              key={item.id}
              userPhoto={item.image} // imagem do usuario
              name={capitalizeFirstLetter(item.name)} // nome
              profession={item.profession} // serviço ex: cabeleireiro
              cardWidth={calcCardsWidth - 10} />
          ))}
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
              <Text style={styles.modalTitle}>Convidar prestador de serviço</Text>
              <Text style={{ fontFamily: font.poppins.medium, color: colors.lightGray }}>Você pode incluir seu email cadastrado para fazer parte dos prestadores de serviço do estabelecimento. </Text>
              <TextInput
                style={styles.input}
                placeholder="Email do prestador de serviço"
                value={especialistaEmail}
                onChangeText={setEspecialistaEmail}
              />
              <Text style={styles.modalTitle}>Profissão:</Text>
              <TextInput
                style={styles.input}
                placeholder="Profissão (ex: cabeleireiro)"
                value={especialistaProfession}
                onChangeText={setEspecialistaProfession}

              />

              <Text style={styles.modalTitle}>Selecione ao menos um serviço prestado:</Text>
              <ScrollView>

                {serviceList.map((service, index) => (
                  <View key={service.id} style={styles.cardContainer}>

                    <Text style={styles.cardTitle}>
                      {service.serviceName}
                    </Text>

                    {service.types.map((type) => {

                      const isSelected = selectedOptions.some(opt => opt.itemId === type.itemId);
                      return (
                        <TouchableOpacity
                          key={type.itemId}
                          style={[
                            styles.cardOption,
                            isSelected && { outlineWidth: 2, outlineColor: "green" }
                          ]}
                          onPress={() => toggleOption(type)}
                        >
                          <Text style={styles.cardOptionText}>{type.itemDescription}</Text>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Text>{formatCurrency(Number(type.itemPrice))}</Text>
                          </View>
                        </TouchableOpacity>
                      );

                    })}

                  </View>
                ))}
              </ScrollView>

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
    marginVertical: 2,
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

  //services
  cardContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.lightGray,
    padding: 10,
    marginVertical: 5
  },
  cardTitle: {
    fontFamily: font.poppins.semibold,
    textAlign: "center",
    paddingBottom: 5
  },
  cardPrice: {

  },
  cardOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardOptionText: {
    fontFamily: font.poppins.regular
  },
  iconInactive: {
    display: "none"
  }
});
