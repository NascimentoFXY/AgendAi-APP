import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../../configs/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: "row"
  },
  title: {
    flex: 1,
    textAlign: "center",
    paddingRight: 50,
    fontWeight: "bold"
  },
  label: {
    padding: 20,
    color: colors.lightGray,
    fontWeight: 500

  },
  optionsContainer: {
    flex: 1,
    padding: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderRadius: 20,
    borderColor: colors.lightGray
  },
  options: {
    flexDirection: "row"
  },
  others: {
    flex: 1,

  },
  label2: {
    fontWeight: "bold",
    padding: 20,
    fontSize: 18,
    color: colors.title,
  },
  textInput: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.transparentLightGray,
    textAlignVertical: "top",
    flex: 1,
    borderRadius: 10,
    
  },
  TabBarButton: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 210
},
Tab: {

    width: "100%",
    padding: 30,
    backgroundColor: colors.background,
    height: 120,
    bottom: 0,
    borderTopColor: "#a5a5a555",
    borderTopWidth: 1
},

});