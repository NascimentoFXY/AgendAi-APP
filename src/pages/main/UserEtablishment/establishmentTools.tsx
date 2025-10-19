
import Icon from 'configs/icons';
import pickImage from 'configs/pickImage';
import colors, { font } from 'configs/theme';
import { useSalonContext } from 'context/salonContext';
import Input from '../Salao/CriarSalao/compontents/Input/input';
import React, { useEffect, useRef, useState } from 'react';
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
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import TabBarButton from 'components/TabBar';
import EstablishmentTool1 from './establishmentTool1';

export default function EstablishmentTools() {
  const { salon } = useSalonContext()!
  const { width } = Dimensions.get("window")

  const [image, setImage] = useState<string | undefined>()
  const [salonName, setSalonName] = useState("")
  const [salonDescription, setSalonDescription] = useState("")
  const [salonCNPJ, setSalonCNPJ] = useState("")
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [0, 1, 2]

  useEffect(() => {
    if (salon) {
      setImage(salon.image);
      setSalonName(salon.name);
      setSalonDescription(salon.description!);
      setSalonCNPJ(salon.CNPJ);
      console.log("[EstablishmentTools] renderizou");
    }
  }, [salon]);


  async function pickImageasync() {
    const image = await pickImage()
    if (!image) return
    setImage(image)
  }
  if (!salon) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={70} />
      </SafeAreaView>
    );
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    console.log(pageIndex)
    setCurrentPage(pageIndex);
  }

  const scrollToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length && scrollRef.current) {
      scrollRef.current.scrollTo({ x: width * pageIndex, animated: true });
    } else {

      console.warn(`Página com índice ${pageIndex} não encontrada.`);
    }
  };

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
          <View style={{padding:20}}>
            <View>
              <Text style={styles.inputLabel}>Nome do estabelecimento</Text>
              <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonName} />
            </View>
            <View>
              <Text style={styles.inputLabel}>Descrição</Text>
              <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonDescription} />
            </View>
            <View>
              <Text style={styles.inputLabel}>CNPJ</Text>
              <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonCNPJ} />
            </View>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={{ gap: 20, paddingHorizontal: 20, }}
            showsHorizontalScrollIndicator={false}
          >

            <TouchableOpacity style={styles.options}
              onPress={() => scrollToPage(0)}
            >
              <Text style={styles.optionsText}
              >
                Especialistas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options}
              onPress={() => scrollToPage(1)}
            >
              <Text style={styles.optionsText}>
                Serviços
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.options}
              onPress={() => scrollToPage(2)}
            >
              <Text style={styles.optionsText}>
                Ferramentas de marketing
              </Text>
            </TouchableOpacity>


          </ScrollView>

          <ScrollView
            ref={scrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={12}
            pagingEnabled
            horizontal

          >
            <EstablishmentTool1 />
            <EstablishmentTool1 />
            <EstablishmentTool1 />
            <EstablishmentTool1 />


          </ScrollView>

        </View>
      </ScrollView >
      <TabBarButton title='Salvar' />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  options: {
    paddingVertical: 20,
  },
  optionsText: {
    fontSize: 20,
    fontFamily: font.poppins.bold,
    borderBottomWidth: 3,
    borderRadius: 15

  },

  content: {
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
    marginTop: -20,
    backgroundColor: colors.background
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: font.poppins.bold
  },
});