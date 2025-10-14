import React, { useContext, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { styles } from './style';
import CustomButton from '../../../../components/customButton';
import Icon from '../../../../configs/icons';
import colors, { font } from '../../../../configs/theme';
import Forms from './compontents/forms';
import Info from './compontents/info';
import TabBarButton from '../../../../components/TabBar';
import { SalonContext } from '../../../../context/salonContext';
import { Image } from 'react-native';
import { useState } from 'react';
import pickImage from '../../../../configs/pickImage';



export default function CreateSalon({ navigation }: any) {
    const [image, setImage] = useState<string | null>(null);
    const { createSalon, setData } = useContext(SalonContext)!


    useEffect(() => {
        setData({
            image: image
        })
        console.log("as",image)
    }, [image])



    function Photo() {
       
        return (

            <TouchableOpacity
                style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
                onPress={() => {
                    try {
                        pickImage()
                            .then((uri) => {
                                setImage(uri as string)
                            })
                    } catch (e) {
                        console.log("deu ruim: " + e)
                    }
                }}
                activeOpacity={0.8}
            >
                {image!=undefined || image != null ? (
                    <>
                        <Image
                            source={{ uri: image }}
                            style={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 10, position: "absolute" }}
                        />
                        <View style={{ alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                            <Icon.MaterialIcons name="add-a-photo" size={60} color="#ffffff90" />
                            <Text style={{ textAlign: "center", color: "#ffffff90", fontFamily: font.poppins.bold }}>
                                {`Adicione uma foto de \n destaque para seu salão`}
                            </Text>
                        </View>
                    </>
                ) : (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Icon.MaterialIcons name="add-a-photo" size={60} color="#ffffff90" />
                        <Text style={{ textAlign: "center", color: "#ffffff90", fontFamily: font.poppins.bold }}>
                            {`Adicione uma foto de \n destaque para seu salão`}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

        )
    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.foto}>

                <CustomButton
                    Icon={<Icon.Ionicons name="arrow-back" size={24} color="white" />}
                    border='Circle'
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99", position: "absolute", left: 20 }}
                    onPress={() => navigation.goBack()}
                />
                {/* foto do salao */}
                <Photo />

            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} style={styles.modal} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}

                scrollEventThrottle={16}>
                {/* conteudo */}
                <View style={{ backgroundColor: colors.background }}>

                    <Text style={{ textAlign: "center", fontFamily: font.poppins.bold, fontSize: 25, padding: 20 }}>Cadastre seu Estabelecimento</Text>
                </View>
                <Forms />
                <Info />
            </ScrollView>

            <TabBarButton title='Finalizar' style={{ backgroundColor: "black" }} onPress={async () => {await createSalon() }} />
        </SafeAreaView>
    );
}