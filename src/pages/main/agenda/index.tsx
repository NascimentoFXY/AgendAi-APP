import React, { useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import ScheduleHeader from './header';
import { styles } from './style';
import colors from '../../../configs/colors';
import AgendamentoCard from '../../../components/Salao/AgendamentoCards';


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


export default function Agenda({ navigation }: any) {

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
    const [agendameto, setAgendamento] = useState(InitialMockData); // Mock data para agendamentos

    const handleSwitchChange = (index: number, newValue: boolean) => {
        const updatedAgendamento = [...agendameto]; //pega o array e 'clona'
        updatedAgendamento[index].lembreteAtivo = newValue; //modifica o valor do lembrete ativo nesse array clonado
        setAgendamento(updatedAgendamento); // passa o estado do array clonado para o original
    }

    return (
        <View style={{ flex: 1 }}>
            {/* ========HEADER=================== */}
            <SafeAreaView style={{ zIndex: 2 }}>
                <ScheduleHeader navigation={navigation} currentPage={currentPage} scrollToPage={scrollToPage} />
            </SafeAreaView>
            {/* ================================== */}


            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={scrollRef} onScroll={handleScroll} >

                <ScrollView style={{ width: width }} >
                    {/* ==============================PRÓXIMOS ======================================== */}
                    {InitialMockData.map((item, index) => (
                        <AgendamentoCard
                            key={index}
                            data={item.data}
                            hora={item.hora}
                            lembreteAtivo={item.lembreteAtivo}
                            titulo={item.titulo}
                            endereco={item.endereco}
                            idServico={item.idServico}
                            tipoAgendamento={'proximo'}
                            onLembreteChange={(newValue) => handleSwitchChange(index, newValue)}
                            onCancelar={() => 
                                navigation.navigate("Home",{screen: "ScheduleCancelScreen"})
                            }
                        />
                    ))}
                </ScrollView>
                <ScrollView style={{ width: width }} >
                    {/* ==============================CONCLUÍDOS======================================== */}
                    {InitialMockData.map((item, index) => (
                        <AgendamentoCard
                            key={index}
                            data={item.data}
                            hora={item.hora}
                            lembreteAtivo={item.lembreteAtivo}
                            titulo={item.titulo}
                            endereco={item.endereco}
                            idServico={item.idServico}
                            tipoAgendamento={'concluido'}
                            onLembreteChange={(newValue) => handleSwitchChange(index, newValue)}
                        />
                    ))}
                </ScrollView>
                <ScrollView style={{ width: width }} >
                    {/* ==============================CANCELADOS======================================== */}
                    {InitialMockData.map((item, index) => (
                        <AgendamentoCard
                            key={index}
                            data={item.data}
                            hora={item.hora}
                            lembreteAtivo={item.lembreteAtivo}
                            titulo={item.titulo}
                            endereco={item.endereco}
                            idServico={item.idServico}
                            tipoAgendamento={'cancelado'}
                            onLembreteChange={(newValue) => handleSwitchChange(index, newValue)}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    )
}