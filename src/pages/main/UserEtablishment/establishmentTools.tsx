
import Icon from 'configs/icons';
import pickImage from 'configs/pickImage';
import colors, { font } from 'configs/theme';
import { useSalonContext } from 'context/salonContext';
import Input from '../Salao/CriarSalao/compontents/Input/input';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import TabBarButton from 'components/TabBar';

export default function EstablishmentTools() {
  const { salon } = useSalonContext()!
  const { width } = Dimensions.get("window")
  if (!salon) return <ActivityIndicator size={70} />

  const [image, setImage] = useState<string | undefined>()
  const [salonName, setSalonName] = useState("")

  useEffect(() => {
    let isMounted = true;
    // console.log(salon?.image)
    if (isMounted) {

      setImage(salon?.image)
      setSalonName(salon.name)
      console.log("[EstablishmentTools]renderizou")
    }
    isMounted = false;
  }, []);

  async function pickImageasync() {
    const image = await pickImage()
    if (!image) return
    setImage(image)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <View style={{}}>
          <Image source={{ uri: image }} style={{ position: "absolute", width: width, aspectRatio: 16 / 9 }} />

          <TouchableOpacity style={{ width: width, aspectRatio: 16 / 9, justifyContent: "center", alignItems: "center" }}
            onPress={pickImageasync}
          >
            <Icon.MaterialIcons name="add-a-photo" size={60} color="#ffffff90" />
            <Text style={{ fontFamily: font.poppins.bold, color: "#ffffff90" }}>Alterar foto</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.modal}>
          <View>
            <Text style={styles.inputLabel}>Nome do estabelecimento</Text>
            <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonName} />
          </View>
          <View>
            <Text style={styles.inputLabel}>Descrição</Text>
            <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonName} />
          </View>
          <View>
            <Text style={styles.inputLabel}>CNPJ</Text>
            <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonName} />
          </View>

        </View>
      </ScrollView>
      <TabBarButton title='Salvar' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    width: "100%",
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    width: "100%",
    padding: 20,
    borderRadius: 20,
    marginTop: -20,
    backgroundColor: colors.background
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: font.poppins.bold
  },
});