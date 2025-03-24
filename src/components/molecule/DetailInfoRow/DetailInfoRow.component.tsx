import React from "react";
import { View } from "react-native";
import { Text } from "../../../components/atom";
import { styles } from "./DetailInfoRow.style";
import { DetailInfoRowProps } from "./DetailInfoRow.type";

export const DetailInfoRow: React.FC<DetailInfoRowProps> = ({
  label,
  value,
}) => {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};
