import { Input } from 'components/input';
import Icon from 'configs/icons';
import colors, { font } from 'configs/theme';
import { AuthContext } from 'context/auth';
import { useUserLocation } from 'context/userLocation';
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Modal
} from 'react-native';

interface Address {
    id: string;
    formattedAddress: string;
    latitude: number;
    longitude: number;
}

const ResultCard = ({ address, onPress }: { address: Address, onPress: (address: Address) => void }) => {
    return (
        <TouchableOpacity onPress={() => onPress(address)}>
            <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                    <Icon.Entypo name="location-pin" color={colors.primary} size={30} />
                    <Text style={styles.resultCity}>{address.formattedAddress}</Text>
                </View>
                <Text numberOfLines={1} style={styles.resultAddress}>
                    {address.latitude.toFixed(5)}, {address.longitude.toFixed(5)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Location({navigation}: any) {

    const [textValue, setTextValue] = useState('');
    const [results, setResults] = useState<Address[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { setLocation, getCurrentLocation } = useUserLocation();
    const searchAddresses = async (text: string) => {
        setTextValue(text);
        if (!text) return setResults([]);

        try {
            const apiKey = 'AIzaSyDa-bdUYrEY94QiQ8RVqLlcHK7HNRhSSz0';
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(text)}&key=${apiKey}`
            );
            const data = await response.json();
            const result = data.results[0];
            const components = result.address_components;

            // 🔹 Extrai a cidade
            const cityComponent = components.find((c: any) =>
                c.types.includes("administrative_area_level_2")
            );
            const city = cityComponent ? cityComponent.long_name : "Cidade não encontrada";

            // 🔹 Extrai o CEP
            const cepComponent = components.find((c: any) =>
                c.types.includes("postal_code")
            );
            const cep = cepComponent ? cepComponent.long_name : "CEP não encontrado";


            if (data.status === 'OK') {
                const addresses: Address[] = data.results.map((item: any) => ({
                    id: item.place_id,
                    formattedAddress: item.formatted_address,
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng,
                }));
                setResults(addresses);
                return {
                    cidade: city,
                    cep,
                    formattedAddress: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                };

            } else {
                setResults([]);
                return null
            }
        } catch (error) {
            console.error('Erro ao buscar endereços:', error);
            setResults([]);
        }
    };

    const handleSelectAddress = (address: Address) => {
        setLocation({ latitude: address.latitude, longitude: address.longitude });
        searchAddresses(address.formattedAddress)
        setModalVisible(true)

    };

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.alertBox}>
                        <Text style={styles.title}>Localização definida!</Text>


                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => {setModalVisible(false), navigation.replace("Home")}}
                        >
                            <Text style={styles.okText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Insira sua localização</Text>

                <View style={styles.textInputContainer}>
                    <Icon.Ionicons name='search' size={20} color={colors.lightGray} />
                    <TextInput
                        style={{ flex: 1 }}
                        onChangeText={searchAddresses}
                        value={textValue}
                        placeholder='Endereço, CEP ou cidade'
                    />
                    {textValue.length > 0 && (
                        <TouchableOpacity onPress={() => { setTextValue(''); setResults([]); }}>
                            <Icon.MaterialIcons name='delete' size={20} color={colors.lightGray} />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20 }}
                    onPress={async () => {
                        await getCurrentLocation().then((res) => {
                            searchAddresses(`${res.latitude}, ${res.longitude}`)
                        })
                    }}
                >
                    <Icon.Entypo name="location-pin" color={colors.primary} size={30} />
                    <Text>Usar minha localização atual</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ marginBottom: 10 }}>Resultados</Text>

            <FlatList
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ResultCard address={item} onPress={handleSelectAddress} />}
                ListEmptyComponent={() => textValue.length > 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum endereço encontrado</Text>
                ) : null}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        marginBottom: 10
    },
    headerTitle: {
        fontFamily: font.poppins.bold,
        textAlign: "center",
        marginBottom: 10
    },
    textInputContainer: {
        width: "100%",
        backgroundColor: colors.background,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        borderColor: colors.transparentLightGray,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    resultCard: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: colors.lightGray
    },
    resultHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    resultCity: {
        fontFamily: font.poppins.regular,
        marginLeft: 5
    },
    resultAddress: {
        fontFamily: font.poppins.medium,
        color: colors.lightGray
    },
    button: { backgroundColor: "#4A90E2", padding: 10, borderRadius: 8 },
    buttonText: { color: "#fff", fontSize: 16 },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    alertBox: {
        backgroundColor: "#fff",
        width: 280,
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        elevation: 5,
    },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    message: { fontSize: 16, textAlign: "center", marginBottom: 20 },
    okButton: {
        backgroundColor:colors.primary,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
    },
    okText: { color: "#fff", fontWeight: "600" },
});
