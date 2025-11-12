import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Modal
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../../pages/main/home/style';
import CustomButton from '../../../components/customButton';
import InputWithIcons from '../../../components/InputIcons';
import { useUserLocation } from 'context/userLocation';
import { useNotificationContext } from 'context/notificationsContext';
import colors from 'configs/theme';
import Catalogo from 'pages/catalogo/catalogo';


const cardsWidth = 400;


export default function MainHeader({ navigation }: any) {
    const { notificationList } = useNotificationContext()!
    const { searchAddresses, location } = useUserLocation();
    const [cidade, setCidade] = useState()
    const [bairro, setBairro] = useState()
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        setLoadingLocation(true);
        const loadAddress = async () => {
            if (location?.latitude && location?.longitude) {
                try {

                    const res = await searchAddresses(`${location.latitude}, ${location.longitude}`);
                    const first = res[0];
                    if (first) {
                        setCidade(first.cidade);
                        setBairro(first.bairro);
                    }
                    setLoadingLocation(true);
                } catch (er) {
                    console.log("erro localização header", er)
                }
            }
            else {
                setCidade(undefined);
                setBairro(undefined);
                setLoadingLocation(false);
            }
        };

        loadAddress();

    }, [location])
    return (
        <View>

            <View style={styles.header}>
                {/* Linha de cima: localização e sino */}
                <View style={styles.headerTop}>

                    <View>

                        <Text style={{ fontSize: 12, color: '#999' }}>Localização</Text>

                        <TouchableOpacity onPress={() => { navigation.navigate("Location") }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            <Ionicons name="location-sharp" size={24} color="#d77a7a" />

                            <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 4 }}>{cidade || "Selecione sua localização"} - {bairro || null}</Text>

                        </TouchableOpacity>

                    </View>
                    <View>
                        <CustomButton
                            Icon={<Ionicons name="notifications" size={26} color="#6b6b6b" />}
                            style={styles.notificationButton}
                            onPress={() => { navigation.navigate("Notifications") }}
                        />
                        {notificationList!.length > 0 && <View style={{ width: 7, height: 7, borderRadius: 10, backgroundColor: "#ff0000", position: "absolute", right: 6, top: 6 }} />}
                    </View>

                </View>

                {/* Linha de baixo: campo de busca + botão */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <InputWithIcons
                        style={{ flex: 1 }}
                        leftIcon={<Ionicons name='search' size={20} />}
                        placeholder='Pesquisar'
                        onChangeText={(text) => { setIsSearching(!!text.trim()); setSearchValue(text) }}
                    />

                    <CustomButton
                        Icon={<Feather name="sliders" size={18} color="#fff" />}
                        style={styles.filterButton}
                        border='Circle'
                        onPress={() => navigation.navigate("Filter")}
                    />
                </View>
            </View>
            {isSearching &&
                <ScrollView nestedScrollEnabled style={{ backgroundColor: colors.background, flex: 1, zIndex: 2, width: "100%" }}>
                    <Catalogo filtro={searchValue} />
                </ScrollView>
            }


        </View>

    )
}