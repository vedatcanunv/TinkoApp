import React from "react";
import { View } from "react-native";
import { Text } from "../Text";
import { styles } from "./StatisticCard.style";
import { StatisticCardProps } from "./StatisticCard.type";

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.value} size="xxl" weight="bold" color="primary">
        {value}
      </Text>
      <Text style={styles.title} size="s" color="light">
        {title}
      </Text>
    </View>
  );
};
