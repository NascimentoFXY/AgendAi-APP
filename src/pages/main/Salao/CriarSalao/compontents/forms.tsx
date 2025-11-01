import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,

} from 'react-native';
import colors, { font } from '../../../../../configs/theme';
import Icon from '../../../../../configs/icons';
import Input from './Input/input';
import Horario from './horario';
import { SalonContext } from '../../../../../context/salonContext';
import { Picker } from '@react-native-picker/picker';
import { formatCNPJ } from 'configs/utils';

export interface DataProps {
    nome?: string;
    especialidades?: string;
    cep?: string;
    cnpj?: string;
    numero?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    image?: any;
    abertura?: string
    fechamento?: string
    escala?: any;
}
export default function Forms() {
    const { setData, setIsValid } = useContext(SalonContext)!
    const [nome, setNome] = useState("");
    const [especialidades, setEspecialidades] = useState("");
    const [cnpj, setCnpj] = useState("")
    const [cep, setCep] = useState("");
    // const [numero, setNumero] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [validInput, setValidInput] = useState(false)


    async function buscarCep(text: string) {
        setCep(text);

        // só busca quando tiver 8 dígitos
        if (text.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${text}/json/`);
                const data = await response.json();
                const _data = {
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    localidade: data.localidade,
                }
                if (!data.erro) {
                    setRua(_data.logradouro);
                    setBairro(_data.bairro);
                    setCidade(_data.localidade);
                } else {
                    setRua("");
                    setBairro("");
                    setCidade("");
                }
                setData({
                    cep: cep,
                    // numero: numero,
                    rua: _data.logradouro,
                    bairro: _data.bairro,
                    cidade: _data.localidade,
                })
            } catch (error) {
                console.log("Erro ao buscar CEP", error);
            }
        }
    }

    const [selectedValue, setSelectedValue] = useState("1-5");
    useEffect(() => {
        setData({
            nome: nome,
            especialidades: especialidades,
            cnpj: cnpj,
            escala: selectedValue,
        })
    }, [nome, especialidades, cnpj, selectedValue])

    useEffect(() => {
        if (nome && especialidades && cnpj && cep && rua && bairro && cidade) {
            setValidInput(true)
            setIsValid(true)
            console.log(validInput)
        }
        else {
            setValidInput(false)
        }
    }, [nome, especialidades, cnpj, cep, rua, bairro, cidade, validInput])

    return (
        <SafeAreaView style={styles.container}>

            <Input placeholder='ADICIONE UM NOME' onChangeText={setNome} style={{ fontFamily: font.poppins.semibold, fontSize: 15, }} />
            <Input placeholder='Descrição (breve descrição dos serviços)' onChangeText={setEspecialidades} style={{ fontSize: 15 }} />
            <Input placeholder='CNPJ' value={formatCNPJ(cnpj)} onChangeText={setCnpj} style={{ fontSize: 15 }} maxChar={14} />

            <Input placeholder='CEP' style={{ fontSize: 15, }} onChangeText={buscarCep} maxChar={8} />
            <View style={{ justifyContent: "space-between" }}>
                <Input editable={false} placeholder='Nome da rua' icon={false} value={rua} style={{ fontSize: 15,opacity: 0.5}} />
                <Input editable={false} placeholder='Cidade' icon={false} value={cidade} style={{ fontSize: 15,opacity: 0.5 }} />
                <Input editable={false} placeholder='Bairro' icon={false} value={bairro} style={{ fontSize: 15, opacity: 0.5 }} />
            </View>

            <Text style={styles.label}>Dias de funcionamento</Text>
            <Picker style={{ borderWidth: 12, height: 'auto' }} selectedValue={selectedValue || "1-5"} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label="Seg. a Sex." value="1-5" />
                <Picker.Item label="Seg. a Sáb." value="1-6" />
                <Picker.Item label="Seg. a Seg." value="1-1" />
            </Picker>
            <Text style={styles.label}>Horário de funcionamento</Text>
            <Horario />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    label: {
        fontFamily: font.poppins.bold,
        fontSize: 20,
        paddingVertical: 20,
        textAlign: 'center',
    }

});