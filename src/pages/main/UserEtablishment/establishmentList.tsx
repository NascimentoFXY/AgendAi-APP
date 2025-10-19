import CustomButton from 'components/customButton';
import UserOptions from 'components/perfil/options/userProfile';
import Icon from 'configs/icons';
import colors from 'configs/theme';
import { useAuthContext } from 'context/auth';
import { useSalonContext } from 'context/salonContext';
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Dimensions
} from 'react-native';
import { styles } from '../home/style';
import { LinearGradient } from 'expo-linear-gradient';
export default function UserEstablishment({ navigation }: any) {

    const { isOwner, salonList, useSalon } = useSalonContext()!;
    const { user } = useAuthContext()!;
    const TopSaloesCardsData = ({ rating, name, salonId, image }: any) => {
        return (
            <TouchableOpacity onPress={() => (navigation.navigate("EstablishmentTools"), useSalon(salonId))} >
                <View

                    style={styles.SaloesCards}>
                    <Image source={{ uri: image }} style={{ resizeMode: "cover", position: "absolute", width: "100%", height: "100%" }} />


                    <View style={styles.saloesHeart}>
                        <Icon.FontAwesome5 name='heart' size={30} />
                    </View>

                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', '#000000ff']} // degrade roxo > rosa > laranja
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.linearGradient}
                    />

                    <View style={styles.cardBottom}>

                        <View style={styles.saloesRating}>
                            <Icon.MaterialIcons name='star' size={30} />
                            <Text>{rating}</Text>
                        </View>
                        <Text style={styles.cardTitle} numberOfLines={1} lineBreakMode='tail'>{name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


   
    return (
        <SafeAreaView style={stylesLocal.container}>
            {/* HEADER====================================== */}
            <SafeAreaView style={stylesLocal.headerContainer}>
                <CustomButton
                    Icon={<Icon.Ionicons name="arrow-back" size={24} color={colors.lightGray} />}
                    border='Circle'
                    type='absolute'
                    left={20}
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                    onPress={() => navigation.goBack()} />
                <Text style={{ fontWeight: "bold", fontSize: 16, }}> Estabelecimentos</Text>

            </SafeAreaView>
            {/* =============================================== */}


            <UserOptions icon={<Icon.MaterialIcons name='add-box' size={40} color={colors.secondary} />} title={"Cadastrar estabelecimento"}
                rightIcon={<Icon.AntDesign name='right' size={24} color={colors.primary} />}
                style={{
                    backgroundColor: colors.background,
                    borderBottomWidth: 2,
                    borderColor: colors.lightGray
                }}
                titleStyle={{ color: colors.secondary }}
                onPress={() => navigation.navigate("CreateSalon")} />
            <View style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
                {
                    salonList
                        ?.filter(salon => salon.ownerID === user?.id)
                        .map((salon, index) => {
                            return (
                                <TopSaloesCardsData key={salon.id} name={salon.name} rating={5.0} salonId={salon.id} image={salon.image} />
                            )
                        })
                }


            </View>
        </SafeAreaView>
    );
}

const stylesLocal = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    secondaryOptions: {
        backgroundColor: colors.background,
        borderBottomWidth: 2,
        borderColor: colors.lightGray
    },
    headerContainer: {
        height: 100,
        justifyContent: "center",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",

    },
});