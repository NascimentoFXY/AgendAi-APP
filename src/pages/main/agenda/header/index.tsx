import React, { useRef, useState } from 'react';
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
    ScrollViewProps
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../style';
import CustomButton from '../../../../components/customButton';
import colors from '../../../../configs/colors';

const { width } = Dimensions.get("window");
export default function ScheduleHeader({ navigation, ref }: any) {

    const [currentPage, setCurrentPage] = useState(0)

    const pages = [0, 1, 2]

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // função chamada quando o usuário arrasta o dedo na tela (scroll)
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);

        // calcula em qual pagina o usuário está com base na posição horizontal
        setCurrentPage(pageIndex);
        // atualiza a página atual
    };
    const scrollToPage = (pageIndex: number) => {
        // Verifica se o índice da página é válido e se a referência da rolagem existe
        if (pageIndex >= 0 && pageIndex < pages.length && ref.current) {
            ref.current.scrollTo({ x: width * pageIndex, animated: true });
        } else {

            console.warn(`Página com índice ${pageIndex} não encontrada.`);
        }
    };
    return (
        <>
            <SafeAreaView style={styles.headerContainer}>
                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={colors.lightGray} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ fontWeight: "bold", fontSize: 16 }}> Agendamentos</Text>
                <CustomButton
                    Icon={<Ionicons name="search" size={24} color={colors.lightGray} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: "#ffffff00", borderWidth: 1, borderColor: colors.lightGray }}

                />
            </SafeAreaView>
            <View>
                <View
                    style={styles.NavigationOptions}


                >

                    <TouchableOpacity
                        style={styles.headerNavigationOptions}
                        onPress={() => scrollToPage(0)}>

                        <Text style={[styles.NavigationOptionsText, currentPage === 0 ? { color: colors.primary } : styles.NavigationOptionsText]}>  Proximos</Text>
                        <View style={currentPage === 0 ? styles.underline : styles.none} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.headerNavigationOptions}
                        onPress={() => scrollToPage(1)}>

                        <Text style={[styles.NavigationOptionsText, currentPage === 1 ? { color: colors.primary } : styles.NavigationOptionsText]}>Concluidos</Text>
                        <View style={currentPage === 1 ? styles.underline : styles.none} />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.headerNavigationOptions}
                        onPress={() => scrollToPage(2)}>

                        <Text style={[styles.NavigationOptionsText, currentPage === 2 ? { color: colors.primary } : styles.NavigationOptionsText]}>Cancelados</Text>
                        <View style={currentPage === 2 ? styles.underline : styles.none} />
                    </TouchableOpacity>

                </View>
            </View>

        </>
    )
}