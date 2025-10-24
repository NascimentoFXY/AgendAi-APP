import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { styles } from '../style'
import colors, { font } from '../../../../configs/theme';
import ServiceItem from '../../../../components/Salao/ServicesScreenOptions';
import ProfessionalCard from '../../../../components/Salao/EspecialistaScreen';
import { Specialist } from 'pages/main/UserEtablishment/establishmentEspecialist';
import { useSalonContext } from 'context/salonContext';
import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import { db } from 'services/firebase';
import { capitalizeFirstLetter } from 'configs/utils';
import Icon from 'configs/icons';

import { useNavigation } from '@react-navigation/native'
const width = Dimensions.get("window").width;
const calcCardsWidth = (width / 2) - 40;


export default function SalaoEspecialistas() {
    const navigation = useNavigation() as any
    const [especialistaList, setEspecialistaList] = useState<Specialist[]>();
    const { salon, isOwner } = useSalonContext()!
    useEffect(() => {
        const fetchSpecialists = async () => {

            if (!salon?.id) return
            try {
                const specialistRef = collection(db, "salon", salon?.id!, "specialists")
                const q = query(specialistRef, orderBy("name", "desc"));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) return;
                const specialists = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() as { name: string, email: string, service: string }
                }))
                setEspecialistaList(specialists)
            } catch (er) {
                console.error("[establishmentEspecialist] ", er)
            }
        }

        fetchSpecialists()
    }, [])
    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

            {/* EspecialistasTitle */}
            <View style={styles.titleContainer}>
                <Text style={styles.serviceTitle}>Especialistas</Text><Text style={styles.amount}>({especialistaList?.length || 0})</Text>
                {isOwner && (
                    <TouchableOpacity style={styles.tools} onPress={() => navigation.navigate("EstablishmentTools")}>


                        <Icon.Entypo name='tools' size={24} color={colors.primary} />
                        <Text style={styles.amount}>Ferramentas</Text>

                    </TouchableOpacity>

                )}
            </View>
            {/* EspecialistasOptions */}
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 10
            }}>



                {isOwner && especialistaList?.length == 0 && <Text style={{ width: "90%", fontSize: 15, fontFamily: font.poppins.bold, textAlign: "center", color: colors.lightGray, padding: 20, }}>
                    <Icon.Ionicons name="information-circle" size={20} color={colors.lightGray} />
                    Nenhum especialista encontrado. Por favor, acesse as opções de ferramentas e envie um convite!.
                </Text>}
                {!isOwner && especialistaList?.length == undefined && <Text style={{ width: "90%", fontSize: 15, fontFamily: font.poppins.bold, textAlign: "center", color: colors.lightGray, padding: 20, }}>
                    <Icon.Ionicons name="information-circle" size={20} color={colors.lightGray} />
                    Este estabelecimento não convidou nenhum especialista! Contate o dono ou vá ao estabelecimento para mais informações.
                </Text>}



                {especialistaList?.map((item, index) => (
                    <ProfessionalCard
                        key={item.id}
                        userPhoto={item.image} // imagem do usuario
                        name={capitalizeFirstLetter(item.name)} // nome
                        profession={item.service} // serviço ex: Corte de Cabelo
                        cardWidth={calcCardsWidth} />
                    )
                )
                }

            </View>
        </ScrollView>
    )
}
