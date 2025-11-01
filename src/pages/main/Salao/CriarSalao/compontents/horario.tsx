import { View, Text } from "react-native";
import Input from "./Input/input";
import { useContext, useState } from "react";
import { SalonContext } from "../../../../../context/salonContext";

export default function Horario() {
  const { setData } = useContext(SalonContext)!;
  const [abertura, setAbertura] = useState("");
  const [fechamento, setFechamento] = useState("");

  // Valida formato e intervalo de horário (HH:MM)
  const validarHorario = (horario: string) => {
    if (!horario || horario.length !== 5)return false;
    
    const [h, m] = horario.split(":").map(Number);
    return !(isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59);
  };

  // Formata automaticamente enquanto digita
  const formatarHorario = (text: string) => {
    let numeros = text.replace(/\D/g, "");

    // Permitir apagar tudo
    if (numeros.length === 0) return "";

    // Limitar a 4 dígitos
    if (numeros.length > 4) numeros = numeros.slice(0, 4);

    // Inserir “:” após 2 dígitos
    if (numeros.length > 2) {
      return numeros.slice(0, 2) + ":" + numeros.slice(2);
    }

    return numeros;
  };

  const handleAbertura = (text: string) => {
    const formatado = formatarHorario(text);
    setAbertura(formatado);

    // Só atualiza o contexto se for um horário válido completo
    if (validarHorario(formatado) && validarHorario(fechamento)) {
      setData({
        abertura: formatado,
        fechamento: fechamento,
      });
    }
  };

  const handleFechamento = (text: string) => {
    const formatado = formatarHorario(text);
    setFechamento(formatado);

    if (validarHorario(formatado) && validarHorario(abertura)) {
      setData({
        abertura: abertura,
        fechamento: formatado,
      });
    }
  };

  // Avisos automáticos 
  const mostrarErro = (valor: string) => {
    if (valor && valor.length === 5 && !validarHorario(valor)) {
      return <Text style={{ color: "red", fontSize: 12 }}>⛔ Horário inválido</Text>;
    }
    return null;
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Input
          placeholder="00:00"
          icon={false}
          onChangeText={handleAbertura}
          maxChar={5}
          numeric
          value={abertura}
          style={{
            fontSize: 15,
            width: "40%",
            textAlign: "center",
          }}
        />
        <Text style={{ fontSize: 18 }}>—</Text>
        <Input
          placeholder="00:00"
          icon={false}
          onChangeText={handleFechamento}
          maxChar={5}
          numeric
          value={fechamento}
          style={{
            fontSize: 15,
            width: "40%",
            textAlign: "center",
          }}
        />
      </View>

      {/* Mensagens de erro abaixo dos inputs */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 5 }}>
        {mostrarErro(abertura)}
        {mostrarErro(fechamento)}
      </View>
    </View>
  );
}
