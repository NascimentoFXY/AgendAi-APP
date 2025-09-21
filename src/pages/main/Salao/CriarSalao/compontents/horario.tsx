import { View, Text } from "react-native";
import Input from "./Input/input";
import { useContext, useState } from "react";
import { SalonContext } from "../../../../../context/salonContext";


export default function Horario() {

    const {setData}= useContext(SalonContext)!
    const [abertura, setAbertura] = useState("");
    const [fechamento, setFechamento] = useState("");
    
    const validarHorario = (horario: string) => {

        const [h, m] = horario.split(":").map(Number);
        if (isNaN(h) || isNaN(m)) return false;
        if (h < 0 || h > 23) return false;
        if (m < 0 || m > 59) return false;
        return true;

    };

    function formatarHorario(text: string) {

        // Remove tudo que não é número
        let numeros = text.replace(/\D/g, "");

        // Limita a 4 dígitos (HHMM)
        if (numeros.length > 4) numeros = numeros.slice(0, 4);

        // Insere ":" entre horas e minutos
        if (numeros.length >= 3) {
            numeros = numeros.slice(0, 2) + ":" + numeros.slice(2);
        }
        if (fechamento && abertura && numeros.length > 4) {

            validarHorario(numeros);

            if (!validarHorario(abertura)) {
                alert("Erro: " + "Horário de ABERTURA inválido!");
                return;
            }
            if (!validarHorario(fechamento)) {
                alert("Erro: " + "Horário de FECHAMENTO inválido!");
                return;
            }
        }
        return numeros;
    }

    const handleAbertura = (text: string) => {
        const formatado = formatarHorario(text);
        if(formatado){
            setAbertura(formatado);
            setData({
                fechamento: fechamento,
                abertura: formatado
            })
        }
    };
    const handleFechamento = (text: string) => {
        const formatado = formatarHorario(text);
        if(formatado){
            setFechamento(formatado);
            setData({
                fechamento: formatado,
                abertura: abertura,
            })
        }
    };



    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Input placeholder='00:00-23:00' icon={false} onChangeText={handleAbertura} maxChar={5} numeric value={abertura} style={{ fontSize: 15, width: "45%", textAlign: "center" }} />
            <Text>-</Text>
            <Input placeholder='00:00-23:00' icon={false} onChangeText={handleFechamento} maxChar={5} numeric value={fechamento} style={{ fontSize: 15, width: "45%", textAlign: "center" }} />
        </View>
    )
}