import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./style";

import colors from "../../configs/theme";


import { Ionicons, AntDesign } from '@expo/vector-icons'; // Ícone do check
import Checkbox from "../../components/checkbox/checkbox";
import { Input } from "../../components/input";
import CustomButton from "../../components/customButton";
import Icon from "configs/icons";

export default function Cadastro({ navigation }: any) {
    const { register } = useContext(AuthContext)!;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [secureTextEntry1, setSecureTextEntry1] = useState(true)
    const [secureTextEntry2, setSecureTextEntry2] = useState(true)
    console.log("[cadastro]", confirmPass)
    const handlerRegister = async () => {
        if (name && email && password) {
            if (password.length >= 6 && confirmPass === password) {
                await register(name, email, password);
            }
            else {
                alert("Verifique sua senha. (Min. 6 caracteres.)")
            }
        } else {
            alert("verifique todos os campos.")
        }
    }
    return (
        <SafeAreaView style={styles.mainContainer}>

            <CustomButton
                Icon={<AntDesign name="arrow-left" size={24} color={colors.lightGray} />}
                onPress={() => navigation.goBack()}
                style={styles.backButtonContainer}

            />

            <ScrollView style={styles.contentContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.header}>

                    <Text style={styles.bold}>Crie sua conta</Text>
                    <Text style={{ fontSize: 12, marginBottom: 20, textAlign: "center" }}>Insira suas informações abaixo ou registre-se com sua conta social</Text>

                </View>


                <View style={{ width: "100%", height: "auto", marginBottom: 20 }}>

                    <View style={styles.inputContainer}>

                        <Input
                            title="Nome Completo"
                            placeholder="Digite seu nome completo"
                            onTextChange={setName}

                        />
                        <Input
                            title="Email"
                            placeholder="Digite seu Email"
                            onTextChange={setEmail}
                        />

                        <Text>Senha</Text>
                        <View style={styles.input}>
                            
                            <TextInput secureTextEntry={secureTextEntry1} onChangeText={setPassword} placeholder='Senha (Min. 6 caracteres)' style={{ fontSize: 12, flex: 1 }} />
                            <TouchableOpacity onPress={() => { setSecureTextEntry1(!secureTextEntry1) }}>
                                <Icon.AntDesign name='eye' size={20} color={colors.lightGray} />
                            </TouchableOpacity>
                        </View>
                        <Text>Confirme sua senha</Text>
                        <View style={styles.input}>
                            
                            <TextInput secureTextEntry={secureTextEntry2} onChangeText={setConfirmPass} placeholder='Confirme sua senha' style={{ fontSize: 12, flex: 1 }} />
                            <TouchableOpacity onPress={() => { setSecureTextEntry2(!secureTextEntry2) }}>
                                <Icon.AntDesign name='eye' size={20} color={colors.lightGray} />
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={styles.termsContainer}>
                        <Checkbox />
                        <Text style={{justifyContent: "center"}}>Concordo com os <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}}><Text style={styles.link}>Termos e condicões</Text></TouchableOpacity></Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handlerRegister}>
                        <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>



                <View style={{ width: "100%", height: "auto", alignItems: "center", justifyContent: "center", marginBottom: 100 }}>
                    <Text>Ou entre com</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.options}>
                            <Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.options}>
                            <Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.options}>
                            <Text></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.options}>
                            <Text></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
                        <Text>Já tem uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: colors.primary }}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.footerCurve} />
        </SafeAreaView>

    );
}