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

};


const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const UserLocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocationState] = useState<Coordinates | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
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
        <UserLocationContext.Provider value={{ location, setLocation, getCurrentLocation }}>
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