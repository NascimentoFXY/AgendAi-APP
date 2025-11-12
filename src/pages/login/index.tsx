import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth';
import {
    Modal,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./style";
import colors from "../../configs/theme";
import { Input } from "../../components/input";
import CustomButton from "../../components/customButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from 'configs/icons';
export default function Login({ navigation }: any) {

    const { signIn, signOut } = useContext(AuthContext)!;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const handleSignIn = async () => {
        if (!email && !password) {
            alert("verifique todos os campos.")
            return
        }
        await signIn(email, password)

    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            <CustomButton
                Icon={<AntDesign name="arrow-left" size={30} color={colors.lightGray} />}
                onPress={() => navigation.goBack()}
                style={styles.backButtonContainer}

            />
            <View style={styles.contentContainer}>
                <View style={styles.header}>


                    <Text style={styles.bold}>Faça seu Login</Text>
                    <Text style={{ fontSize: 12, marginBottom: 20 }}>Bem vindo(a) de volta, sentimos sua falta.</Text>

                </View>

                <View style={{ width: "100%", flex: 1, marginBottom: 40 }}>

                    <Input
                        title="Email"
                        placeholder="Digite seu Email"
                        onTextChange={setEmail}

                    />

                    <View style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 5,
                        marginBottom: 10,
                        backgroundColor: "#fff",
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <TextInput secureTextEntry={secureTextEntry} onChangeText={setPassword} placeholder='Senha' style={{ fontSize: 12, flex: 1 }} />
                        <TouchableOpacity onPress={() => { setSecureTextEntry(!secureTextEntry) }}>
                            <Icon.AntDesign name='eye' size={20} color={colors.lightGray} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{ flexDirection: "row-reverse" }}
                        onPress={() => (alert("Função de recuperação de senha ainda não implementada."), signOut())}
                    >
                        <Text style={{ color: colors.primary }}>Esqueceu sua senha?</Text></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>Entrar</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                        <Text style={{ color: colors.primary }}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footerCurve} />
        </SafeAreaView>

    );
}