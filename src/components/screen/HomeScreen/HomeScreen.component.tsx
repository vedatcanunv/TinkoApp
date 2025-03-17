import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles } from "./HomeScreen.style";
import { HomeScreenProps, Movie } from "./HomeScreen.type";
import { Text, Button } from "../../../components/atom";
import { mockDataService } from "../../../services";

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onMoviePress,
  onAddPress,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        // Gerçek uygulamada API isteği yapılır
        // Şimdilik mock veri kullanıyoruz
        const response = await mockDataService.getWatchedMovies();
        setMovies(response.data.results);
      } catch (err) {
        console.error("Film verileri alınırken hata oluştu:", err);
        setError(
          "Film verileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => onMoviePress(item.id)}
    >
      <View style={styles.posterContainer}>
        <View style={styles.posterPlaceholder}>
          <Text variant="h3" color="light">
            {item.title.charAt(0)}
          </Text>
        </View>
      </View>
      <View style={styles.movieInfo}>
        <Text variant="subtitle" numberOfLines={1} style={styles.movieTitle}>
          {item.title}
        </Text>
        <Text variant="caption" color="light">
          {new Date(item.release_date).getFullYear()}
        </Text>
        <View style={styles.genreContainer}>
          {item.genres.slice(0, 2).map((genre) => (
            <View key={genre.id} style={styles.genreTag}>
              <Text variant="caption" color="light">
                {genre.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text variant="body" color="light" style={styles.loadingText}>
          Filmler yükleniyor...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="body" color="danger" style={styles.errorText}>
          {error}
        </Text>
        <Button
          title="Tekrar Dene"
          onPress={() => {
            setLoading(true);
            // Gerçek uygulamada burada API isteği tekrar yapılır
            mockDataService
              .getWatchedMovies()
              .then((response) => {
                setMovies(response.data.results);
                setError(null);
              })
              .catch((err) => {
                console.error("Film verileri alınırken hata oluştu:", err);
                setError(
                  "Film verileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
                );
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          variant="outline"
          style={styles.retryButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" color="primary">
          İzlediğim Filmler
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Text variant="h3" color="primary">
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="body" color="light" style={styles.emptyText}>
              Henüz izlediğiniz film bulunmuyor.
            </Text>
            <Button
              title="Film Ekle"
              onPress={onAddPress}
              style={styles.addMovieButton}
            />
          </View>
        }
      />
    </View>
  );
};
