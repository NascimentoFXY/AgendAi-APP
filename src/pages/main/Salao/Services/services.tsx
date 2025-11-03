import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { styles } from '../style'
import colors, { font } from '../../../../configs/theme';
import ServiceItem from '../../../../components/Salao/ServicesScreenOptions';
import CustomButton from '../../../../components/customButton';
import { SalonContext, Services } from '../../../../context/salonContext';
import { AuthContext } from '../../../../context/auth';
import Icon from 'configs/icons';
import { useNavigation } from '@react-navigation/native'



export default function SalaoServices() {
    const { salon, loading, isOwner, serviceList, fetchServices } = useContext(SalonContext)!
    const { user } = useContext(AuthContext)!
    const navigation = useNavigation() as any
    const [selectedService, setSelectedService] = useState<Services | null>(null);
    const [infoDisplayVisible, setInfoDisplayVisible] = useState(false)
    useEffect(() => {
        console.log(serviceList)
        fetchServices()
    }, [salon?.id]);
    const handleInfoDisplay = (item: Services) => {
        setSelectedService(item);
        setInfoDisplayVisible(true);
    };
    return (

        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>


            {/* ServicosTitle */}
            <View style={styles.titleContainer}>
                <Text style={styles.serviceTitle}>Serviços</Text><Text style={styles.amount}>({serviceList.length})</Text>
                {isOwner && (
                    <TouchableOpacity style={styles.tools} onPress={() => navigation.navigate("EstablishmentTools")}>


                        <Icon.Entypo name='tools' size={24} color={colors.primary} />
                        <Text style={styles.amount}>Ferramentas</Text>

                    </TouchableOpacity>

                )}
            </View>
            {/* ServicosOptions */}



            <ScrollView nestedScrollEnabled contentContainerStyle={{ justifyContent: "center", alignItems: "center", gap: 10, paddingBottom: 10 }}>

                {isOwner && serviceList.length == 0 && <Text style={{ width: "90%", fontSize: 15, fontFamily: font.poppins.bold, textAlign: "center", color: colors.lightGray, padding: 20, }}>
                    <Icon.Ionicons name="information-circle" size={20} color={colors.lightGray} />
                    Nenhum serviço adicionado. Por favor, acesse as opções de ferramentas e adicione algum serviço.
                </Text>}
                {!isOwner && serviceList.length === 0 && <Text style={{ width: "90%", fontSize: 15, fontFamily: font.poppins.bold, textAlign: "center", color: colors.lightGray, padding: 20, }}>
                    <Icon.Ionicons name="information-circle" size={20} color={colors.lightGray} />
                    Este estabelecimento não possui serviços ativos. Contate o dono ou vá ao estabelecimento para mais informações.
                </Text>}
                {
                    serviceList.length === (0 || null) &&
                    <Text style={{ fontFamily: font.poppins.medium }}>
                        Você não possui nenhum serviço.
                    </Text>
                }

                {/* Modal de informações */}
                <Modal
                    visible={infoDisplayVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setInfoDisplayVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer2}>
                            <Text style={styles.modalTitle}>{selectedService?.serviceName}</Text>

                            {selectedService?.types.map((type) => (
                                <View key={type.itemId} style={{padding: 5, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderRadius: 20, borderColor: colors.lightGray}}>
                                    <Text>{type.itemDescription}</Text>
                           
                                    <Text>R$ {type.itemPrice}</Text>
                                </View>
                            ))}

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.modalButton, { marginHorizontal: "auto" }]}
                                    onPress={() => setInfoDisplayVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {serviceList.map((item) => (
                    <ServiceItem key={item.id} text={item.serviceName} amount={item.quantity} onPress={() => handleInfoDisplay(item)} />
                ))}
            </ScrollView>
        </ScrollView>

    )

}