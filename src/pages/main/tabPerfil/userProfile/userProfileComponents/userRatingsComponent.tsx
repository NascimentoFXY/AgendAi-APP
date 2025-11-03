import Icon from "configs/icons";
import colors, { font } from "configs/theme";
import { LoadingModal, normalizeSize } from "configs/utils";
import { Rating, useSalonContext } from "context/salonContext";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const RatingStars = ({ value }: { value: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Icon.Ionicons
                key={i}
                name="star"
                size={normalizeSize(25)}
                color={i <= value ? colors.primary : colors.lightGray}
            />
        );
    }
    return <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>{stars}</View>;
};

const UserRatingsComp: React.FC<Rating> = (props) => {
    const { loadSalon } = useSalonContext()!;
    const navigation = useNavigation<any>();
    console.log("salonID: ", props.salonID);
    const [loading, setLoading] = React.useState(false);
    return (
        <>
        <LoadingModal loading={loading}/>
            <TouchableOpacity activeOpacity={0.7}
                onPress={async () => {setLoading(true); await loadSalon(props.salonID!).then(()=>setLoading(false)); navigation.navigate("Salao") }}
                style={styles.ratingContainer}>

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.salonName}>{props.salonName}</Text>
                    <Text style={styles.date}>{props.createdAt}</Text>
                </View>

                <Text numberOfLines={3} style={styles.comment}>{props.comment}</Text>

                <View style={styles.ratingContent}>
                    <RatingStars value={props.value} />
                    <Text style={styles.ratingValue}> {(props.value).toFixed(1)}</Text>
                </View>

            </TouchableOpacity>
        </>
    );
}
export default UserRatingsComp;
const styles = StyleSheet.create({
    ratingContainer: {
        margin: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#ccc"
    },
    salonName: {

        fontFamily: font.abrilfatface,
        fontSize: normalizeSize(20),
        marginBottom: 5,
    },
    ratingContent: {
        alignItems: "center",

        flexDirection: "row",
        padding: 5,
        gap: 10,
    },
    ratingValue: {
        color: "#39342fff",
        fontSize: normalizeSize(20),
        fontFamily: font.poppins.semibold,
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: normalizeSize(20),
    },
    comment: {
        fontFamily: font.poppins.regular,
        fontSize: normalizeSize(16),
        marginBottom: 10,
        color: "#666"

    },
    date: {}
});