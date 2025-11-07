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
  const { savedList, getAverageRating, salonList, fetchSaved } = useSalonContext()!;

  const [averageRatings, setAverageRatings] = useState<{ [salonId: string]: number }>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSaved();
  }, []);
  useEffect(() => {
    const fetchAllAverages = async () => {
      if (!salonList || salonList.length === 0) {
        return;
      }
      const ratingsMap: { [salonId: string]: number } = {};

      for (const salon of salonList) {
        if (!getAverageRating) return;
        const avg = await getAverageRating(salon);
        ratingsMap[salon.id!] = avg;
      }

      setAverageRatings(ratingsMap);
      setLoading(false);
    };

    fetchAllAverages();
  }, [salonList]);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.sectionTitle}>
          <Text style={styles.Title}>Salvos </Text><Text style={styles.lengthText}>({savedList.length})</Text>
        </View>
        {savedList.map((key, index) =>
          <View key={key.id} >
         
            <TopSaloesCardsData name={key.name} rating={
              averageRatings[key.id!] === undefined ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                (averageRatings[key.id!] ?? 0).toFixed(1)
              )}
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
