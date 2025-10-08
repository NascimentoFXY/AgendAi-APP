// src/components/AgendamentoCard/index.tsx

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import colors, { font } from '../../../configs/theme';
// src/components/AgendamentoCard/types.ts
interface AgendamentoCardProps {
  data?: string;
  hora?: string;
  lembreteAtivo?: boolean;
  titulo?: string;
  endereco?: string;
  idServico?: string;
  imagem?: string; // Ou um tipo de imagem mais específico se necessário
  tipoAgendamento?: 'active' | 'done' | 'canceled';
  onLembreteChange?: (newValue: boolean) => void;
  onPress?: () => void;
  onVisaoGeral?: () => void;
}
const AgendamentoCard: React.FC<AgendamentoCardProps> = ({
  data,
  hora,
  tipoAgendamento,
  lembreteAtivo,
  titulo,
  endereco,
  idServico,
  imagem,
  onPress,
  onVisaoGeral,
  onLembreteChange,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{data} - {hora}</Text>
        {
          tipoAgendamento === 'active' &&
          <View style={styles.lembreteContainer}>
            <Text style={styles.lembreteText}>Me lembre</Text>
            <Switch
              value={lembreteAtivo}
              onValueChange={onLembreteChange}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={lembreteAtivo ? "#f4f3f4" : "#abababff"}
            />
          </View>
        }

      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Image source={{ uri: imagem }} style={styles.servicoImagem} />
        <View style={styles.infoContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.endereco}>{endereco}</Text>
          <Text style={styles.idServico}>{idServico}</Text>
        </View>
      </View>

      {/* Rodapé com botões */}

      {
      tipoAgendamento === 'active' && <View style={styles.actions}>
        <TouchableOpacity style={styles.btnCancelar} onPress={onPress}>
          <Text style={styles.CancelBtnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnVisaoGeral} onPress={onVisaoGeral}>
          <Text style={styles.btnText}>Visão Geral</Text>
        </TouchableOpacity>
      </View>
      }
      {
      tipoAgendamento === 'done' && <View style={styles.actions}>
        <TouchableOpacity style={styles.btnCancelar} onPress={onPress}>
          <Text style={styles.CancelBtnText}>Visão Geral</Text>
        </TouchableOpacity>
    
      </View>
      }
      {
      tipoAgendamento === 'canceled' && <View style={styles.actions}>
        <TouchableOpacity style={styles.btnCancelar} onPress={onPress}>
          <Text style={styles.CancelBtnText}>Re-agendar</Text>
        </TouchableOpacity>
    
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 15,
    fontWeight: 600,
    color: '#333',
    fontFamily: font.poppins.bold
  },
  lembreteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lembreteText: {
    fontSize: 12,
    marginRight: 5,
    color: '#666',
    fontFamily: font.poppins.regular
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  servicoImagem: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,

    color: '#333',
    fontFamily: font.poppins.bold
  },
  endereco: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontFamily: font.poppins.regular
  },
  idServico: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    fontFamily: font.poppins.regular
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#e8455e',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  btnVisaoGeral: {
    flex: 1,
    backgroundColor: '#e8455e',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  CancelBtnText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AgendamentoCard;