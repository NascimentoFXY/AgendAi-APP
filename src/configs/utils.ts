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