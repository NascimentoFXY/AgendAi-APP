import React, { createContext, useContext, useState, ReactNode, use, useEffect } from 'react';
import { auth, db } from 'services/firebase';
import { AuthContext } from './auth';
import { SalonContext } from './salonContext';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';

export interface ScheduleParams {
    id?: string;
    userId: string;
    salonId: string;
    salonName: string;
    serviceId?: string;
    address: string;
    date: any;
    time: string;
    image?: string;
    status: string;
}
type ScheduleContextType = {
    schedules: ScheduleParams[];
    scheduleData: ScheduleParams;
    createSchedule: (schedule: ScheduleParams) => void;
    confirmActions: (schedule: ScheduleParams) => void;
    cancelSchedule: (schedule: any) => void;
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
            const q = query(collection(db, 'users', user.id, 'schedules'));
            const snapshot = await getDocs(q);
            const fetchedSchedules = snapshot.docs.map(doc => doc.data() as ScheduleParams);
            setSchedules(fetchedSchedules);
            
        } catch (error) {
            console.error("Erro ao buscar agendamentos: ", error);
        }
    };
    useEffect(()=>{
        fetchSchedules(); 
    },[]);
    const confirmActions = (data: ScheduleParams) => {
        try{
            setScheduleData({ ...data });
        }catch(error){
            console.error("Erro ao confirmar agendamento: ", error);
            return null;
        }
    }
    const createSchedule = async (data: ScheduleParams) => {
        const scheduleRef = doc(collection(db, 'users', data.userId, 'schedules'));
        try {
            await setDoc(scheduleRef, {
                ...data,
                image: salon?.image || '',
                id: scheduleRef.id,
                salonId: data.salonId,
                salonName: data.salonName,
                status: 'active'
            });
            fetchSchedules();
            
        } catch (error) {
            console.error("Erro ao criar agendamento: ", error);
        }
    };

    const useSchedule = async (dataID: any) => {
        const snapshot = await getDoc(doc(db, 'users', user?.id!, 'schedules', dataID));
        try{
            if(!snapshot.exists()) return;
            setSchedule(snapshot.data() as ScheduleParams);
            return snapshot.data() as ScheduleParams;
        }catch(error){
            console.error("Erro ao usar agendamento: ", error);
        }
    }

    const cancelSchedule = async (scheduleId: any) => {
        const scheduleRef = doc(db, 'users', user?.id!, 'schedules', scheduleId.id!);
        try {
            await updateDoc(scheduleRef, {
                status: 'canceled'
            });
            fetchSchedules();
        } catch (error) {
            console.error("Erro ao criar agendamento: ", error);
        }
    };

    return (
        <ScheduleContext.Provider value={{ schedules, createSchedule,cancelSchedule,confirmActions, scheduleData: scheduleData!, useSchedule, schedule: schedule!, fetchSchedules }}>
            {children}
        </ScheduleContext.Provider>
    );
};
export default ScheduleProvider;