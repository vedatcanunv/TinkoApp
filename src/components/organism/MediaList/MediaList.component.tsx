import React from "react";
import { FlatList, View } from "react-native";
import { Loading, Text } from "../../../components/atom";
import { MediaCard } from "../../molecule/MediaCard";
import { MediaContent } from "../../molecule/MediaCard/MediaCard.type";
import { styles } from "./MediaList.style";
import { MediaListProps } from "./MediaList.type";

export const MediaList: React.FC<MediaListProps> = ({
  data,
  onPress,
  onLoadMore,
  loadingMore,
  refreshing,
  onRefresh,
}) => {
  const renderItem = ({ item }: { item: MediaContent }) => (
    <View style={styles.gridItem}>
      <MediaCard media={item} size="small" onPress={onPress} />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerContainer}>
        <Loading size="small" color="primary" />
        <Text style={styles.footerText}>Daha fazla içerik yükleniyor...</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id.toString()}-${item.type}`}
      numColumns={2}
      contentContainerStyle={styles.mediaList}
      columnWrapperStyle={styles.mediaGridContainer}
      showsVerticalScrollIndicator={true}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={7}
      scrollEnabled={true}
      scrollEventThrottle={16}
      indicatorStyle="black"
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};
