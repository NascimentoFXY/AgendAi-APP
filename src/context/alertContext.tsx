import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import colors, { font } from 'configs/theme';

const { width } = Dimensions.get("window");

interface AlertContextProps {
    showAlert: (message: string, type?: 'success' | 'error' | 'confirm') => Promise<boolean>;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) throw new Error("useAlert must be used within AlertProvider");
    return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<'success' | 'error' | 'confirm'>('success');
    const [confirmResolve, setConfirmResolve] = useState<((value: boolean) => void) | null>(null);

    const showAlert = (msg: string, alertType: 'success' | 'error' | 'confirm' = 'success') => {
        setMessage(msg);
        setType(alertType);
        setVisible(true);

        if(alertType === 'confirm') {
            return new Promise<boolean>((resolve) => setConfirmResolve(() => resolve));
        }

        return Promise.resolve(true);
    };

    const closeAlert = (confirmed = false) => {
        setVisible(false);
        if(confirmResolve) {
            confirmResolve(confirmed);
            setConfirmResolve(null);
        }
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <Modal visible={visible} transparent animationType="fade" onRequestClose={() => closeAlert(false)}>
                <View style={styles.overlay}>
                    <View style={[styles.container, { borderColor: type === 'success' ? colors.primary : 'red' }]}>
                        <Text style={[styles.message, { color: type === 'success' ? colors.primary : 'red' }]}>
                            {message}
                        </Text>
                        {type !== 'confirm' && (
                            <TouchableOpacity style={styles.button} onPress={() => closeAlert()}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        )}
                        {type === 'confirm' && (
                            <View style={{flexDirection: "row", gap: 20}}>
                                <TouchableOpacity style={[styles.button, {backgroundColor: colors.lightGray}]} onPress={() => closeAlert(false)}>
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => closeAlert(true)}>
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </AlertContext.Provider>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(158, 158, 158, 0.37)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        gap: 15,
        borderWidth: 1,
    },
    message: {
        fontFamily: font.poppins.medium,
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: 10,
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontFamily: font.poppins.medium,
        fontSize: 14,
        textAlign: 'center',
    },
});
