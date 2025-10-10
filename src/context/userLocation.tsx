import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import * as Location from 'expo-location';

type Coordinates = {
    latitude: number;
    longitude: number;
};

type UserLocationContextType = {
    location: Coordinates | null;
    getCurrentLocation: () => Promise<any | null>
    setLocation: (location: Coordinates | { useCurrent: true }) => Promise<void>;
    searchAddresses: (addres: string) => Promise<Address | null>

};
type Address = {
    cidade?: any,
    cep?: any,
    formattedAddress?: any,
    latitude?: any,
    longitude?: any,
    bairro?: any
};

const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const UserLocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocationState] = useState<Coordinates | null>(null);
    const [fullLocation, setFullLocation] = useState<Address | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const searchAddresses = async (addres: string) => {
        try {
            const apiKey = 'AIzaSyDa-bdUYrEY94QiQ8RVqLlcHK7HNRhSSz0';
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addres)}&key=${apiKey}`
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
            const bairroComponent = components.find((c: any) =>
                c.types.includes("sublocality") || c.types.includes("sublocality_level_1")
            );
            const bairro = bairroComponent ? bairroComponent.long_name : "Bairro não encontrado";
            const cep = cepComponent ? cepComponent.long_name : "CEP não encontrado";

            if (data.status === 'OK') {
                return {
                    cidade: city,
                    cep,
                    formattedAddress: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                    bairro: bairro
                };

            } else {

                return null
            }
        } catch (error) {
            console.error('Erro ao buscar endereços:', error);
        }
    };
    async function getCurrentLocation() {

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de acesso negada.');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});

            const coords = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            };
            setLocationState(coords);
            return coords
        }
        catch (er) {

        }
    };
    // Função para setar localização manual ou via GPS
    const setLocation = async (loc: Coordinates | { useCurrent: true }) => {
        if ('useCurrent' in loc && loc.useCurrent) {
            await getCurrentLocation();
        } else {
            setLocationState(loc as Coordinates);
            console.log(loc)
        }
    };

    // Pega localização do usuário assim que o app inicia
    // useEffect(() => {
    //     getCurrentLocation();
    // }, []);
    return (
        <UserLocationContext.Provider value={{ location, setLocation, getCurrentLocation, searchAddresses }}>
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocation = () => {
    const context = useContext(UserLocationContext);
    if (!context) {
        throw new Error('useUserLocation must be used within a UserLocationProvider');
    }
    return context;
};