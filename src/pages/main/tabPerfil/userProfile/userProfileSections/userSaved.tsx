import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import UserRatingsComp from '../userProfileComponents/userRatingsComponent';
import { styles } from './styles';
import { collectionGroup, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from 'services/firebase';
import { Rating, useSalonContext } from 'context/salonContext';
import { useAuthContext } from 'context/auth';
import { TopSaloesCardsData } from 'pages/catalogo/catalogo';
import colors from 'configs/theme';
import { useNavigation } from "@react-navigation/native"
import Icon from 'configs/icons';
const { width, height } = Dimensions.get('window');

export default function UserSaved() {

  const { user } = useAuthContext()!;
  const { savedList, salonList, fetchSaved } = useSalonContext()!;

  const [averageRatings, setAverageRatings] = useState<{ [salonId: string]: number }>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSaved();
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.sectionTitle}>
          <Text style={styles.Title}>Salvos </Text><Text style={styles.lengthText}>({savedList.length})</Text>
        </View>
        {savedList.map((key, index) =>
          <View key={key.id} >
         
            <TopSaloesCardsData name={key.name}
              salonId={key.id}
              image={key.image}
              description={key.description}
              address={key.addres}
              item={key}
              navigation={navigation}
            />
          </View>

        )}
      </ScrollView>
    </SafeAreaView>
  );
}
