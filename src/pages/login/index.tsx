import React from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "./style";
import colors from "../../configs/colors";
export default function Login() {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>

                    <Text style={styles.bold}>Faça seu Login</Text>
                    <Text style={{ fontSize: 12, marginBottom: 20 }}>Bem vindo(a) de volta, sentimos sua falta.</Text>

                </View>

                <SafeAreaView style={{ width: "100%", flex: 1, marginBottom: 40 }}>

                    <Text>Email</Text>
                    <TextInput style={styles.input} placeholder="Email@gmail.com"></TextInput>

                    <Text>Senha</Text>
                    <TextInput style={styles.input} placeholder="Digite sua senha"></TextInput>
                    <TouchableOpacity style={{ flexDirection: "row-reverse" }}><Text style={{ color: colors.primary }}>Esqueceu sua senha?</Text></TouchableOpacity>
                </SafeAreaView>

                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>Entrar</Text>
                </TouchableOpacity>


                <SafeAreaView style={{ width: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
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

                </SafeAreaView>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text>Não tem uma conta? </Text>
                    <TouchableOpacity>
                        <Text style={{ color: colors.primary }}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footerCurve} />
        </SafeAreaView>

    );
}