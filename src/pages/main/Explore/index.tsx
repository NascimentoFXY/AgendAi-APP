import Carroussel from 'components/homeScreenComponents/carroussel';
import Icon from 'configs/icons';
import colors, { font } from 'configs/theme';
import { AuthContext } from 'context/auth';
import { SalonContext } from 'context/salonContext';
import { useUserLocation } from 'context/userLocation';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getCoordinates } from 'services/geocodeAPI';

interface Salon {
    id?: string
    CNPJ: string,
    owner: string,
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

}
export default function Explore({ navigation }: any) {
    const {location, setLocation} = useUserLocation();
    const userLocation = {
        latitude: location?.coords.latitude || -23.55052,
        longitude: location?.coords.longitude || -46.633308,
    }
    
    const { user } = useContext(AuthContext)!
    const [selectedMarker, setSelectedMarker] = useState<Salon | null>(null);
    const { salon, salonList, getAverageRating, useSalon } = useContext(SalonContext)!
    const [markers, setMarkers] = useState<Salon[]>([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            if (!salonList) return;

            const newMarkers: Salon[] = [];
            for (const salon of salonList) {
                if (salon.addres) {
                    const coords = await getCoordinates(salon.addres);
                    if (coords) {
                        newMarkers.push({
                            ...coords,
                            name: salon.name,
                            id: salon.id,
                            CNPJ: salon.CNPJ,
                            owner: salon.owner,
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
                        });
                    }
                }
            }
            setMarkers(newMarkers);
        };

        fetchMarkers();
    }, [salonList]);

    const handleMarkerPress = (marker: Salon) => {
        setSelectedMarker(marker);
    };
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                followsUserLocation={true}
                showsUserLocation={true}
                showsMyLocationButton={true}
                
                initialRegion={{
                    latitude: userLocation.latitude, 
                    longitude: userLocation.longitude,

                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >

                {markers.map((marker, index) => (
                    <Marker
                        onPress={() => handleMarkerPress(marker)}
                        key={index}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.title}
                        description={marker.addres}
                        pinColor={colors.primary}
                        

                    />
                ))}
            </MapView>

            {/* Modal */}
            <ScrollView style={{ position: 'absolute', bottom: 20, paddingHorizontal: 20 }} horizontal contentContainerStyle={{ gap: 10 }}>
                {salonList?.map((salon, index) => (
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        useSalon(salon.id!);
                        navigation.navigate("Home", { screen: "Salao" });
                    }}
                    style={{ backgroundColor: colors.background, width: 300, height: 200, borderRadius: 10, overflow: 'hidden' }} key={index}>
                        <Image source={{ uri: salon.image }} style={{ width: '100%', height: 100, backgroundColor: colors.lightGray }} />
                        <View style={{ borderRadius: 20, marginTop: -20, padding: 10, height: "100%", backgroundColor: colors.background }}>
                            <Text style={{ fontFamily: font.poppins.bold }}> {salon.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                                <Icon.MaterialIcons name='location-pin' color={colors.primary} size={20} />
                                <Text style={{ fontFamily: font.poppins.regular }}>{`${salon.addres?.split(",")[0]}, ${salon.addres?.split(",")[3]}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 5 }}>
                            <Text>5.0 (2k+ avaliações)</Text>

                                <Icon.Ionicons name='star' color={colors.primary} size={15} />
                                <Icon.Ionicons name='star' color={colors.primary} size={15} />
                                <Icon.Ionicons name='star' color={colors.primary} size={15} />
                                <Icon.Ionicons name='star' color={colors.primary} size={15} />
                                <Icon.Ionicons name='star' color={colors.primary} size={15} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

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
});
