import React from "react";
import { View, FlatList, TouchableOpacity, Platform } from "react-native";
import { Text } from "../../atom/Text";
import { MovieCard, Movie } from "../../molecule/MovieCard";
import { styles } from "./MovieList.style";
import { MovieListProps } from "./MovieList.type";
import { LAYOUT } from "../../../helpers/layout";

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  title,
  titleColor = "primary",
  emptyText = "Henüz film eklenmemiş.",
  onMoviePress,
  showAddButton = false,
  onAddButtonPress,
  style,
  ...props
}) => {
  // Boş liste gösterimi
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{emptyText}</Text>
    </View>
  );

  // Film kartı renderlaması
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={onMoviePress} />
  );

  return (
    <View style={[styles.container, style]} {...props}>
      {/* Başlık alanı */}
      {title && (
        <View style={styles.header}>
          <Text size="xxxl" weight="bold" color={titleColor as any}>
            {title}
          </Text>

          {/* Ekleme butonu */}
          {showAddButton && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={onAddButtonPress}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Film listesi */}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={() => <View style={{ height: 250 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        bounces={true}
        overScrollMode="always"
        removeClippedSubviews={Platform.OS === "android"}
        windowSize={5}
        initialNumToRender={10}
      />
    </View>
  );
};
