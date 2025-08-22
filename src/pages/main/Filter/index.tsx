import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ViewStyle,
    TextStyle
} from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../../../components/input'; // Você pode manter esse se já estiver estilizado
import CustomButton from '../../../components/customButton';
import { styles } from './style';
import colors from '../../../configs/colors';
import TabBarButton from '../../../components/TabBar';
import Checkbox from '../../../components/checkbox/checkbox';
const width = Dimensions.get("window").width
type filterOptionsProps = {
    optionTitle?: string;
    optionColor?: "primary" | undefined;
    onPress?: (x: any) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}
const FilterOptions: React.FC<filterOptionsProps> = ({
    optionColor,
    optionTitle,
    onPress,
    style,
    textStyle,
}) => {
    return (
        <TouchableOpacity activeOpacity={0.9} style={[{
            backgroundColor: optionColor === 'primary' ? colors.primary : colors.background,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            borderRadius: 20,
            borderColor: colors.transparentLightGray,
            borderWidth: optionColor === "primary" ? 0 : 1,
        }, style]}>
            <Text style={[
                {
                    color: optionColor === 'primary' ? colors.textSecondary : colors.subTitle
                }]}>{optionTitle}</Text>
        </TouchableOpacity>
    )
}

const Stars = ({ color }: any) => {
    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            <Ionicons name='star' size={20} color={color} />
            <Ionicons name='star' size={20} color={color} />
            <Ionicons name='star' size={20} color={color} />
            <Ionicons name='star' size={20} color={color} />
            <Ionicons name='star' size={20} color={color} />
        </View>
    )
}
export default function Filters({ navigation }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <CustomButton
                    Icon={<Ionicons name="arrow-back" size={24} color={"#fff"} />}
                    border='Circle'

                    width={50}
                    height={50}
                    style={{ zIndex: 3, backgroundColor: colors.primary, borderWidth: 1, borderColor: "#c5c5c5" }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Filtros</Text>
            </View>
            {/* opcoes */}
            <View style={{ flexDirection: 'row', height: 50, marginVertical: 20, justifyContent: "space-around" }}>
                <FilterOptions optionTitle='Todos' optionColor='primary' style={{ width: 80 }} />
                <FilterOptions optionTitle='Masculino' style={{ width: 120 }} />
                <FilterOptions optionTitle='Feminino' style={{ width: 120 }} />
            </View>
            {/* ========= */}
            <View>
                <View>
                    <Text style={styles.label2}>SERVIÇOS</Text>
                </View>
                {/* ====essa scrollView========= */}
                <ScrollView nestedScrollEnabled={true}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 60, width: width }}
                    contentContainerStyle={{ paddingHorizontal: 20, flexDirection: 'row', gap: 20 }}>
                    <FilterOptions optionTitle='Cortes' optionColor='primary' style={{ width: 80 }} />
                    <FilterOptions optionTitle='Maquiagem' />
                    <FilterOptions optionTitle='Barbearia' />
                    <FilterOptions optionTitle='Massagem' />
                </ScrollView>
            </View>
            <View>
                <View>
                    <Text style={styles.label2}>DISTÂNCIA</Text>
                </View>

            </View>
            <View>
                <View>
                    <Text style={styles.label2}>AVALIAÇÕES</Text>
                </View>
                <View style={{ gap: 25, padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Stars color={colors.primary} /><Checkbox />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Stars color={colors.primary} /><Checkbox />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Stars color={colors.primary} /><Checkbox />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Stars color={colors.primary} /><Checkbox />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Stars color={colors.primary} /><Checkbox />
                    </View>

                </View>
            </View>
            <TabBarButton title='Filtrar' />
        </View>
    )
}