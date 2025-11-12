import colors, { font } from 'configs/theme';
import { normalizeSize } from 'configs/utils';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {

  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import Icon from 'configs/icons';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from 'services/firebase';
import { useAuthContext } from 'context/auth';
import { useAlert } from 'context/alertContext';

export default function Assinatura() {
  const { user } = useAuthContext()!
  const alert = useAlert().showAlert

  const [select, setSelect] = useState(1);
  const assinarHandler = async () => {
    try {
      const userRef = doc(db, "users", user?.id!)
      await updateDoc(userRef, {
        isPremium: true
      })
      alert("Você agora fazer parte dos assinantes premium!", "success")
    } catch (er) {
      console.error("[Premium]", er)
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 2, marginBottom: -20 }}>
        <View style={{ padding: 50, justifyContent: "center", alignItems: "center" }}>

          <Image source={require("../../../assets/premium.png")} style={{
            height: 200, resizeMode: "contain"
          }} />
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: colors.white, borderRadius: 20, paddingVertical: 20, borderWidth: 1, margin: -2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <View style={{ gap: 20, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Icon.MaterialCommunityIcons name="star-check" size={24} />
            <Text>
              Mais destaque ao salão na página inicial
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Icon.MaterialCommunityIcons name="advertisements-off" size={24} />
            <Text>
              Aplicativo livre de anúncios
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Icon.Entypo name="bar-graph" size={24} />
            <Text>
              Ferramentas de marketing para alavancar seu estabelecimento!
            </Text>
          </View>

        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={[styles.card, select == 1 && {borderWidth: 2,borderColor: "#270ea6ff"}]} onPress={()=>setSelect(1)}>
            <Text style={styles.promoTitle}>
              Mensal
            </Text>
            <Text style={styles.promoValue}>
              R$19,99
            </Text>
            <Text style={styles.promoFooter}>
              R$19,99/Mês
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, select == 2&& {borderWidth: 2, borderColor: "#270ea6ff"}]} onPress={()=>{ setSelect(2)}}>
            <View style={{ borderRadius: 50, backgroundColor: colors.primary, marginTop: normalizeSize(-40) }}>
              <LinearGradient
                colors={["#ff0000ff", "#5c2c7eff", "#2a014fff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  paddingHorizontal: 10
                }}
              ><Text style={{ fontSize: normalizeSize(12), textAlign: "center", color: "white" }}>Economize 20%</Text></LinearGradient>
            </View>
            <Text style={[styles.promoTitle, { marginTop: -20 }]}>
              Anual
            </Text>
            <Text style={styles.promoValue}>
              R$182,40
            </Text>
            <Text style={styles.promoFooter}>
              R$17,58/Mês
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={assinarHandler}
          style={{
            width: "80%",
            alignSelf: "center",
            borderRadius: 15,
            overflow: "hidden",
            elevation: 4,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            marginVertical: 20,
          }}
        >
          <LinearGradient
            colors={["#ff0000ff", "#5c2c7eff", "#2a014fff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 16,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Assinar
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    margin: 10,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    flex: 1,
    aspectRatio: 4 / 5,
    alignItems: "center",
    justifyContent: "space-around"
  },
  promoValue: {
    fontFamily: font.poppins.bold,
    fontSize: normalizeSize(24)
  },
  promoTitle: {
    fontFamily: font.poppins.regular,
  },
  promoFooter: {
    fontFamily: font.poppins.regular,
  }
});