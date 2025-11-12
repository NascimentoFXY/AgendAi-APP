import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import perfilOptions from '../../../components/perfil/options';
import UserOptions from '../../../components/perfil/options/userProfile/userOptionsComp';
import colors from '../../../configs/theme';
import { styles } from './style';
import CustomButton from '../../../components/customButton';
import Icon from 'configs/icons';
import { useAlert } from 'context/alertContext';
export default function Perfil({ navigation }: any) {
    const { user, signOut } = useContext(AuthContext)!
    const {showAlert}= useAlert()
    const logoutHandle = async()=>{
        const res = await showAlert("Deseja realmete sair?","confirm")
        if(!res) return;
        signOut();
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER====================================== */}
            <SafeAreaView style={styles.headerContainer}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={colors.lightGray} />}
                    border='Circle'
                    type='absolute'
                    left={20}
                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16, }}> Perfil</Text>

            </SafeAreaView>
            {/* =============================================== */}

            <UserOptions hasImage image={user?.image!} title={user?.name} subTitle={user?.email} onPress={() => navigation.navigate("Home", { screen: "UserProfile" })} />
            {/* Seu Perfil */}
            <UserOptions icon={<FontAwesome5 name='user' size={40} color={colors.secondary} />} title={"seu perfil"}
                onPress={() => navigation.navigate("Home", { screen: "UserProfile" })}
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }} />

            {/* Configurações */}
            <UserOptions icon={<Feather name='settings' size={40} color={colors.secondary} />} title={"Configurações"}
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
                onPress={() => navigation.navigate('Home', { screen: "Settings" })} />
            {/* Salão */}
            <UserOptions icon={<Icon.MaterialIcons name='home-work' size={40} color={colors.secondary} />} title='Seu(s) estabelecimento(s)'
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
                onPress={() => { navigation.navigate("Home", { screen: "UserEstablishment" }) }}
            />
            <UserOptions icon={<Icon.FontAwesome name='credit-card' size={40} color={colors.secondary} />} title='Assinatura'
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
                onPress={() => { navigation.navigate("Home", { screen: "Assinatura" }) }}
            />
            


       
     

            {/* SAIR */}
            <UserOptions icon={<MaterialCommunityIcons name='logout' size={40} color={colors.secondary} />}
                rightIcon={<AntDesign name='right' size={24} color={colors.primary} />}
                title={"Sair"}
                style={styles.secondaryOptions}
                titleStyle={{ color: colors.secondary }}
                onPress={logoutHandle} />
        </SafeAreaView>
    )
}