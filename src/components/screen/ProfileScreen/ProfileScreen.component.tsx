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
import { Text, Button } from "../../../components/atom";
import { mockDataService } from "../../../services";

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
        const response = await mockDataService.getUserStats();
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
          <Text variant="bodySmall">{genre.name}</Text>
          <Text variant="bodySmall">{genre.percentage}%</Text>
        </View>
      </View>
    ));
  };

  const renderPersonStats = (persons: PersonStats[]) => {
    return persons.map((person) => (
      <View key={person.id} style={styles.personItem}>
        <View style={styles.personImagePlaceholder}>
          <Text variant="body" color="light">
            {person.name.charAt(0)}
          </Text>
        </View>
        <View style={styles.personInfo}>
          <Text variant="bodySmall">{person.name}</Text>
          <Text variant="caption" color="light">
            {person.count} film
          </Text>
        </View>
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text variant="body" color="light" style={styles.loadingText}>
          Profil bilgileri yükleniyor...
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
              .getUserStats()
              .then((response) => {
                setUserStats(response.data);
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" color="primary">
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
              <Text variant="h3" color="primary">
                {userStats?.totalWatchedMovies || 0}
              </Text>
              <Text variant="bodySmall" color="light">
                İzlenen Film
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text variant="h3" color="primary">
                {userStats?.totalWatchedTVShows || 0}
              </Text>
              <Text variant="bodySmall" color="light">
                İzlenen Dizi
              </Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Favori Türler
            </Text>
            <View style={styles.sectionContent}>
              {userStats?.favoriteGenres &&
                renderGenreStats(userStats.favoriteGenres)}
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Favori Oyuncular
            </Text>
            <View style={styles.sectionContent}>
              {userStats?.favoriteActors &&
                renderPersonStats(userStats.favoriteActors)}
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text variant="subtitle" style={styles.sectionTitle}>
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
    </View>
  );
};
