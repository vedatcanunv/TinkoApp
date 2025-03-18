import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  Text as RNText,
  TouchableOpacity,
} from "react-native";
import { Button, ScreenContainer, Text } from "../../../components/atom";
import { Movie, MovieCard } from "../../../components/molecule/MovieCard";
import { mockDataService } from "../../../services";
import { styles } from "./HomeScreen.style";
import { HomeScreenProps } from "./HomeScreen.type";
import { COLORS } from "../../../helpers/colors";

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
        const response = (await mockDataService.getWatchedMovies()) as any;

        // API verilerini Movie tipine dönüştürme
        const formattedMovies: Movie[] = response.data.results.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            year: new Date(item.release_date).getFullYear(),
            genres: item.genres,
            posterUrl: item.poster_path,
            rating: item.vote_average,
          })
        );

        setMovies(formattedMovies);
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

  // MovieCard bileşeninden filmi alıp onMoviePress'e film ID'sini iletecek fonksiyon
  const handleMoviePress = (movie: Movie) => {
    onMoviePress(movie.id as number);
  };

  if (loading) {
    return (
      <ScreenContainer style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text size="l" color="light" style={styles.loadingText}>
          Filmler yükleniyor...
        </Text>
      </ScreenContainer>
    );
  }

  if (error) {
    return (
      <ScreenContainer style={styles.errorContainer}>
        <Text size="l" color="danger" style={styles.errorText}>
          {error}
        </Text>
        <Button
          title="Tekrar Dene"
          onPress={() => {
            setLoading(true);
            // Gerçek uygulamada burada API isteği tekrar yapılır
            mockDataService
              .getWatchedMovies()
              .then((response: any) => {
                // API verilerini Movie tipine dönüştürme
                const formattedMovies: Movie[] = response.data.results.map(
                  (item: any) => ({
                    id: item.id,
                    title: item.title,
                    year: new Date(item.release_date).getFullYear(),
                    genres: item.genres,
                    posterUrl: item.poster_path,
                    rating: item.vote_average,
                  })
                );

                setMovies(formattedMovies);
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
      </ScreenContainer>
    );
  }

  // Boş liste gösterimi
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text size="m" color="light" style={styles.emptyText}>
        Henüz izlediğiniz film bulunmuyor.
      </Text>
    </View>
  );

  // Film kartı renderlaması
  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={handleMoviePress} />
  );

  return (
    <ScreenContainer style={[styles.container]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text size="xxxl" weight="bold" color="primary">
            Tinko
          </Text>
        </View>
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={() => <View style={styles.listFooter} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          movies.length === 0
            ? styles.listContentContainerEmpty
            : styles.listContentContainer
        }
        style={styles.listStyle}
        removeClippedSubviews={false}
        bounces={movies.length > 4 ? true : false}
        overScrollMode="never"
        windowSize={5}
        initialNumToRender={5}
      />
    </ScreenContainer>
  );
};
