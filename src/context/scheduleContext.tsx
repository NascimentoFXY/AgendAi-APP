import React, { createContext, useContext, useState, ReactNode, use, useEffect } from 'react';
import { auth, db } from 'services/firebase';
import { AuthContext } from './auth';
import { SalonContext } from './salonContext';
import { collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where, writeBatch } from '@firebase/firestore';

export interface ScheduleParams {
    id?: string;
    userId: string;
    salonId: string;
    salonName: string;
    serviceId?: string;
    address: string;
    date: string;
    time: string;
    image?: string;
    userName?: string;
    status: string;
}
type ScheduleContextType = {
    schedules: ScheduleParams[];
    scheduleData: ScheduleParams;
    createSchedule: (schedule: ScheduleParams) => void;
    confirmActions: (schedule: ScheduleParams) => void;
    cancelSchedule: (schedule: any, salonID: string) => void;
    fetchSchedules?: () => void;
    useSchedule: (schedule: any) => Promise<ScheduleParams | undefined>;
    schedule: ScheduleParams;
};
export const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

const ScheduleProvider = ({ children }: { children: ReactNode }) => {
    const [schedules, setSchedules] = useState<ScheduleParams[]>([]);
    const [schedule, setSchedule] = useState<ScheduleParams>();
    const { user } = useContext(AuthContext)!;
    const { salon } = useContext(SalonContext)!;
    const [scheduleData, setScheduleData] = useState<ScheduleParams>();

    const fetchSchedules = async () => {
        if (!user) return;
        // Lógica para buscar agendamentos do usuário
        try {
            const q = query(collection(db, 'users', user.id, 'schedules'), orderBy("date", "asc"));
            const snapshot = await getDocs(q);

            const fetchedSchedules = snapshot.docs.map(doc => doc.data() as ScheduleParams);
            setSchedules(fetchedSchedules);
            // console.log("[schedule]Fetched schedules:", fetchedSchedules);

        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        fetchSchedules();
    }, [user]);


    const confirmActions = (data: ScheduleParams) => {
        try {
            setScheduleData({ ...data });
        } catch (error) {
            console.error("Erro ao confirmar agendamento: ", error);
            return null;
        }
    }

    const createSchedule = async (data: ScheduleParams) => {
        const scheduleRef = doc(collection(db, 'users', data.userId, 'schedules'));
        const salonRef = doc(collection(db, "salon", salon?.id!, "schedules"))

        const batch = writeBatch(db);

        const newScheduleId = doc(collection(db, 'users', data.userId, 'schedules')).id;
        const scheduleRefUser = doc(db, 'users', data.userId, 'schedules', newScheduleId);
        const scheduleRefSalon = doc(db, 'salon', salon?.id!, 'schedules', newScheduleId);
        const scheduleData = {
            ...data,
            image: salon?.image || '',
            id: newScheduleId,
            status: 'active',
            createdAt: new Date(),
        }

        batch.set(scheduleRefUser, scheduleData);
        batch.set(scheduleRefSalon, scheduleData);

        try {
            await batch.commit();
            console.log("[schedule]Agendamento criado nos dois lugares com batch!");
        } catch (err) {
            console.error("Erro ao criar agendamento:", err);
        }
    };

    const useSchedule = async (dataID: any) => {
        const snapshot = await getDoc(doc(db, 'users', user?.id!, 'schedules', dataID));
        try {
            if (!snapshot.exists()) return;
            setSchedule(snapshot.data() as ScheduleParams);
            return snapshot.data() as ScheduleParams;
        } catch (error) {
            console.error("Erro ao usar agendamento: ", error);
        }
    }

    const cancelSchedule = async (scheduleId: any, salonID: string) => {
        if (!user?.id || !salonID || !scheduleId?.id) return;

        const batch = writeBatch(db);

        const userScheduleRef = doc(db, 'users', user.id, 'schedules', scheduleId.id);
        const salonScheduleRef = doc(db, 'salon', salonID, 'schedules', scheduleId.id);

        // Adiciona as atualizações no batch
        batch.update(userScheduleRef, { status: 'canceled' });
        batch.update(salonScheduleRef, { status: 'canceled' });

        try {
            await batch.commit(); // Executa as duas atualizações de uma vez
            fetchSchedules(); // Atualiza o estado local após commit
            console.log("[schedule]Agendamento cancelado com sucesso!");
        } catch (error) {
            console.error("Erro ao cancelar agendamento: ", error);
        }
    };

    return (
        <ScheduleContext.Provider value={{ schedules, createSchedule, cancelSchedule, confirmActions, scheduleData: scheduleData!, useSchedule, schedule: schedule!, fetchSchedules }}>
            {children}
        </ScheduleContext.Provider>
    );
};
export default ScheduleProvider;