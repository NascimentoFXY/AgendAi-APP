import React, { use, useContext, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    RefreshControl
} from 'react-native';
import ScheduleHeader from './header';
import { styles } from './style';
import colors from '../../../configs/theme';
import AgendamentoCard from '../../../components/Salao/AgendamentoCards';
import { ScheduleContext } from 'context/scheduleContext';
import { SalonContext } from 'context/salonContext';


const InitialMockData = [
    {
        data: '17 de Maio, 2025',
        hora: '07:00',
        lembreteAtivo: true,
        titulo: 'La mar',
        endereco: 'Rua Euclides Zalga, Endereço 0293',
        idServico: '#29820840',
        tipoAgendamento: 'proximo',
    },
    {
        data: '20 de Maio, 2025',
        hora: '10:00',
        lembreteAtivo: false,
        titulo: 'Corte de Cabelo',
        endereco: 'Av. Paulista, 1000',
        idServico: '#29820841',
        tipoAgendamento: 'proximo'
    },
];

const { width } = Dimensions.get("window");


export default function Agenda({ showHeader = true, navigation }: { showHeader?: boolean, navigation?: any }) {
    const { createSchedule, schedules, schedule, useSchedule, cancelSchedule, fetchSchedules, updateNotification } = useContext(ScheduleContext)!;
    const { loadSalon, salon } = useContext(SalonContext)!

    const [refreshing, setRefreshing] = useState(false);

    const scrollRef = useRef<ScrollView>(null);

    const [currentPage, setCurrentPage] = useState(0);

    // pega a ref da scroll view e aplica a função handleScroll no onScroll da referência
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        // função chamada quando o usuário arrasta o dedo na tela (scroll)
        const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);

        // calcula em qual pagina o usuário está com base na posição horizontal
        setCurrentPage(pageIndex);
        // atualiza a página atual
    };

    const pages = [0, 1, 2]

    const scrollToPage = (pageIndex: number) => {
        // Verifica se o índice da página é válido e se a referência da rolagem existe
        if (pageIndex >= 0 && pageIndex < pages.length && scrollRef.current) {
            scrollRef.current.scrollTo({ x: width * pageIndex, animated: true });
        } else {

            console.warn(`Página com índice ${pageIndex} não encontrada.`);
        }
    };
    const [agendameto, setAgendamento] = useState(schedules); // Mock data para agendamentos

    const handleSwitchChange = async (id: string, newValue: boolean) => {
        if (!agendameto) return;
        const updatedAgendamento = [...agendameto]; //pega o array e 'clona'
        updatedAgendamento
        if(!updateNotification) return
        await updateNotification(newValue, id)
        setAgendamento(updatedAgendamento)

    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchSchedules && fetchSchedules();
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);
    useEffect(() => {

        onRefresh();

    }, [agendameto]);
    return (
        <View style={{ flex: 1 }}>
            {/* ========HEADER=================== */}
            {showHeader && <SafeAreaView style={{ zIndex: 2 }}>
                <ScheduleHeader navigation={navigation} currentPage={currentPage} scrollToPage={scrollToPage} />
            </SafeAreaView>}
            {/* ================================== */}


            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={scrollRef} onScroll={handleScroll} >

                <ScrollView style={{ width: width }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    } >
                    {/* ==============================PRÓXIMOS ======================================== */}
                    {schedules.filter((item) => item.status === "active").map((item, index) => {
                        return (
                            // console.log("Schedule item:", JSON.stringify(item, null, 2)),

                            <AgendamentoCard
                                key={item.id}
                                imagem={item.image}
                                idServico={"#" + item.id + " I: "+ index}
                                titulo={item.salonName}
                                tipoAgendamento={item.status as 'active' | 'done' | 'canceled'}
                                endereco={item.address}
                                data={item.date.split("|")[1]}
                                hora={item.time}
                                lembreteAtivo={item.showNotification}
                                onLembreteChange={(newValue) => handleSwitchChange(item.id!, newValue)}
                                onPress={async () => {

                                    try {

                                        await useSchedule(item.id).then((res) => {
                                            console.log("Schedule usado: ", res?.id);
                                            navigation.navigate("Home", { screen: "ScheduleCancelScreen" });
                                        }).catch((error) => {
                                            console.error("Erro ao usar agendamento: ", error);
                                        });
                                    }
                                    catch (error) {
                                        console.error("Erro ao navegar para cancelar agendamento: ", error);
                                    }
                                }
                                }
                            />
                        )
                    })}
                </ScrollView>
                <ScrollView style={{ width: width }} >
                    {/* ==============================CONCLUÍDOS======================================== */}
                    {schedules
                        .filter((item) => item.status === "done")
                        .map((item, index) => (
                            <AgendamentoCard
                                key={item.id}
                                idServico={"#" + item.id + " I:"+ index}
                                titulo={item.salonName}
                                imagem={item.image}
                                tipoAgendamento={item.status as 'active' | 'done' | 'canceled'}
                                endereco={item.address}
                                data={item.date.split("|")[1]}
                                hora={item.time}
                                onPress={async () => {

                                    try {

                                        await useSchedule(item.id).then((res) => {
                                            console.log("Schedule usado: ", res?.salonName);
                                            navigation.navigate("Home", { screen: "ScheduleCancelScreen" });
                                        }).catch((error) => {
                                            console.error("Erro ao usar agendamento: ", error);
                                        });
                                    }
                                    catch (error) {
                                        console.error("Erro ao navegar para cancelar agendamento: ", error);
                                    }
                                }
                                }
                            />
                        ))}
                </ScrollView>
                <ScrollView style={{ width: width }} >
                    {/* ==============================CANCELADOS======================================== */}
                    {schedules
                        .filter((item) => item.status === "canceled")
                        .map((item, index) => (
                            <AgendamentoCard
                                key={item.id}
                                idServico={"#" + item.id + " I:"+ index}
                                titulo={item.salonName}
                                imagem={item.image}
                                tipoAgendamento={item.status as 'active' | 'done' | 'canceled'}
                                endereco={item.address}
                                data={item.date.split("|")[1]}
                                hora={item.time}
                                onPress={async () => {
                                    try {

                                        await useSchedule(item.id).then((res) => {
                                            console.log("Schedule usado: ", res?.salonName);
                                            loadSalon(res?.salonId!);
                                            navigation.navigate("Home", { screen: "Salao" });
                                        }).catch((error) => {
                                            console.error("Erro ao usar agendamento: ", error);
                                        });
                                    }
                                    catch (error) {
                                        console.error("Erro ao navegar para cancelar agendamento: ", error);
                                    }
                                }
                                }
                            />
                        ))}
                </ScrollView>
            </ScrollView>
        </View>
    )
}