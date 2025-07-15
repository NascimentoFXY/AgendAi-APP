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
import { Input } from "../../components/input";
export default function Login({ navigation }: any) {
    return (
        <SafeAreaView style={styles.mainContainer}>

            <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.navigate("Initial")}>
                <Text>O</Text>
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <View style={styles.header}>


                    <Text style={styles.bold}>Faça seu Login</Text>
                    <Text style={{ fontSize: 12, marginBottom: 20 }}>Bem vindo(a) de volta, sentimos sua falta.</Text>

                </View>

                <SafeAreaView style={{ width: "100%", flex: 1, marginBottom: 40 }}>

                    <Input
                        title="Email"
                        placeholder="Digite seu Email"
                    />
                    <Input
                        title="Senha"
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={{ flexDirection: "row-reverse" }}
                    >

                        <Text style={{ color: colors.primary }}>Esqueceu sua senha?</Text></TouchableOpacity>
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
                    <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                        <Text style={{ color: colors.primary }}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footerCurve} />
        </SafeAreaView>

    );
}