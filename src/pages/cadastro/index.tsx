import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View, Modal
} from "react-native";
import { styles } from "./style";

import colors, { font } from "../../configs/theme";


import { Ionicons, AntDesign } from '@expo/vector-icons'; // Ícone do check
import Checkbox from "../../components/checkbox/checkbox";
import { Input } from "../../components/input";
import CustomButton from "../../components/customButton";
import Icon from "configs/icons";
import { normalizeSize } from "configs/utils";

export default function Cadastro({ navigation }: any) {
    const { register } = useContext(AuthContext)!;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [secureTextEntry1, setSecureTextEntry1] = useState(true)
    const [secureTextEntry2, setSecureTextEntry2] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [enabled, setEnabled] = useState(false)
    const [termos, setTermos] = useState(false)
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

    useEffect(()=>{
        let isEnabled = termos == true && !!confirmPass && !!password && !!confirmPass && !! email && !!name
        setEnabled(isEnabled)
    },[termos, confirmPass,password, email,name])
    return (
        <SafeAreaView style={styles.mainContainer}>

            <CustomButton
                Icon={<AntDesign name="arrow-left" size={24} color={colors.lightGray} />}
                onPress={() => navigation.goBack()}
                style={styles.backButtonContainer}

            />

            <ScrollView style={styles.contentContainer}
                showsVerticalScrollIndicator={true}>
                <View style={styles.header}>

                    <Text style={styles.bold}>Crie sua conta</Text>

                </View>


                <View style={{ width: "100%", height: "auto", marginBottom: 20, }}>

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
                        <Checkbox  onChange={()=>setTermos(!termos)}/>
                        <Text style={[styles.text,]}>Concordo com os </Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}><Text style={[styles.text, styles.link]}>Termos e condições</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity disabled={!enabled} style={[styles.button, !enabled && {backgroundColor: colors.lightGray}]} onPress={handlerRegister}>
                        <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>



                <View style={{ width: "100%", height: "auto", alignItems: "center", justifyContent: "center", marginBottom: 100 }}>


                    <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
                        <Text>Já tem uma conta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ color: colors.primary }}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.footerCurve} />

            <Modal visible={modalVisible} transparent>

                <View style={{ margin: "auto" }}>
                    <TouchableOpacity style={{ width: 30, height: 30,backgroundColor:colors.white, borderRadius:60, borderWidth:1, alignSelf:"flex-end", marginBottom:-15, zIndex:9}} onPress={() => setModalVisible(false)}>
                        <Text style={{ textAlign: "center", margin: "auto" }}>X</Text>
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{paddingVertical:20}} style={{ width: normalizeSize(260), height: "70%", padding: 20, borderRadius: 10, marginVertical: "auto", backgroundColor: colors.white }}>
                        <View >

                            <Text style={{ fontFamily: font.poppins.semibold, textAlign: "center" }}>Termos e condições</Text>
                        </View>
                        <View>
                            <Text>
                                Última atualização: outubro de 2025
                                Bem-vindo(a) ao AgendAí, um aplicativo desenvolvido pela AgendAí Tecnologia e Serviços em Estética LTDA, com sede no Brasil, voltado para o gerenciamento de agendamentos de serviços no setor de estética e bem-estar.
                                Ao acessar ou utilizar o aplicativo, você concorda com os presentes Termos e Condições de Uso. Caso não concorde, recomendamos que não utilize o serviço.
                            </Text>
                            <Text style={styles.termosTitle}>    1. OBJETIVO DO APLICATIVO</Text>
                            <Text> O AgendAí tem como finalidade simplificar o processo de agendamento de serviços em salões de beleza, barbearias, clínicas estéticas e outros estabelecimentos do ramo, conectando profissionais e clientes em uma plataforma moderna, segura e prática.
                                Principais funcionalidades:
                                Criação e gerenciamento de perfis de clientes e profissionais;
                                Marcação, edição e cancelamento de agendamentos;
                                Histórico de serviços realizados;
                                Chat entre cliente e profissional;
                                Envio de lembretes e notificações de agendamentos.
                            </Text>
                            <Text style={styles.termosTitle}>2. ACEITE DOS TERMOS</Text>
                            <Text> Ao criar uma conta no aplicativo, o usuário declara:
                                Ter lido, compreendido e aceitado integralmente estes Termos e Condições;
                                Ser maior de 18 anos ou estar devidamente autorizado(a) por seu responsável legal;
                                Concordar com o tratamento dos seus dados pessoais conforme descrito neste documento e na Política de Privacidade.
                            </Text>

                            <Text style={styles.termosTitle}>  3. CADASTRO E CONTA DE USUÁRIO</Text>
                            <Text>Para utilizar o AgendAí, o usuário deve criar uma conta, informando dados pessoais como nome, e-mail e telefone.
                                O usuário é responsável por:
                                Garantir que as informações cadastradas sejam verdadeiras e atualizadas;
                                Manter a confidencialidade de seu login e senha;
                                Notificar imediatamente o AgendAí sobre qualquer uso não autorizado da conta.
                                A empresa não se responsabiliza por prejuízos decorrentes do uso indevido da conta por terceiros.</Text>

                            <Text style={styles.termosTitle}> 4. DIREITOS E RESPONSABILIDADES DOS USUÁRIOS</Text>
                            <Text style={styles.termosSubTitle}>4.1. Clientes:</Text>
                            <Text> Podem realizar, reagendar e cancelar serviços conforme as políticas de cada profissional;
                                Devem respeitar os horários e regras definidas pelos prestadores de serviço;
                                Não devem utilizar a plataforma para fins ilegais, ofensivos ou fraudulentos.</Text>
                            <Text style={styles.termosSubTitle}> 4.2. Profissionais e estabelecimentos:</Text>
                            <Text> Devem garantir que as informações sobre serviços e valores sejam claras e verídicas;
                                São os únicos responsáveis pela qualidade e execução dos serviços oferecidos;
                                Devem respeitar a privacidade e os dados pessoais dos clientes.
                            </Text>
                            <Text style={styles.termosTitle}>5. RESPONSABILIDADE DO AGENDaÍ</Text>
                            <Text> O AgendAí atua como intermediário tecnológico, não sendo parte na relação contratual entre profissionais e clientes.
                                Assim, a empresa não se responsabiliza por:
                                Qualidade, pontualidade ou execução dos serviços contratados;
                                Eventuais cancelamentos, atrasos ou conflitos entre as partes;
                                Perdas, danos ou prejuízos resultantes de informações incorretas fornecidas pelos usuários.
                            </Text>
                            <Text style={styles.termosTitle}>6. SEGURANÇA E PRIVACIDADE DE DADOS</Text>
                            <Text>  O AgendAí trata as informações dos usuários com segurança, ética e transparência, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
                                Os dados são utilizados somente para finalidades legítimas, como permitir o funcionamento do aplicativo e melhorar a experiência dos usuários.
                                Resumo da Política de Privacidade:
                                Os dados são classificados como públicos, confidenciais ou sensíveis, conforme o nível de proteção;
                                Todos os dados pessoais são protegidos por criptografia e controle de acesso;
                                Dados sensíveis (como histórico de procedimentos ou conversas em chat) só são acessados com consentimento do usuário;
                                Os titulares têm direito de acessar, corrigir, excluir ou revogar o consentimento a qualquer momento;
                                O aplicativo realiza treinamentos internos e varreduras de segurança periódicas para garantir a integridade das informações.
                                Para mais detalhes, consulte a Política de Privacidade completa, disponível no aplicativo.
                            </Text>
                            <Text style={styles.termosTitle}>7. PROPRIEDADE INTELECTUAL</Text>
                            <Text>Todo o conteúdo, design, código e funcionalidades do aplicativo são de propriedade da AgendAí Tecnologia e Serviços em Estética LTDA, sendo proibida qualquer reprodução, cópia, modificação ou distribuição sem autorização prévia e por escrito.</Text>

                            <Text style={styles.termosTitle}>8. SUSPENSÃO OU ENCERRAMENTO DE CONTA</Text>
                            <Text> O AgendAí poderá suspender ou excluir contas de usuários que:
                                violem estes Termos;
                                utilizem o aplicativo para fins ilícitos;
                                causem prejuízos a outros usuários ou à imagem da empresa.
                                O usuário pode encerrar sua conta a qualquer momento, solicitando a exclusão definitiva de seus dados.</Text>

                            <Text style={styles.termosTitle}>9. COMUNICAÇÕES E SUPORTE</Text>
                            <Text>Toda comunicação oficial deve ser feita pelo e - mail:
                                📩 aplicativoagendai @gmail.com
                                As mensagens enviadas pelo aplicativo podem incluir notificações de agendamentos, atualizações e comunicações relacionadas ao uso do serviço.
                            </Text>
                            <Text style={styles.termosTitle}> 10. LIMITAÇÃO DE RESPONSABILIDADE</Text >
                            <Text>O AgendAí não garante a ausência de falhas técnicas, interrupções de serviço ou erros de sistema, embora adote medidas constantes para mantê - lo seguro e funcional.
                                A empresa não se responsabiliza por perdas de lucros, dados ou danos indiretos decorrentes do uso do aplicativo.  </Text>

                            <Text style={styles.termosTitle}> 11. ALTERAÇÕES DOS TERMOS</Text >
                            <Text>Estes Termos podem ser atualizados periodicamente para refletir melhorias, alterações legais ou técnicas.
                                As mudanças entrarão em vigor assim que publicadas no aplicativo.
                                O uso contínuo do serviço após as alterações implica a aceitação dos novos termos.
                            </Text>
                            <Text style={styles.termosTitle} > 12. LEGISLAÇÃO APLICÁVEL E FORO</Text >
                            <Text>Este documento é regido pelas leis da República Federativa do Brasil.
                                Eventuais controvérsias serão resolvidas no foro da comarca de Taboão da Serra - SP, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                                Nosso contato oficial:
                                AgendAí Tecnologia e Serviços em Estética LTDA
                                E - mail: aplicativoagendai @gmail.com
                                Brasil, 2025.</Text >
                        </View >
                    </ScrollView >
                </View >
            </Modal >
        </SafeAreaView >

    );
}