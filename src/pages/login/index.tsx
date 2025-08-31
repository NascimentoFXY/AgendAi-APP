import React, {useContext} from 'react';
import { AuthContext } from '../../context/auth';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./style";
import colors from "../../configs/colors";
import { Input } from "../../components/input";
import CustomButton from "../../components/customButton";
import AntDesign from '@expo/vector-icons/AntDesign';
export default function Login({ navigation }: any) {

    const { signIn, signOut } = useContext(AuthContext)!;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <SafeAreaView style={styles.mainContainer}>

            <CustomButton
                Icon={<AntDesign name="arrowleft" size={30} color={colors.lightGray}/>}
                onPress={()=> navigation.goBack()}
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
                    <Input
                        title="Senha"
                        placeholder="Digite sua senha"
                        secureTextEntry={false}
                        onTextChange={setPassword}
                    />
                    <TouchableOpacity
                        style={{ flexDirection: "row-reverse" }}
                        onPress={() => (alert("Função de recuperação de senha ainda não implementada. Deslogando..."), signOut())}
                        >
                        <Text style={{ color: colors.primary }}>Esqueceu sua senha?</Text></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={()=> signIn(email, password)}>
                    <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>Entrar</Text>
                </TouchableOpacity>
                
                <View style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
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

                </View>
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