import CustomButton from 'components/customButton';
import Carroussel from 'components/homeScreenComponents/carroussel';
import Icon from 'configs/icons';
import colors, { font } from 'configs/theme';
import { AuthContext } from 'context/auth';
import { SalonContext } from 'context/salonContext';
import { useUserLocation } from 'context/userLocation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCoordinates } from 'services/geocodeAPI';

interface Salon {
    id?: string
    CNPJ: string,
    ownerID?: string,
    ownerName?: string,
    name: string,
    opHour?: any,
    rating?: any,
    addres?: string,
    description?: string,
    createdAt?: any,
    workSchedule?: any,
    image?: any,
    latitude: number;
    longitude: number;
    title: string;
    distance: any

}
const { width } = Dimensions.get("window");
export default function ExploreWrapper({ navigation }: any) {
    const [refreshKey, setRefreshKey] = useState(0);
    return (
        <View style={{ flex: 1 }}>
            <CustomButton
                Icon={<Icon.AntDesign name='reload' size={20} />}
                type='absolute'
                top={20}
                left={20}
                border='Circle'
                style={{ zIndex: 99, elevation: 2, opacity: 0.8, backgroundColor: colors.background }}
                onPress={() => { setRefreshKey(0); setRefreshKey(refreshKey + 1) }}
            />
            <Explore key={refreshKey} navigation={navigation} />
        </View>
    );
}

export function Explore({ navigation }: any) {
    const { location } = useUserLocation();
    let userLocation = {
        latitude: location?.latitude || -23.55052,
        longitude: location?.longitude || -46.633308,
    }

    const { user, } = useContext(AuthContext)!
    const [selectedMarker, setSelectedMarker] = useState<Salon | null>(null);
    const { salon, salonList, getAverageRating, loadSalon } = useContext(SalonContext)!
    const [markers, setMarkers] = useState<Salon[]>([]);

    const mapRef = useRef<MapView>(null);
    const scrollRef = useRef<FlatList>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [show, setShow] = useState(true)
    const [reload, setReload] = useState(1)

    function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // raio da Terra em km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // em km
        return distance;
    }

    function deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }


    useEffect(() => {
        const fetchMarkers = async () => {
            if (!salonList) return;

            const newMarkers: Salon[] = [];
            for (const salon of salonList) {
                if (salon.addres) {
                    const coords = await getCoordinates(salon.addres);
                    if (coords) {

                        const distance = getDistanceFromLatLonInKm(
                            userLocation.latitude,
                            userLocation.longitude,
                            coords.latitude,
                            coords.longitude
                        );
                        newMarkers.push({
                            ...coords,
                            name: salon.name,
                            id: salon.id,
                            CNPJ: salon.CNPJ,
                            ownerID: salon.ownerID,
                            ownerName: salon.ownerName,
                            opHour: salon.opHour,
                            rating: salon.rating,
                            addres: salon.addres,
                            description: salon.description,
                            createdAt: salon.createdAt,
                            image: salon.image,
                            workSchedule: salon.workSchedule,
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            title: salon.name,
                            distance,
                        });
                        // console.log(newMarkers)
                    }
                }
            }
            newMarkers.sort((a, b) => a.distance - b.distance);

            setMarkers(newMarkers);
        };

        fetchMarkers();
    }, [salonList]);


    const handleMarkerPress = (marker: Salon, index: number) => {
        setSelectedIndex(index);

        // Centraliza o mapa nesse marcador
        mapRef.current?.animateToRegion(
            {
                latitude: marker.latitude,
                longitude: marker.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            },
            350
        );


    };
    return (
        <View style={styles.container}>


            <MapView
                ref={mapRef}
                style={styles.map}
                followsUserLocation={show}
                showsUserLocation={show}
                showsMyLocationButton={show}

                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,

                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >

                {markers.map((marker, index) => (
                    <Marker
                        onPress={() => handleMarkerPress(marker, index)}
                        key={index}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.addres}
                        pinColor={colors.primary}


                    />
                ))}

            </MapView>

            {/* Modal */}

            <FlatList
                horizontal
                data={markers}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollContainer}
                snapToInterval={310} // trava no item
                decelerationRate="fast"
                onScroll={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / (310));
                    if (index !== selectedIndex) {
                        setSelectedIndex(index);
                        const marker = markers[index];
                        if (marker) {
                            mapRef.current?.animateToRegion(
                                {
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                    latitudeDelta: 0.005,
                                    longitudeDelta: 0.005,
                                },
                                350
                            );
                        }
                    }
                }}
                scrollEventThrottle={16}
                renderItem={({ item: salon, index }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            try {
                                handleMarkerPress(markers[index], index);
                            } catch (er) {
                                console.log(er)
                            }

                        }}
                        onLongPress={() => {
                            loadSalon(salon.id!);
                            navigation.navigate("Home", { screen: "Salao" });
                        }}

                        style={[styles.card]}
                    >
                        <Image source={{ uri: salon.image }} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.salonName}>{salon.name}</Text>

                            <View style={styles.locationRow}>
                                <Icon.MaterialIcons name="location-pin" color={colors.primary} size={20} />
                                <Text style={styles.salonAddress}>
                                    {`${salon.addres?.split(",")[0]}, ${salon.addres?.split(",")[3]}`}
                                </Text>
                            </View>

                            <View style={styles.ratingRow}>
                                <Text>5.0 ({ } avaliações)</Text>
                                {[...Array(5)].map((_, i) => (
                                    <Icon.Ionicons key={i} name="star" color={colors.primary} size={15} />
                                ))}
                                <Text>
                                       {salon.distance ? salon.distance.toFixed(1) + " km" : ""}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", gap: 5, alignItems: "center", }}>
                                <Icon.Ionicons name='information-circle' size={15} color={colors.lightGray} />
                                <Text style={{ fontSize: 12, fontFamily: font.poppins.bold, color: colors.lightGray }}>Toque e segure para mais informações.</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    scrollContainer: {
        position: "absolute",
        bottom: 20,
    },
    scrollContent: {
        gap: 10,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: colors.background,
        width: 300,
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: 100,
        backgroundColor: colors.lightGray,
    },
    cardContent: {
        borderRadius: 20,
        marginTop: -20,
        padding: 10,
        height: "100%",
        backgroundColor: colors.background,
    },
    salonName: {
        fontFamily: font.poppins.bold,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 5,
    },
    salonAddress: {
        fontFamily: font.poppins.regular,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        marginTop: 5,
    },
});
