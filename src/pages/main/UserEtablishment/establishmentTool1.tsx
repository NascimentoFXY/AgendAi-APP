import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import SalaoEspecialistas from '../Salao/Especialistas';
import ProfessionalCard from 'components/Salao/EspecialistaScreen';
import colors from 'configs/theme';
const {width} = Dimensions.get("window")
export default function EstablishmentTool1() {

    const [especialistaName, setEspecialistaName] = useState("")
    const [especialistaFoto, setEspecialistaFoto] = useState("")



    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text>Hello React Native!</Text>
       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {width: width, backgroundColor: colors.debug, margin: 2},
  content: {
    justifyContent: 'center',
     alignItems: 'center' },
});