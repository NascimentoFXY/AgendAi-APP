import React from "react";
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

import colors from "../../configs/colors";


import { useState } from "react";
import { Ionicons } from '@expo/vector-icons'; // Ícone do check
import Checkbox from "../../components/checkbox/checkbox";
import { Input } from "../../components/input";

export default function Cadastro() {
    return (
        <SafeAreaView style={styles.mainContainer}>

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
                        
                        />
                        <Input
                        title="Email"
                        placeholder="Digite seu Email"
                        />
                        <Input
                        title="Senha"
                        placeholder="Digite sua senha"
                        />
                        <Input
                        title="Confirme sua senha"
                        placeholder="Confirme sua senha"
                        />
                       

                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 40, alignItems: "center" }}><Checkbox /><Text>Concordo com os <Text style={styles.link}>Termos e condicões</Text></Text></View>
                    <TouchableOpacity style={styles.button}>
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
                        <TouchableOpacity>
                            <Text style={{ color: colors.primary }}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.footerCurve} />
        </SafeAreaView>

    );
}