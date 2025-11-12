import { collection, doc, getDocs, orderBy, query, updateDoc } from '@firebase/firestore';
import AgendamentoCard from 'components/Salao/AgendamentoCards';
import Icon from 'configs/icons';
import colors, { font } from 'configs/theme';
import { normalizeSize } from 'configs/utils';
import { useAlert } from 'context/alertContext';
import { useSalonContext } from 'context/salonContext';
import { ScheduleContext, ScheduleParams } from 'context/scheduleContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal
} from 'react-native';
import { db } from 'services/firebase';
const { width } = Dimensions.get("window")


const Cards = (props: Partial<ScheduleParams>) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { schedule } = useContext(ScheduleContext)!
  const { showAlert } = useAlert()
  const pressHandle = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }
  const concluirHandle = async (salonId: string, userId: string, scheduleID: string) => {
    try {

      const res = await showAlert("Deseja marcar este agendamento como concluído? (esta ação não pode ser desfeita)", "confirm")
      if (!res) return
      if (!userId) {
        console.error("Informações incompletas do agendamento.");
        return;
      }

      // Referência do agendamento no salão
      const scheduleSalonRef = doc(db, "salon", salonId, "schedules", scheduleID);

      // Referência do agendamento no usuário
      const scheduleUserRef = doc(db, "users", userId, "schedules", scheduleID);

      // Atualiza o status para "concluído" em ambas as coleções
      await Promise.all([
        updateDoc(scheduleSalonRef, {
          status: "done",
          concludedAt: new Date(),
        }),
        updateDoc(scheduleUserRef, {
          status: "done",
          concludedAt: new Date(),
        }),
      ]);

      console.log("✅ Agendamento marcado como concluído com sucesso!");
      setModalVisible(false);
      showAlert("Agendamento definido como concluido.", "success")
    } catch (er) {
      console.error("Erro ao concluir agendamento:", er);
    }
  };
  return (
    <TouchableOpacity style={{ backgroundColor: colors.white, padding: 20, borderRadius: 10 }} onPress={pressHandle}>

      <Modal visible={modalVisible} transparent style={{ padding: 50 }}>
        <View style={{ backgroundColor: colors.white, margin: "auto", width: "70%", paddingVertical: 10, borderRadius: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity onPress={closeModal}>
              <Icon.Ionicons name='close-circle-outline' size={24} color={"red"} />
            </TouchableOpacity>
            <Text style={{ fontFamily: font.poppins.bold }}>
              Visão geral
            </Text>
            <View />
          </View>

          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: font.poppins.regular }}>Serviço:</Text>
              <Text>{props.service?.itemName}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: font.poppins.regular }}>Profissional:</Text>
              <Text>{props.specialist?.name}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontFamily: font.poppins.regular }}>Status:</Text>
              <Text>{props.status === "canceled" ? "Cancelado" : "Ativos"}</Text>
            </View>
            {props.status === "canceled" &&
              <View style={{ gap: 5 }}>
                <Text style={{ fontFamily: font.poppins.regular }}>Motivo do cancelamento:</Text>
                <View>
                  {props.cancelMotive ? props.cancelMotive.map((motivos, index) => (
                    <Text>{motivos}</Text>
                  )) :
                    <Text>Não informado</Text>
                  }</View>
              </View>}
          </View>

          <View>

            <TouchableOpacity onPress={() => concluirHandle(props.salonId!, props.userId!, props.id!)} style={{ padding: 5, backgroundColor: colors.primary, borderRadius: 20, marginHorizontal: 10 }}>
              <Text style={{ fontFamily: font.poppins.semibold, color: colors.white, textAlign: "center" }}>
                Definir como Concluido
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: font.poppins.regular }}>{props.date?.split("|")[1]}</Text>
        <Text>{props.time}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontFamily: font.poppins.regular }}>Serviço:</Text>
        <Text>{props.service?.itemName}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontFamily: font.poppins.regular }}>Profissional:</Text>
        <Text>{props.specialist?.name}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={{ fontFamily: font.poppins.regular }}>Status:</Text>
        <Text>{props.status === "canceled" ? "Cancelado" : "Ativos"}</Text>
      </View>

    </TouchableOpacity >
  )
}

export default function SalaoAgendamentos() {

  const { salon } = useSalonContext()!
  const [scheduleList, setScheduleList] = useState<ScheduleParams[] | null>()
  console.log(scheduleList)
  const getSchedules = useCallback(async () => {
    if (!salon?.id) return;

    try {

      const scheduleRef = collection(db, "salon", salon.id, "schedules");

      const q = query(scheduleRef, orderBy("date", "desc"));


      const snapshot = await getDocs(q);


      const schedules = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ScheduleParams[];

      setScheduleList(schedules);
    } catch (err) {
      console.error("Erro ao buscar agendamentos:", err);
      setScheduleList(null);
    }
  }, [salon?.id]);

  useEffect(() => {
    getSchedules();
  }, [getSchedules]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>

          <Text style={{ fontFamily: font.poppins.bold, fontSize: normalizeSize(18) }}>Agendametos</Text>
          <Text style={{ fontFamily: font.poppins.bold, fontSize: normalizeSize(18), color: colors.primary }}> ({scheduleList?.length})</Text>
        </View>
        {scheduleList?.map((schedule, index) => (
          <Cards
            {...schedule}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content:
  {
    gap: 15,
    padding: 20
  },
});