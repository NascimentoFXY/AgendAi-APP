import Icon from "configs/icons";
import colors, { font } from "configs/theme";
import { formatCurrency } from "configs/utils";
import { Services } from "context/salonContext";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export function ServiceTypeCard({ type }: { type: Services["types"][0] }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text
          style={styles.cardTitle}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {type.itemName?.toLocaleUpperCase()}
        </Text>

        {type.itemDuration && (
          <View
            style={{
              flexDirection: "row",
              gap: 2,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Icon.MaterialCommunityIcons
              name="clock-time-three"
              size={18}
              color={colors.lightYellow}
            />
            <Text
              style={styles.cardDuration}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.6}
            >
              {type.itemDuration} Min.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
        <Text
          style={{ fontFamily: font.poppins.regular }}
          numberOfLines={showDetails ? 0 : 2}
          minimumFontScale={0.6}
        >
          {type.itemDescription ||
            "Nenhuma descrição adicionada."}
        </Text>
      </TouchableOpacity>

      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ fontFamily: font.poppins.regular }}>Preço:</Text>
        <Text style={styles.cardPrice}>{formatCurrency(type.itemPrice)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({


  cardContainer: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.lightGray,
    gap: 20,
    marginVertical: 10
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: "space-between",

  },
  cardTitle: {
    fontFamily: font.poppins.bold,
    flex: 1,
    fontSize: 12
  },
  cardPrice: {
    fontFamily: font.poppins.semibold,
    color: colors.primary,
  },
  cardDuration: {
    fontFamily: font.poppins.regular,

  },
})