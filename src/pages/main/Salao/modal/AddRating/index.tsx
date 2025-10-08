
import React, { useContext, useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ActivityIndicator,
    Image,

} from 'react-native';
import { SalonContext } from '../../../../../context/salonContext';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../style';
import colors, { font } from '../../../../../configs/theme'
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services';
import SalaoEspecialistas from '../../Especialistas';
import CustomButton from '../../../../../components/customButton';
import Icon from '../../../../../configs/icons';
import TabBarButton from '../../../../../components/TabBar';
import { Rating } from '../../../../../context/salonContext';
import { AuthContext } from '../../../../../context/auth';
import pickImage from 'configs/pickImage';
const { width } = Dimensions.get("window")
//tela principal ao apertar em um salão
export default function AddRating({ navigation }: any) {
    const { salon, loading, addRatingToSalon } = useContext(SalonContext)!
    const [rating, setRating] = useState<Rating>()
    const { user } = useContext(AuthContext)!
    // console.log("renderizou tela add avaliação")

    function sendAllData(){
        if(rating?.value){
            const data: Rating ={
                ...rating,
                image: rating?.image || null,
                comment: rating?.comment || "",
                sender: user?.id
            }
            addRatingToSalon(data)
            navigation.goBack()
        }
    }
    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                {/* IMagem */}
                <View style={styles.SalaoImagem}>
                    <Image source={{ uri: salon?.image }} style={{ width: "100%", height: "100%" }} />
                    <CustomButton
                        Icon={<Ionicons name="arrow-back" size={24} color="white" />}
                        border='Circle'
                        type='absolute'
                        width={50}
                        height={50}
                        style={{ zIndex: 3, backgroundColor: "#ffffff90", borderWidth: 1, borderColor: "#ffffff99" }}
                        onPress={() => navigation.goBack()}
                    />

                </View>
                {/* -------------------- */}


                <View style={styles.modalContainer}>

                    <View style={styles.SalaoInfoText}>
                        <Text style={styles.SalaoNome}>{salon?.name}</Text>
                        <Text style={styles.SalaoSubTitle}>{salon?.description}</Text>
                    </View>

                    <View style={styles.SalaoLocContainer}>
                        <View style={styles.SalaoLocText}><MaterialIcons name='location-on' size={20} color={colors.primary} /><Text> {salon?.addres}</Text></View>
                        <View style={styles.SalaoLocText}><FontAwesome5 name='clock' size={20} color={colors.primary} /><Text>Opera entre | {salon?.opHour}</Text></View>
                    </View>
                    <View style={styles.SalaoContacts}>


                        <ServicesCards
                            icon={<MaterialCommunityIcons name='web' size={20} color={colors.secondary} />}
                            text='Websites'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false}

                        />
                        <ServicesCards
                            icon={<MaterialIcons name='contacts' size={20} color={colors.secondary} />}
                            text='Contato'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Ionicons name='call' size={20} color={colors.secondary} />}
                            text='Ligar'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Entypo name='map' size={20} color={colors.secondary} />}
                            text='Direção'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />
                        <ServicesCards
                            icon={<Entypo name='share' size={20} color={colors.secondary} />}
                            text='Share'
                            width={70}
                            iconRadius={55}
                            height={100}
                            textSize={15}
                            bold={false} />

                    </View>




                </View>
                <View style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 50, borderBottomWidth: 1, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
                    <Text style={{ fontSize: 20, fontFamily: font.poppins.bold }}>Sua avaliação final desse serviço</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <TouchableOpacity onPress={() => setRating(prev => ({ ...prev as any, value: 1 }))}>
                            <Icon.AntDesign name='star' size={40} color={rating?.value >= 1 ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setRating(prev => ({ ...prev as any, value: 2 }))}>
                            <Icon.AntDesign name='star' size={40} color={rating?.value >= 2 ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setRating(prev => ({ ...prev as any, value: 3 }))}>
                            <Icon.AntDesign name='star' size={40} color={rating?.value >= 3 ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setRating(prev => ({ ...prev as any, value: 4 }))}>
                            <Icon.AntDesign name='star' size={40} color={rating?.value >= 4 ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setRating(prev => ({ ...prev as any, value: 5 }))}>
                            <Icon.AntDesign name='star' size={40} color={rating?.value == 5 ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ padding: 20, paddingVertical: 40 }}>
                    <Text style={{ fontFamily: font.poppins.bold, fontSize: 20 }}>Adicione um comentário</Text>
                    <View style={{ padding: 5 }}>

                        <TextInput style={{ backgroundColor: colors.white, borderWidth: 1, borderRadius: 10, borderColor: colors.lightGray, minHeight: 200 }}
                            onChangeText={(text) => {setRating(prev => ({ ...prev as any, comment: text })); console.log(text)}}
                        >
                        </TextInput>

                        <TouchableOpacity
                            style={{ flexDirection: "row", paddingVertical: 40, gap: 20, alignItems: 'center' }}
                            onPress={() => { pickImage().then((uri) => { setRating(prev => ({ ...prev as any, image: uri })) }) }}
                        >
                            <Icon.Entypo name='camera' size={24} /><Text>Adicione uma foto</Text>
                        </TouchableOpacity>
                        <View>
                            {/* Imagem */}
                            <Image source={{ uri: rating?.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TabBarButton title='enviar'
                onPress={sendAllData} />
        </View>
    )
}
