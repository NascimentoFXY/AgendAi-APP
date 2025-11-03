import MainHeader from 'components/homeScreenComponents/header';
import Icon from 'configs/icons';
import { useAuthContext } from 'context/auth';
import { useSalonContext } from 'context/salonContext';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
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
    Dimensions,
} from 'react-native';
import { styles } from 'pages/main/home/style';
import colors, { font } from 'configs/theme';
import {useNavigation} from '@react-navigation/native'
import { normalizeSize } from 'configs/utils';
export default function Catalogo() {

    const { user } = useAuthContext()!
    const { salon, salonList, fetchSalons, getAverageRating, loadSalon } = useSalonContext()!


    const [averageRatings, setAverageRatings] = useState<{ [salonId: string]: number }>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAllAverages = async () => {
            if (!salonList || salonList.length === 0) {
                return;
            }
            const ratingsMap: { [salonId: string]: number } = {};

            for (const salon of salonList) {
                if (!getAverageRating) return;
                const avg = await getAverageRating(salon);
                ratingsMap[salon.id!] = avg;
            }

            setAverageRatings(ratingsMap);
            setLoading(false);
        };

        fetchAllAverages();
    }, [salonList]);

    const navigation = useNavigation<any>()

    const TopSaloesCardsData = ({ rating, name, salonId, image, description, address, item }: any) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', gap: 10, margin: 2, paddingVertical: 10, }} onPress={async () => (navigation.navigate("Salao"), await loadSalon(salonId))}>
                <View>
                    <View style={[styles.SaloesCards, { width: 200, height: 120, borderRadius: 10, }]}>
                        <Image source={{ uri: image }} style={{ resizeMode: "cover", position: "absolute", width: "100%", height: "100%" }} />
                    </View>
                </View>
                <View style={{ flexGrow: 1, paddingHorizontal: 4 }}>
                    <Text style={{ fontFamily: font.poppins.bold, fontSize: normalizeSize(18), width: normalizeSize(140) }}>{name}</Text>
                    <Text style={{ fontFamily: font.poppins.regular, flexWrap: "wrap", width: 100, }} lineBreakMode='tail'>{description}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: "auto", alignItems: "center" }}>

                        <Text style={{ fontFamily: font.poppins.regular, marginRight: "auto", fontSize: 10, }}>{address.split(",")[2]}</Text>
                        <Text style={{ fontFamily: font.poppins.regular, marginLeft: "auto" }}>{rating}
                            <Icon.AntDesign name='star' color={colors.primary} /></Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    <Text style={{ fontFamily: font.abrilfatface, fontSize: 20, textAlign: "center", padding: 20 }}>
                        Encontre 
                        novos 
                        lugares
                    </Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Explore")}}>
                        <Text style={{textAlign: "center", color: colors.primary}}>
                            <Icon.Ionicons name="location-sharp"></Icon.Ionicons>
                            Abrir no mapa
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {!loading && salonList?.map((key) => (
                        <TopSaloesCardsData key={key.id} name={key.name} rating={
                            averageRatings[key.id!] === undefined ? (
                                <ActivityIndicator size="small" color={colors.primary} />
                            ) : (
                                (averageRatings[key.id!] ?? 0).toFixed(1)
                            )}
                            salonId={key.id}
                            image={key.image}
                            description={key.description}
                            address={key.addres}
                            item={key}
                        />
                    ))}
                    {loading && <ActivityIndicator size={70} style={{ width: Dimensions.get("window").width, alignItems: "center" }} color={colors.primary} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

