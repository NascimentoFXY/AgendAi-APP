import React, { useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SalonContext } from '../../../../../context/salonContext';
import { AuthContext } from 'context/auth';
import { ChatContext } from 'context/chatContext';
import { styles } from '../../style';
import colors from '../../../../../configs/theme';
import ServicesCards from '../../../../../components/homeScreenComponents/ServicesCarroussel';
import SalaoServices from '../../Services/services';
import SalaoEspecialistas from '../../Especialistas/salaoEspecialistas';
import Rating from '../../Avaliacoes';
import Icon from 'configs/icons';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';

const { height } = Dimensions.get("window");

export default function MainModal({ navigation }: any) {
  const scrollRef = useRef<ScrollView>(null);
  const { salon, loading, isOwner } = useContext(SalonContext)!;
  const { user } = useContext(AuthContext)!;
  const { createChat, useChat } = useContext(ChatContext)!;
  const [currentPage, setCurrentPage] = useState(0);

  // Ponto de "grudar" o header (em px)
  const STICKY_HEADER_POINT = 330;


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const parsedWorkSchedule = () => {
    if (!salon?.workSchedule) return "Não definido";
    switch (salon?.workSchedule) {
      case "1-5": return "Seg. a Sex.";
      case "1-6": return "Seg. a Sáb.";
      case "1-1": return "Seg. a Seg.";
      default: return "";
    }
  };

  async function goToChat() {
    const chatID = await createChat(user?.id!, salon?.ownerID!, user?.name!, salon?.ownerName!);
    if (!chatID) return;
    await useChat(chatID);
    navigation.navigate("ChatScreen");
  }

  const Header = () => (
    <View style={{ backgroundColor: colors.background, paddingTop: 20, maxHeight: STICKY_HEADER_POINT }}>
      <View style={styles.SalaoInfoText}>
        <Text style={styles.SalaoNome}>{salon?.name}</Text>
        <Text style={styles.SalaoSubTitle}>{salon?.description}</Text>
      </View>

      <View style={styles.SalaoLocContainer}>
        {!isOwner ? (
          <View style={[styles.SalaoLocText]}>
            <Icon.Ionicons name='person-sharp' size={20} color={colors.primary} />
            <Text numberOfLines={2} style={{ flex: 1 }} lineBreakMode='tail'>
              Proprietário(a): {salon?.ownerName}
            </Text>
            <TouchableOpacity
              style={[styles.SalaoLocText, { marginLeft: "auto", paddingHorizontal: 20 }]}
              onPress={goToChat}
            >
              <Icon.Entypo name="chat" size={20} color={colors.primary} />
              <Text style={{ color: colors.primary }}>Conversar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: colors.lightGray, textAlign: "center" }}>
            Você é o proprietário desse estabelecimento.
          </Text>
        )}

        <View style={styles.SalaoLocText}>
          <MaterialIcons name='location-on' size={20} color={colors.primary} />
          <Text numberOfLines={2} style={{ flex: 1, paddingRight: 20 }} lineBreakMode='tail'>
            {salon?.addres}
          </Text>
        </View>

        <View style={styles.SalaoLocText}>
          <FontAwesome5 name='clock' size={20} color={colors.primary} />
          <Text>Opera entre | {salon?.opHour} - {parsedWorkSchedule()}</Text>
        </View>
      </View>

      <View style={styles.SalaoContacts}>
        <ServicesCards icon={<MaterialCommunityIcons name='web' size={20} color={colors.secondary} />} text='Websites' width={70} iconRadius={55} height={100} textSize={15} bold={false} />
        <ServicesCards icon={<MaterialIcons name='contacts' size={20} color={colors.secondary} />} text='Contato' width={70} iconRadius={55} height={100} textSize={15} bold={false} />
        <ServicesCards icon={<Ionicons name='call' size={20} color={colors.secondary} />} text='Ligar' width={70} iconRadius={55} height={100} textSize={15} bold={false} />
        <ServicesCards icon={<Entypo name='map' size={20} color={colors.secondary} />} text='Direção' width={70} iconRadius={55} height={100} textSize={15} bold={false} />
        <ServicesCards icon={<Entypo name='share' size={20} color={colors.secondary} />} text='Share' width={70} iconRadius={55} height={100} textSize={15} bold={false} />
      </View>
    </View>
  );

  const handleTabPress = (index: number) => {
    setCurrentPage(index);
    // Volta para o topo quando clica na aba
    scrollRef.current?.scrollTo({ y: STICKY_HEADER_POINT, animated: true });
  };


  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const y = event.nativeEvent.contentOffset.y;
  // Se passou da metade do header, "gruda"
  if (y > STICKY_HEADER_POINT / 2 && y < STICKY_HEADER_POINT) {
    scrollRef.current?.scrollTo({ y: STICKY_HEADER_POINT, animated: true });
  }
  else if(y<STICKY_HEADER_POINT){
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }
};

  return (
    <ScrollView
      ref={scrollRef}
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      style={{ zIndex: 10, borderRadius: 20, backgroundColor: colors.background, marginTop:-30}}
      onScrollEndDrag={handleScrollEnd}
      scrollEventThrottle={16}
    >
      <Header />

      <View style={styles.NavigationOptions}>
        <ScrollView contentContainerStyle={styles.salaoNavigationScroll} horizontal showsHorizontalScrollIndicator={false}>
          {["Serviços", "Especialistas", "Avaliações", "Galeria"].map((tab, i) => (
            <TouchableOpacity key={i} style={styles.NavigationOptions} onPress={() => handleTabPress(i)}>
              <Text style={[styles.NavigationOptionsText, currentPage === i && { color: colors.primary }]}>
                {tab}
              </Text>
              <View style={currentPage === i ? styles.underline : styles.none} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ minHeight: height }}>
        {currentPage === 0 && <SalaoServices />}
        {currentPage === 1 && <SalaoEspecialistas />}
        {currentPage === 2 && <Rating />}
      </View>
    </ScrollView>
  );
}
