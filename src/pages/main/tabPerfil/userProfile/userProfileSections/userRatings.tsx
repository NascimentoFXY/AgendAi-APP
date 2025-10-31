import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import UserRatingsComp from '../userProfileComponents/userRatingsComponent';
import { styles } from './styles';
import { collectionGroup, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from 'services/firebase';
import { Rating } from 'context/salonContext';
import { useAuthContext } from 'context/auth';
const { width, height } = Dimensions.get('window');

export default function UserRatings() {
  const [ratings, setRatings] = React.useState<Rating[]>([]);
  const { user } = useAuthContext()!;
  useEffect(() => {
    async function fetchRatings() {
      await getUserRatings();
    }
    fetchRatings();
  }, []);



  const getUserRatings = async () => {
    try {
      // busca em todas as subcoleções chamadas "ratings"
      const q = query(collectionGroup(db, "ratings"), where("senderID", "==", user?.id));
      const querySnapshot = await getDocs(q);

      const ratings: Rating[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        salonName: doc.data().salonName,
        salonID: doc.data().salonID,
        comment: doc.data().comment,
        value: doc.data().value,
        createdAt: doc.data().createdAt,
      } as Rating));
      setRatings(ratings);
      return ratings;
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      return [];
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.sectionTitle}>
          <Text style={styles.Title}>Avaliações </Text><Text style={styles.lengthText}>({ratings.length})</Text>
        </View>

        {
          ratings.map((rating, index) => (
            <UserRatingsComp
              key={rating.id}
              salonName={rating.salonName}
              salonID={rating.salonID}
              comment={rating.comment}
              value={rating.value}
              createdAt='2024-06-01' />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
