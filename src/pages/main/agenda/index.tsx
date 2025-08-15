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
    {
        data: '22 de Maio, 2025',
        hora: '14:30',
        lembreteAtivo: true,
        titulo: 'Manicure e Pedicure',
        endereco: 'Rua das Flores, 500',
        idServico: '#29820842',
        tipoAgendamento: 'proximo'
    },
    {
        data: '25 de Maio, 2025',
        hora: '09:00',
        lembreteAtivo: false,
        titulo: 'Massagem Relaxante',
        endereco: 'Av. Central, 200',
        idServico: '#29820843',
        tipoAgendamento: 'proximo'
    },
    {
        data: '28 de Maio, 2025',
        hora: '11:15',
        lembreteAtivo: true,
        titulo: 'Tratamento Facial',
        endereco: 'Rua do Sol, 750',
        idServico: '#29820844',
        tipoAgendamento: 'proximo'
    },
    {
        data: '30 de Maio, 2025',
        hora: '16:00',
        lembreteAtivo: false,
        titulo: 'Depilação a Laser',
        endereco: 'Av. das Américas, 300',
        idServico: '#29820845',
        tipoAgendamento: 'proximo'
    },
    {
        data: '02 de Junho, 2025',
        hora: '13:30',
        lembreteAtivo: true,
        titulo: 'Design de Sobrancelhas',
        endereco: 'Rua Verde, 1200',
        idServico: '#29820846',
        tipoAgendamento: 'proximo'
    },
    {
        data: '05 de Junho, 2025',
        hora: '15:45',
        lembreteAtivo: false,
        titulo: 'Cabeleireiro Completo',
        endereco: 'Av. Azul, 450',
        idServico: '#29820847',
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
            <ScheduleHeader navigation={navigation} currentPage={currentPage} scrollToPage={scrollToPage} />
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