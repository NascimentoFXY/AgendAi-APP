import { ActivityIndicator, Button, Dimensions, PixelRatio, StyleSheet, View, Text } from 'react-native';

import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { db } from "services/firebase";
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export async function findUserImage(userId: string) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // Pega apenas o campo "image"
            const image = userSnap.data().image;
            return image || null; // retorna null se não tiver imagem
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar imagem do usuário:", error);
        return null;
    }
}

import { Timestamp } from "firebase/firestore";
import { Modal } from "react-native";
import React, { useState } from 'react';
import { User } from 'context/auth';
import colors, { font } from './theme';

interface FormattedDate {
    display: string; // ex: "Hoje 14:35", "Ontem 13:20" ou "12/10/2025 15:00"
    time: string;    // ex: "14:35"
    date: string;    // ex: "12/10/2025"
}

export const formatFirestoreTimestamp = (timestamp: Timestamp | string | number): FormattedDate => {
    let dateObj: Date;
    if (timestamp instanceof Timestamp) {
        dateObj = timestamp.toDate(); // converte para Date local
    } else {
        dateObj = new Date(timestamp);
    }

    // Hora local formatada
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    // Verifica hoje / ontem
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isToday =
        now.getDate() === day &&
        now.getMonth() === dateObj.getMonth() &&
        now.getFullYear() === year;

    const isYesterday =
        yesterday.getDate() === day &&
        yesterday.getMonth() === dateObj.getMonth() &&
        yesterday.getFullYear() === year;

    const display = isToday
        ? `Hoje ${formattedTime}`
        : isYesterday
            ? `Ontem ${formattedTime}`
            : `${formattedDate} ${formattedTime}`;

    return {
        display,
        time: formattedTime,
        date: formattedDate,
    };
};

export function isCNPJValid(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != parseInt(digitos.charAt(1))) return false;

    return true;
}

export function formatCNPJ(cnpj: string) {
    return cnpj
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .slice(0, 18);
}

export const getInitials = (fullName: string): string => {
    // Se não houver nome, retorna uma string vazia para evitar erros
    if (!fullName) {
        return '';
    }
    //ex: Joao Silva -> "JS"
    const names = fullName.split(' ');

    // Pega a primeira letra da primeira palavra
    // Ex: "João" -> "J"
    let initials = names[0][0] || '';

    // Se houver mais de uma palavra no nome (ex: nome e sobrenome)...
    if (names.length > 1) {
        // ...pega a primeira letra da última palavra (o sobrenome)
        // Ex: "Silva" -> "S"
        initials += names[names.length - 1][0] || '';
    }

    // Converte as iniciais para maiúsculas e retorna
    // Ex: "JS"
    return initials.toUpperCase();
};

export async function getUserByEmail(email: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        alert("Usuário não encontrado! Verifique todos os campos");
        return;
    }

    // como o email é único, podemos pegar o primeiro documento
    const userDoc = querySnapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() } as User
    return user;
}
export async function getUserByName(name: string) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        alert("Usuário não encontrado! Verifique todos os campos");
        return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
}



// Baseado em um layout padrão (ex: iPhone 11 = 375px de largura)
const scale = SCREEN_WIDTH / 375;

export function normalizeSize(size: number) {
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export async function sendNotification(
    userID: string,
    data: { sender?: string, texto: string; action: string }
) {
    try {

        const notificationsRef = collection(db, "users", userID, "notifications");


        await addDoc(notificationsRef, {
            texto: data.texto,
            action: data.action,
            createdAt: new Date(),
            read: false,
        });

        console.log("✅ Notificação enviada com sucesso!");
        return { success: true };
    } catch (error) {
        console.error("Erro ao enviar notificação:", error);
        return { success: false, error };
    }
}

export function capitalizeFirstLetter(string: string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const LoadingModal: React.FC<{ loading: boolean, text?: string }> = ({ loading, text }) => {
    return (
        <>
            <Modal visible={loading} transparent animationType='fade'>
                <View  style={{ flex: 1, backgroundColor: "#ffffff27", alignItems: "center", justifyContent: "center" }} >

                    <ActivityIndicator size={60} color={colors.primary}/>
                    <Text style={{ fontSize: 20, color: "#000000ff", fontFamily: font.poppins.semibold }}>{text}</Text>
                </View>


            </Modal>
        </>
    )
}

export function formatCurrency(value: number | string) {
  const number = Number(value);
  if (isNaN(number)) return "R$ 0,00";

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}