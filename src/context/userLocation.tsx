import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import * as Location from 'expo-location';


type UserLocationContextType = {
    location: Location.LocationObject | null;
    setLocation: (location: Location.LocationObject) => void;
};


const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined);

export const UserLocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    useEffect(() => {
        async function getCurrentLocation() {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();
    }, []);
    return (
        <UserLocationContext.Provider value={{ location, setLocation }}>
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