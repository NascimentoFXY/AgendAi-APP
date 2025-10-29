import React from 'react';
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
const {width, height} = Dimensions.get('window');
export default function UserRatings() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <View>
            <Text>Avaliações (1)</Text>
        </View>
        <UserRatingsComp 
        salonName='La Mar'
        comment='Sed lectus purus, bibendum quis facilisis et, pulvinar nec nulla. Duis placerat volutpat tincidunt.'
        value={1}
        createdAt='2024-06-01' />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: width, paddingVertical: 20 },
  content: { flexGrow: 1},
});