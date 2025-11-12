
import Icon from 'configs/icons';
import pickImage from 'configs/pickImage';
import colors, { font } from 'configs/theme';
import { useSalonContext } from 'context/salonContext';
import Input from '../Salao/CriarSalao/compontents/Input/input';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
import EstablishmentEspecialist from './establishmentEspecialist';
import EstablishmentServices from './establishmentServices';
import MarketingTools from './marketingTools';
import { updateDoc } from '@firebase/firestore';
import { formatCNPJ, LoadingModal, normalizeSize } from 'configs/utils';
import { useAlert } from 'context/alertContext';
import { uploadImageAndSaveToFirestore } from 'services/firebase';
import CustomButton from 'components/customButton';
import { useAuthContext } from 'context/auth';

export default function EstablishmentTools({ navigation }: any) {
  const { salon, salonList, SalonRef } = useSalonContext()!
  const { width } = Dimensions.get("window")
  const {user}= useAuthContext()!
  const [image, setImage] = useState<string | undefined>()
  const [salonName, setSalonName] = useState("")
  const [salonDescription, setSalonDescription] = useState("")
  const [salonCNPJ, setSalonCNPJ] = useState("")
  const scrollRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState(false)
  const [saving, setSaving] = useState<boolean>(false)
  const alert = useAlert().showAlert
  const isPremium = user?.isPremium
  async function pickImageasync() {
    const image = await pickImage(16, 9)
    if (!image) return
    setImage(image)
  }
  async function updateSalon() {
    if (!isEdited) {
      console.warn("não foi editado")
      return
    }
    try {
      setLoading(true)
      setSaving(true)
      const ref = SalonRef() as any;
      let data: any = {
        name: salonName,
        description: salonDescription,
        CNPJ: salonCNPJ,
      };

      // ✅ Só envia nova imagem se o estado mudou e tiver algo novo
      if (image && image !== salon?.image) {
        const salonImage = await uploadImageAndSaveToFirestore(image, salon?.id);
        data.image = salonImage;
      }
      await updateDoc(ref, data)
      setSaving(false)
      setLoading(false)


      alert("Dados Alterados.", "success")
    } catch (er) {
      console.error(er)
    }
  }

  useEffect(() => {
    if (salon) {
      setImage(salon.image);
      setSalonName(salon.name);
      setSalonDescription(salon.description!);
      setSalonCNPJ(formatCNPJ(salon.CNPJ));
      setIsEdited(false)
    }
  }, [salon]);

  useEffect(() => {
    if (!salon) return;

    const hasChanges =
      salonName !== salon.name ||
      salonDescription !== salon.description ||
      salonCNPJ !== formatCNPJ(salon.CNPJ) ||
      image !== salon.image;

    setIsEdited(hasChanges);
  }, [salonName, salonDescription, salonCNPJ, image, salon]);

  const pages = useMemo(() => [0, 1, 2], [])

  if (!salon) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={70} />
      </SafeAreaView>
    );
  }

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width)
    // console.log(pageIndex)
    setCurrentPage(pageIndex);
  }, [width])

  const scrollToPage = useCallback((pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length && scrollRef.current) {
      scrollRef.current.scrollTo({ x: width * pageIndex, animated: true });
    } else {

      console.warn(`Página com índice ${pageIndex} não encontrada.`);
    }
  }, [width, pages]);

  const navigationOptions = useMemo(() => (
    <ScrollView
      horizontal
      contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}
      showsHorizontalScrollIndicator={false}
    >
      {isPremium &&["Especialistas", "Serviços", "Ferramentas de marketing"].map((label, index) => (
        <TouchableOpacity key={index} style={styles.options} onPress={() => scrollToPage(index)}>
          <Text style={styles.optionsText}>{label}</Text>
        </TouchableOpacity>
      ))}
      {!isPremium &&["Especialistas", "Serviços"].map((label, index) => (
        <TouchableOpacity key={index} style={styles.options} onPress={() => scrollToPage(index)}>
          <Text style={styles.optionsText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ), [scrollToPage]);

  return (
    <SafeAreaView style={styles.container}>

      <LoadingModal loading={loading} />


      <View>
        <CustomButton
          Icon={<Icon.Ionicons name="arrow-back" size={24} color="white" />}
          border='Circle'
          width={50}
          height={50}
          type='absolute'
          top={75}
          left={20}
          style={{ zIndex: 3, backgroundColor: "#6b6b6ba8", borderWidth: 1, borderColor: "#ffffff99" }}
          onPress={() => (navigation.goBack())}
        />
        <Image source={{ uri: image }} style={{ position: "absolute", width: width, aspectRatio: 16 / 9 }} />

        <TouchableOpacity style={{ width: width, aspectRatio: 16 / 9, justifyContent: "center", alignItems: "center" }}
          onPress={pickImageasync}
        >
          <Icon.MaterialIcons name="add-a-photo" size={60} color="#ffffff90" />
          <Text style={{ fontFamily: font.poppins.bold, color: "#ffffff90" }}>Alterar foto</Text>
        </TouchableOpacity>

      </View>

      <ScrollView style={styles.modal} stickyHeaderIndices={[1]}>


        <View style={{ padding: 20 }}>
          <View>
            <TouchableOpacity onPress={()=> navigation.navigate("Salao")}>

              <Text style={{ fontSize: normalizeSize(14), fontFamily: font.poppins.semibold,color: colors.primary, textAlign:"right" }}>Ir para</Text>
            </TouchableOpacity>

          </View>
          <View>
            <Text style={styles.inputLabel}>Nome do estabelecimento</Text>
            <Input placeholder='Alterar nome' onChangeText={setSalonName} value={salonName} />
          </View>
          <View>
            <Text style={styles.inputLabel}>Descrição</Text>
            <Input placeholder='Alterar nome' onChangeText={setSalonDescription} value={salonDescription} />
          </View>
          <View>
            <Text style={styles.inputLabel}>CNPJ</Text>
            <Input placeholder='Alterar nome' onChangeText={(text) => { setSalonCNPJ(formatCNPJ(text)) }} value={salonCNPJ} />
          </View>

        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{ gap: 20, paddingHorizontal: 20, zIndex: 10, backgroundColor: colors.background }}
          showsHorizontalScrollIndicator={false}
        >

          {navigationOptions}


        </ScrollView>

        <ScrollView
          ref={scrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={12}
          pagingEnabled
          horizontal
          style={{ maxWidth: width }}

        >
          <EstablishmentEspecialist />
          <EstablishmentServices />
          <MarketingTools saving={saving} />


        </ScrollView>


      </ScrollView >
      {isEdited && <TabBarButton title='Salvar' onPress={updateSalon} />}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  options: {
    paddingTop: 10,
  },
  optionsText: {
    fontSize: 20,
    fontFamily: font.poppins.bold,
    borderBottomWidth: 3,
    borderRadius: 15

  },

  content: {
    alignItems: 'center',
    backgroundColor: colors.debug

  },

  modal: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
    marginTop: -20,
    backgroundColor: colors.background,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: font.poppins.bold
  },
});