import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { styles } from "../style";
import colors from "../../../configs/theme";
import { Input } from "../../../components/input";
import MainScreen from "../../../components/MainScreenLogo";


export default function FinalScreen({ navigation }: any) {
  return (
    <SafeAreaView style={Styles2.container}>
      {/* Imagem do celular */}

      <View style={{justifyContent: "center", alignItems:"center", marginBottom: 200}}>


        <View style={{ width: 280, height: 570, }}>
          <MainScreen />
        </View>
      </View>



      <View style={styles.modal}>

        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
          Seu <Text style={{ color: colors.primary }}>Melhor Aplicativo</Text> de{" "}
          <Text style={{}}>Agendamento</Text> de salão
        </Text>

        <Text style={{ textAlign: "center" }}>
          Descubra um mundo de salões na palma da sua mão com o AgendAi, o melhor app de agendamentos estéticos
        </Text>

        <TouchableOpacity
          style={Styles2.modalButton}
          onPress={() => navigation.navigate("Cadastro")} // ou Login
        >
          <Text style={{ color: "#fff" }}>Vamos Começar</Text>
        </TouchableOpacity>


        <View style={{ flexDirection: "row", marginBottom: 50 }}>
          <Text>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.primary }}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles2 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse"
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 50,

  }


})