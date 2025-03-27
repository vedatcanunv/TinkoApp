import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../../atom/Text";
import { styles } from "./MediaListHeader.style";
import { MediaListHeaderProps } from "./MediaListHeader.type";

export const MediaListHeader: React.FC<MediaListHeaderProps> = ({
  title,
  activeFilter,
  onFilterChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text size="xl" weight="bold" color="primary">
        {title}
      </Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeFilter === "watched" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => onFilterChange("watched")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === "watched"
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            İzlenenler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeFilter === "watchlist"
              ? styles.activeTab
              : styles.inactiveTab,
          ]}
          onPress={() => onFilterChange("watchlist")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeFilter === "watchlist"
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            İzlenecekler
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
