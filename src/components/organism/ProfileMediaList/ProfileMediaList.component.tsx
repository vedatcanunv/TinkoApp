import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Text } from "../../atom/Text";
import { MediaListHeader } from "../../molecule/MediaListHeader";
import { MediaCard } from "../../molecule/MediaCard";
import { styles } from "./ProfileMediaList.style";
import { ProfileMediaListProps } from "./ProfileMediaList.type";
import type { MediaFilter } from "../../molecule/MediaListHeader";

export const ProfileMediaList: React.FC<ProfileMediaListProps> = ({
  title,
  watchedMedia,
  watchlistMedia,
  onMediaPress,
  style,
}) => {
  const [activeFilter, setActiveFilter] = useState<MediaFilter>("watched");

  const mediaData = activeFilter === "watched" ? watchedMedia : watchlistMedia;

  return (
    <View style={[styles.container, style]}>
      <MediaListHeader
        title={title}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <FlatList
        data={mediaData}
        renderItem={({ item }) => (
          <MediaCard
            media={item}
            onPress={() => onMediaPress(item)}
            style={styles.mediaCard}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text size="m" color="light">
              {activeFilter === "watched"
                ? "Henüz izlenen içerik yok"
                : "İzleme listesi boş"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
