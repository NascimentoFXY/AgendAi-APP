import { doc, getDoc } from "@firebase/firestore";
import { db } from "services/firebase";

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

