import Icon from "configs/icons";
import colors, { font } from "configs/theme";
import { normalizeFont } from "configs/utils";
import { Rating } from "context/salonContext";
import React from "react";

import { View, Text, StyleSheet } from "react-native";


const RatingStars = ({ value }: { value: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Icon.Ionicons
                key={i}
                name="star"
                size={normalizeFont(25)}
                color={i <= value ? colors.primary : colors.lightGray}
            />
        );
    }
    return <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>{stars}</View>;
};

const UserRatingsComp: React.FC<Rating> = (props) => {

    return (
        <View style={styles.ratingContainer}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.salonName}>{props.salonName}</Text>
                <Text style={styles.date}>{props.createdAt}</Text>
            </View>

            <Text numberOfLines={3} style={styles.comment}>{props.comment}</Text>

            <View style={styles.ratingContent}>
                <RatingStars value={props.value} />
                <Text style={styles.ratingValue}> {(props.value).toFixed(1)}</Text>
            </View>

        </View>
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
        fontSize: normalizeFont(20),
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
        fontSize: normalizeFont(20),
        fontFamily: font.poppins.semibold,
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: normalizeFont(20),
    },
    comment: {
        fontFamily: font.poppins.regular,
        fontSize: normalizeFont(16),
        marginBottom: 10,
        color: "#666"

    },
    date: {}
});