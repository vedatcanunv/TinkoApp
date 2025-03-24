import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "../../../components/atom";
import { GenresListProps } from "./GenresList.type";
import { styles } from "./GenresList.style";

export const GenresList: React.FC<GenresListProps> = ({ genres }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.genresContainer}
      contentContainerStyle={styles.genresContentContainer}
    >
      {genres.map((genre) => (
        <View key={genre.id.toString()} style={styles.genreItem}>
          <Text style={styles.genreText}>{genre.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
