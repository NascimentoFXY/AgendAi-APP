import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


import AuthProvider, { AuthContext } from 'context/auth';
import ChatProvider from 'context/chatContext';
import SalonProvider from 'context/salonContext';
import ScheduleProvider from 'context/scheduleContext';
import { useContext } from 'react';


import * as Font from "expo-font"
import { useEffect, useState } from 'react';
import { font } from 'configs/theme';
import { UserLocationProvider } from 'context/userLocation';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <UserLocationProvider>
                <SalonProvider>
                    <ScheduleProvider>
                        <ChatProvider>
                            {children}
                        </ChatProvider>
                    </ScheduleProvider>
                </SalonProvider>
            </UserLocationProvider>
        </AuthProvider>
    )
}