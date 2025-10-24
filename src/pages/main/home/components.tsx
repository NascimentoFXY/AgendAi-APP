import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import InputWithIcons from '../../../components/InputIcons';
import Carroussel from '../../../components/homeScreenComponents/carroussel';
import colors from '../../../configs/theme';
import ServicesCards from '../../../components/homeScreenComponents/ServicesCarroussel';
import MainHeader from '../../../components/homeScreenComponents/header';
import { useNavigation } from '@react-navigation/native';

export const EspecialCardsData = [
    {
        id: 1,
        content:
            <View
                style={styles.especialCards}>

                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>Salão do zé com desconto</Text>
                    <Text style={{ color: "#fff" }}>De até</Text>
                    <Text style={{ color: "#fff" }}>20%</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingTop: 30, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, paddingTop: 20, }}>Localizado em Faria lima, SP</Text>
                    <CustomButton
                        backcolor={colors.primary}
                        border="Circle"
                        text='IR'
                        color='#fff'
                        width={80}
                    />
                </View>
            </View>
    },
    {
        id: 2,
        content:
            <View
                style={styles.especialCards}>

                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>Salão do zé com desconto</Text>
                    <Text style={{ color: "#fff" }}>De até</Text>
                    <Text style={{ color: "#fff" }}>20%</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingTop: 30, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, paddingTop: 20, }}>Localizado em Faria lima, SP</Text>
                    <CustomButton
                        backcolor={colors.primary}
                        border="Circle"
                        text='IR'
                        color='#fff'
                        width={80}
                    />
                </View>
            </View>
    },
    {
        id: 3,
        content:
            <View
                style={styles.especialCards}>

                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>Salão do zé com desconto</Text>
                    <Text style={{ color: "#fff" }}>De até</Text>
                    <Text style={{ color: "#fff" }}>20%</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingTop: 30, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, paddingTop: 20, }}>Localizado em Faria lima, SP</Text>
                    <CustomButton
                        backcolor={colors.primary}
                        border="Circle"
                        text='IR'
                        color='#fff'
                        width={80}
                    />
                </View>
            </View>
    },
    {
        id: 4,
        content:
            <View
                style={styles.especialCards}>

                <View style={{ flex: 1 }}>
                    <Text style={{ backgroundColor: "#fff", width: 120, padding: 8, borderRadius: 20 }}>Tempo Limitado</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 24 }}>Salão do zé com desconto</Text>
                    <Text style={{ color: "#fff" }}>De até</Text>
                    <Text style={{ color: "#fff" }}>20%</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", paddingTop: 30, alignItems: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, paddingTop: 20, }}>Localizado em Faria lima, SP</Text>
                    <CustomButton
                        backcolor={colors.primary}
                        border="Circle"
                        text='IR'
                        color='#fff'
                        width={80}
                    />
                </View>
            </View>
    },

]
// export const topSaloesCardsData = [

//     {

//         id: 1,
//         content:


//             <View
//                 style={styles.SaloesCards}>
//                 <View style={{ flex: 3, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesHeart}>
//                         <FontAwesome5 name='heart' size={30} />
//                     </View>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesRating}>
//                         <MaterialIcons name='star' size={30} />
//                         <Text>5.0</Text>
//                     </View>
//                 </View>


//             </View>
//     },
//     {

//         id: 2,
//         content:
//             <View
//                 style={styles.SaloesCards}>
//                 <View style={{ flex: 3, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesHeart}>
//                         <FontAwesome5 name='heart' size={30} />
//                     </View>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesRating}>
//                         <MaterialIcons name='star' size={30} />
//                         <Text>5.0</Text>
//                     </View>
//                 </View>


//             </View>

//     },
//     {

//         id: 3,
//         content:
//             <View
//                 style={styles.SaloesCards}>
//                 <View style={{ flex: 3, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesHeart}>
//                         <FontAwesome5 name='heart' size={30} />
//                     </View>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesRating}>
//                         <MaterialIcons name='star' size={30} />
//                         <Text>5.0</Text>
//                     </View>
//                 </View>


//             </View>

//     },
//     {

//         id: 4,
//         content:
//             <View
//                 style={styles.SaloesCards}>
//                 <View style={{ flex: 3, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesHeart}>
//                         <FontAwesome5 name='heart' size={30} />
//                     </View>
//                 </View>
//                 <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                     <View style={styles.saloesRating}>
//                         <MaterialIcons name='star' size={30} />
//                         <Text>5.0</Text>
//                     </View>
//                 </View>


//             </View>

//     }

// ]