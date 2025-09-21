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
    TextStyle
} from 'react-native';
import colors, { font } from '../../../../../configs/theme';
import Icon from '../../../../../configs/icons';
import Input from './Input/input';
import Horario from './horario';
import { SalonContext } from '../../../../../context/salonContext';

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

    useEffect(() => {
        setData({
            nome: nome,
            especialidades: especialidades,
            cnpj: cnpj
        })
    }, [nome, especialidades, cnpj])

    useEffect(() => {
       if(nome && especialidades && cnpj&& cep&& rua&& bairro&& cidade){
        setValidInput(true)
        setIsValid(true)
        console.log(validInput)
       }
       else{
        setValidInput(false)
       }
    }, [nome, especialidades, cnpj, cep, rua, bairro, cidade, validInput])
    

    return (
        <SafeAreaView style={styles.container}>

            <Input placeholder='ADICIONE UM NOME' onChangeText={setNome} style={{ fontFamily: font.abrilfatface }} />
            <Input placeholder='Especialidades (ex: Corte de cabelo, etc..)' onChangeText={setEspecialidades} style={{ fontSize: 15 }} />
            <Input placeholder='CNPJ' onChangeText={setCnpj} style={{ fontSize: 15 }} />

            <Input placeholder='CEP' style={{ fontSize: 15, }} onChangeText={buscarCep} maxChar={8} />
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <Input placeholder='Nome da rua' icon={false} value={rua} style={{ fontSize: 15, width: "32%" }} />
                <Input placeholder='Cidade' icon={false} value={cidade} style={{ fontSize: 15, width: "32%" }} />
                <Input placeholder='Bairro' icon={false} value={bairro} style={{ fontSize: 15, width: "32%" }} />
            </View>

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