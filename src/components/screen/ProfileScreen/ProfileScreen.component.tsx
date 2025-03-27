import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { ScreenContainer, Text } from "../../atom";
import { StatisticsList } from "../../molecule/StatisticsList";
import { GenreStats } from "../../molecule/GenreStats";
import { PersonStats } from "../../molecule/PersonStats";
import { ProfileMediaList } from "../../organism/ProfileMediaList";
import { useUserMediaStore } from "../../../store/userMediaStore";
import { styles } from "./ProfileScreen.style";
import { ProfileScreenProps } from "./ProfileScreen.type";
import { LAYOUT } from "../../../helpers/layout";
import {
  calculateMovieGenreStats,
  calculateSeriesGenreStats,
  calculateDirectorStats,
  calculateActorStats,
} from "../../../utils/mediaStats";

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  const {
    watchedMovies,
    watchedSeries,
    watchlistMovies,
    watchlistSeries,
    getStats,
  } = useUserMediaStore();

  const stats = getStats();

  // Film türlerinin istatistiklerini hesapla
  const movieGenreStats = useMemo(
    () => calculateMovieGenreStats(watchedMovies),
    [watchedMovies]
  );

  // Dizi türlerinin istatistiklerini hesapla
  const seriesGenreStats = useMemo(
    () => calculateSeriesGenreStats(watchedSeries),
    [watchedSeries]
  );

  // Yönetmen istatistiklerini hesapla
  const directorStats = useMemo(
    () => calculateDirectorStats([...watchedMovies, ...watchedSeries]),
    [watchedMovies, watchedSeries]
  );

  // Oyuncu istatistiklerini hesapla
  const actorStats = useMemo(
    () => calculateActorStats([...watchedMovies, ...watchedSeries]),
    [watchedMovies, watchedSeries]
  );

  const handleMediaPress = (media: any) => {
    // TODO: Medya detay sayfasına yönlendirme yapılacak
    console.log("Seçilen medya:", media);
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: LAYOUT.TAB_BAR_HEIGHT + LAYOUT.BOTTOM_PADDING,
        }}
      >
        <View style={styles.header}>
          <Text
            size="xxl"
            weight="bold"
            color="primary"
            style={{ fontSize: 32 }}
          >
            Profilim
          </Text>
        </View>

        <View style={styles.section}>
          <StatisticsList stats={stats} style={styles.stats} />
        </View>

        {movieGenreStats.length > 0 && (
          <View style={styles.section}>
            <GenreStats title="Film Türleri" genres={movieGenreStats} />
          </View>
        )}

        {seriesGenreStats.length > 0 && (
          <View style={styles.section}>
            <GenreStats title="Dizi Türleri" genres={seriesGenreStats} />
          </View>
        )}

        {directorStats.length > 0 && (
          <View style={styles.section}>
            <PersonStats
              title="En Çok İzlenen Yönetmenler"
              persons={directorStats}
            />
          </View>
        )}

        {actorStats.length > 0 && (
          <View style={styles.section}>
            <PersonStats
              title="En Çok İzlenen Oyuncular"
              persons={actorStats}
            />
          </View>
        )}

        <View style={styles.section}>
          <ProfileMediaList
            title="İçeriklerim"
            watchedMedia={[...watchedMovies, ...watchedSeries]}
            watchlistMedia={[...watchlistMovies, ...watchlistSeries]}
            onMediaPress={handleMediaPress}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};
