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
    RefreshControl,
    Modal,
    StyleSheet
} from 'react-native';
import ScheduleHeader from './header';
import { styles } from './style';
import colors, { font } from '../../../configs/theme';
import AgendamentoCard from '../../../components/Salao/AgendamentoCards';
import { ScheduleContext } from 'context/scheduleContext';
import { SalonContext } from 'context/salonContext';
import Icon from 'configs/icons';
import { formatCurrency } from 'configs/utils';


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
    const [modalVisible, setModalVisible] = useState(false)
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
        if (!updateNotification) return
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
                                idServico={"#" + item.id + " I: " + index}
                                titulo={item.salonName}
                                tipoAgendamento={item.status as 'active' | 'done' | 'canceled'}
                                endereco={item.address}
                                data={item.date.split("|")[1]}
                                hora={item.time}
                                lembreteAtivo={item.showNotification}
                                onLembreteChange={(newValue) => handleSwitchChange(item.id!, newValue)}
                                onVisaoGeral={async () => {
                                    try {
                                        await useSchedule(item.id).then((res) => {
                                            console.log("Schedule usado: ", res?.salonName);
                                            setModalVisible(true)
                                        }).catch((error) => {
                                            console.error("Erro ao usar agendamento: ", error);
                                        });
                                    }
                                    catch (error) {
                                        console.error("Erro ao navegar para cancelar agendamento: ", error);
                                    }
                                }}
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
                                idServico={"#" + item.id + " I:" + index}
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
                                            setModalVisible(true)
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
                                idServico={"#" + item.id + " I:" + index}
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

            {/* MODAL */}
            <Modal visible={modalVisible} transparent onDismiss={() => setModalVisible(false)}

            >

                <View style={{ backgroundColor: colors.white, elevation: 2, borderRadius: 20, margin: "auto", width: "70%", padding: 10, }}>
                    {/* HEADER */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                        <View style={{ width: 40, aspectRatio: 1 / 1 }} />
                        <Text style={{ fontFamily: font.poppins.semibold }}>Visão Geral</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Icon.Ionicons name='close-circle-outline' color={colors.primary} size={40} />
                        </TouchableOpacity>
                    </View>
                    {/* Conteudo  */}
                    <View style={{ gap: 10 }}>
                        <View style={modal.item}>
                            <Text style={modal.title}>Estabelecimento: </Text>
                            <Text style={modal.text}>{schedule && schedule.salonName || "undefined"}</Text>

                        </View>

                        {schedule && schedule.status != "done" &&
                            <View>
                                <View style={modal.item}>
                                    <Text style={modal.title}>Data: </Text>
                                    <Text style={modal.text}>{schedule && schedule.date.split("|")[1] || "undefined"}</Text>
                                </View>

                                <View style={modal.item}>
                                    <Text style={modal.title}>Horário: </Text>
                                    <Text style={modal.text} numberOfLines={2}>{schedule && schedule.time || "undefined"}</Text>
                                </View>
                            </View> 
                        }



                        <View style={modal.item}>
                            <Text style={modal.title}>Serviço: </Text>
                            <Text style={modal.text}>{schedule && schedule.service.itemName || "undefined"}</Text>

                        </View>

                        <View style={modal.item}>
                            <Text style={modal.title}>Profissional: </Text>
                            <Text style={modal.text}>{schedule && schedule.specialist.name || "undefined"}</Text>
                        </View>

                        <View style={modal.item}>
                            <Text style={modal.title}>Endereço: </Text>
                            <Text style={modal.text}>{schedule && schedule.address || "undefined"}</Text>
                        </View>

                        <View style={modal.item}>
                            <Text style={modal.title}>Valor Total: </Text>
                            <Text style={modal.text}>{schedule && formatCurrency(schedule.service.itemPrice) || "undefined"}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: colors.primary, padding: 5, borderRadius: 20 }}
                            onPress={() => { loadSalon(schedule.salonId); navigation.navigate("Home", { screen: "Salao" }); setModalVisible(false) }}>
                            <Text style={{ textAlign: "center", fontFamily: font.poppins.regular, color: colors.white }}>Ir para o Estabelecimento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const modal = StyleSheet.create({
    item: {
        flexDirection: "row",
        padding: 2
    },
    title: {
        fontFamily: font.poppins.semibold,
    },
    text: {
        fontFamily: font.poppins.regular,
        flexShrink: 1,
    }
})