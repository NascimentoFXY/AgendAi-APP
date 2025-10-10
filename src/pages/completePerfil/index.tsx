import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { StyleSheet } from "react-native";
import colors, { font } from '../../configs/theme';
import Icon from 'configs/icons';
import pickImage from 'configs/pickImage';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import { Input } from "../../components/input";
import CustomButton from "../../components/customButton";
import { db, uploadUserImage } from 'services/firebase';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
export default function CompletePerfil({ navigation }: any) {

    const { user, setComplete, updateUser } = useContext(AuthContext)!;

    const [image, setImage] = React.useState('');
    const updateUserData = async () => {
        try {
            updateUser({
                image: await uploadUserImage(image, user?.id!),
                isComplete: true,
            })
            console.log("tentando atualizar user")
        } catch (er) {
            setComplete(false);
            console.log("erro",er)
        }
    }
    return (
        <SafeAreaView style={styles.mainContainer}>

            <View style={styles.contentContainer}>
                <View style={styles.header}>


                    <Text style={styles.bold}>Complete seu perfil!</Text>
                    <Text style={{ fontSize: 12, marginBottom: 20 }}>Bem vindo(a) {user?.name}! Deixe seu perfil mais atrativo!.</Text>
                    <View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.selectImage}
                            onPress={() => {
                                console.log("apertou o botão")
                                pickImage(1, 1)
                                    .then((res) => {
                                        if (!res) return;
                                        console.log("ID", user?.id)
                                        console.log("imagem selecionada: ", res)
                                        setImage(res)
                                    })
                            }}>

                            {!image && <Icon.FontAwesome5 name='user' size={100} color="#7c7c7cff" style={{ margin: "auto" }} />}
                            {image && (
                                <Image style={{ flex: 1, objectFit: "cover" }} source={{ uri: image }} />
                            )}
                        </TouchableOpacity>
                        <View style={styles.cameraIcon}>
                            <Icon.Entypo name='camera' size={20} color={colors.secondary} />
                        </View>
                    </View>
                </View>
                {/* input area */}
                <View style={{ flex: 1, width: "100%" }}>
                    <TouchableOpacity style={styles.button} onPress={updateUserData}>
                        <Text style={styles.buttonLabel}>Continuar</Text>
                    </TouchableOpacity>
                </View>




            </View>
            <View style={styles.footerCurve} />
        </SafeAreaView>

    );
}

export const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 50,
    },
    cameraIcon: {
        position: "absolute",
        bottom: 0,
        width: 50,
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 100,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonLabel: {
        fontFamily: font.poppins.regular,
        color: colors.white,
        textAlign: "center",
    },
    selectImage: {
        width: 200,
        height: 200,
        backgroundColor: colors.lightGray,
        borderRadius: 1000,

        overflow: "hidden"
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
    },
    header: {
        marginTop: 50,
        width: "100%",
        alignItems: "center",
        flex: 1,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 100,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
        width: "100%",
    },
    bold: {
        fontFamily: font.poppins.bold,
        fontSize: 24,
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
        gap: 12,
    },
    footerCurve: {
        position: "absolute",
        bottom: -50,
        width: "150%",
        height: 150,
        backgroundColor: "#D97171",
        borderTopLeftRadius: "100%",
        borderTopRightRadius: "100%",
    },



});