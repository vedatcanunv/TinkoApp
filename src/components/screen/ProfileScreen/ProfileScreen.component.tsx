import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./ProfileScreen.style";
import {
  ProfileScreenProps,
  UserStats,
  GenreStats,
  PersonStats,
} from "./ProfileScreen.type";
import { Text, Button, ScreenContainer } from "../../../components/atom";
import { mockDataService } from "../../../services";
import { COLORS } from "../../../helpers/colors";

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  onWatchedMoviesPress,
  onWatchedTVShowsPress,
}) => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true);
        setError(null);
        // Gerçek uygulamada API isteği yapılır
        // Şimdilik mock veri kullanıyoruz
        const response = (await mockDataService.getUserStats()) as {
          data: UserStats;
        };
        setUserStats(response.data);
      } catch (err) {
        console.error("Kullanıcı istatistikleri alınırken hata oluştu:", err);
        setError(
          "Kullanıcı istatistikleri yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  const renderGenreStats = (genres: GenreStats[]) => {
    return genres.map((genre) => (
      <View key={genre.id} style={styles.statItem}>
        <View style={styles.statBar}>
          <View
            style={[styles.statBarFill, { width: `${genre.percentage}%` }]}
          />
        </View>
        <View style={styles.statLabelContainer}>
          <Text size="m">{genre.name}</Text>
          <Text size="m">{genre.percentage}%</Text>
        </View>
      </View>
    ));
  };

  const renderPersonStats = (persons: PersonStats[]) => {
    return persons.map((person) => (
      <View key={person.id} style={styles.personItem}>
        <View style={styles.personImagePlaceholder}>
          <Text size="l" color="light">
            {person.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.personInfo}>
          <Text size="m">{person.name}</Text>
          <Text size="s" color="light">
            {person.count} film
          </Text>
        </View>
      </View>
    ));
  };

  if (loading) {
    return (
      <ScreenContainer style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text size="l" color="light" style={styles.loadingText}>
          Profil bilgileri yükleniyor...
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
              .getUserStats()
              .then((response: unknown) => {
                const typedResponse = response as { data: UserStats };
                setUserStats(typedResponse.data);
                setError(null);
              })
              .catch((err) => {
                console.error(
                  "Kullanıcı istatistikleri alınırken hata oluştu:",
                  err
                );
                setError(
                  "Kullanıcı istatistikleri yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
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

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text size="xxxl" weight="bold" color="primary">
          Profilim
        </Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text size="xxxl" color="primary">
                {userStats?.totalWatchedMovies || 0}
              </Text>
              <Text size="m" color="light">
                İzlenen Film
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text size="xxxl" color="primary">
                {userStats?.totalWatchedTVShows || 0}
              </Text>
              <Text size="m" color="light">
                İzlenen Dizi
              </Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text size="xl" weight="semibold" style={styles.sectionTitle}>
              Favori Türler
            </Text>
            <View style={styles.sectionContent}>
              {userStats?.favoriteGenres &&
                renderGenreStats(userStats.favoriteGenres)}
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text size="xl" weight="semibold" style={styles.sectionTitle}>
              Favori Oyuncular
            </Text>
            <View style={styles.sectionContent}>
              {userStats?.favoriteActors &&
                renderPersonStats(userStats.favoriteActors)}
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text size="xl" weight="semibold" style={styles.sectionTitle}>
              Favori Yönetmenler
            </Text>
            <View style={styles.sectionContent}>
              {userStats?.favoriteDirectors &&
                renderPersonStats(userStats.favoriteDirectors)}
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="İzlediğim Filmler"
            onPress={onWatchedMoviesPress}
            style={styles.actionButton}
          />
          <Button
            title="İzlediğim Diziler"
            onPress={onWatchedTVShowsPress}
            style={styles.actionButton}
          />
          <Button
            title="Çıkış Yap"
            onPress={onLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};
