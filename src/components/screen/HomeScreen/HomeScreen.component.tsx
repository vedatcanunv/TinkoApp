import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { Button, ScreenContainer, Text } from "../../../components/atom";
import { MediaContent } from "../../../components/molecule/MediaCard/MediaCard.type";
import { MediaCard } from "../../../components/molecule/MediaCard";
import { SearchMovieModal } from "../../organism/SearchMovieModal";
import { tmdbService } from "../../../services";
import { styles } from "./HomeScreen.style";
import { HomeScreenProps } from "./HomeScreen.type";
import { COLORS } from "../../../helpers/colors";
import * as IconModule from "react-native-vector-icons/Ionicons";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

// Typescript için Cast işlemi
const Ionicons = IconModule.default as any;

// Navigation parametreleri
type RootStackParamList = {
  MovieDetails: { movieId: number | string };
  TVShowDetails: { tvShowId: number | string };
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onMoviePress,
  onAddPress,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [media, setMedia] = useState<MediaContent[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  // SearchMovieModal'ı aç/kapat
  const handleOpenSearchModal = () => {
    setSearchModalVisible(true);
    onAddPress(); // Üst bileşene bildir
  };

  const handleCloseSearchModal = () => {
    setSearchModalVisible(false);
  };

  const fetchMedia = useCallback(
    async (pageNum: number, refresh: boolean = false) => {
      try {
        if (refresh) {
          setRefreshing(true);
        } else if (pageNum === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        // Yükleme başlangıç zamanı
        const loadingStartTime = Date.now();
        setError(null);

        console.log(
          `Türkiye'de popüler içerikler yükleniyor... Sayfa: ${pageNum}`
        );
        // Türkiye'de popüler içerikleri getir
        const results = await tmdbService.getPopularInTurkey(pageNum);

        // Mevcut yükleme süresi
        const currentLoadingTime = Date.now() - loadingStartTime;

        // Minimum gösterim süresi (1.5 saniye)
        const minimumLoadingTime = 1500;

        // Eğer yükleme çok hızlı tamamlandıysa, overlay'in görünür kalması için gecikme ekle
        if (currentLoadingTime < minimumLoadingTime) {
          await new Promise((resolve) =>
            setTimeout(resolve, minimumLoadingTime - currentLoadingTime)
          );
        }

        if (results && results.length > 0) {
          if (pageNum === 1 || refresh) {
            setMedia(results); // İlk sayfa veya yenileme ise verileri sıfırla
            setFilteredMedia(results); // Başlangıçta filtreleme yok
          } else {
            // Tekrarlanan öğeleri filtrele - fonksiyon formunu kullanarak güncel media'ya erişim
            setMedia((prevMedia) => {
              const existingIds = new Set(
                prevMedia.map((item) => `${item.id}-${item.type}`)
              );
              const uniqueNewResults = results.filter(
                (item) => !existingIds.has(`${item.id}-${item.type}`)
              );

              console.log(
                `Yüklenen yeni öğe sayısı: ${results.length}, Tekrarsız: ${uniqueNewResults.length}`
              );

              if (uniqueNewResults.length === 0) {
                console.log(
                  "Tüm yeni öğeler zaten mevcut, daha fazla yükleme iptal edildi"
                );
                setHasMoreData(false);
                return prevMedia; // Değişiklik yok, önceki durumu döndür
              }

              // Önceki medya ile yeni benzersiz öğeleri birleştir
              return [...prevMedia, ...uniqueNewResults];
            });

            // FilteredMedia için de aynı mantığı uygula
            setFilteredMedia((prevFilteredMedia) => {
              const existingIds = new Set(
                prevFilteredMedia.map((item) => `${item.id}-${item.type}`)
              );
              const uniqueNewResults = results.filter(
                (item) => !existingIds.has(`${item.id}-${item.type}`)
              );

              if (uniqueNewResults.length === 0) {
                return prevFilteredMedia; // Değişiklik yok, önceki durumu döndür
              }

              return [...prevFilteredMedia, ...uniqueNewResults];
            });
          }
          setHasMoreData(results.length >= 20); // API genelde sayfa başına 20 sonuç döndürür
        } else {
          if (pageNum === 1) {
            setError("İçerik bulunamadı. Lütfen tekrar deneyin.");
          }
          setHasMoreData(false);
        }
      } catch (err) {
        console.error("İçerik yüklenirken hata oluştu:", err);
        setError("İçerik yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [] // media bağımlılığını kaldırdık
  );

  // MediaContent tipindeki veriyi alıp onMoviePress'e film ID'sini iletecek fonksiyon
  const handleMediaPress = (media: MediaContent) => {
    if (media.type === "movie") {
      navigation.navigate("MovieDetails", { movieId: media.id });
    } else if (media.type === "tv") {
      navigation.navigate("TVShowDetails", { tvShowId: media.id });
    }
  };

  // İlk yükleme
  useEffect(() => {
    console.log("İlk içerik yüklemesi yapılıyor...");
    fetchMedia(1);
  }, []);

  // Yenileme işlemi (pull-to-refresh)
  const handleRefresh = useCallback(() => {
    setPage(1);
    fetchMedia(1, true);
  }, [fetchMedia]);

  // Daha fazla içerik yükleme (infinite scroll)
  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMoreData) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      fetchMedia(nextPage);

      // Yükleme overlay'ini biraz daha uzun süre göster (en az 1.5 saniye)
      setTimeout(() => {
        // Bu timeout, yükleme tamamlansa bile overlay'in en az 1.5 saniye görünmesini sağlar
        // Bu sayede kullanıcı daha yavaş scroll yapmaya teşvik edilir
      }, 1500);
    }
  }, [loadingMore, hasMoreData, page, fetchMedia]);

  // Ana yükleme ekranı
  if (loading && page === 1) {
    return (
      <ScreenContainer style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text size="l" color="light" style={styles.loadingText}>
          İçerik yükleniyor...
        </Text>
      </ScreenContainer>
    );
  }

  // Hata ekranı
  if (error && media.length === 0) {
    return (
      <ScreenContainer style={styles.errorContainer}>
        <Text size="l" color="danger" style={styles.errorText}>
          {error}
        </Text>
        <Button
          title="Tekrar Dene"
          onPress={() => {
            setPage(1);
            fetchMedia(1);
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
        Görüntülenecek içerik bulunamadı.
      </Text>
    </View>
  );

  // Medya kartı renderlaması
  const renderMediaItem = ({ item }: { item: MediaContent }) => (
    <View style={styles.mediaItem}>
      <MediaCard media={item} onPress={handleMediaPress} />
    </View>
  );

  // Liste footer (loading daha fazla)
  const renderFooter = () => {
    if (!loadingMore) return <View style={styles.listFooter} />;

    // Footer'da yükleme göstergesi yerine boş bir view döndür
    // Yükleme göstergesi ayrı bir overlay olarak gösterilecek
    return <View style={styles.listFooter} />;
  };

  // Yükleme durumunda ekranın ortasında gösterilecek overlay
  const renderLoadingOverlay = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.loadingOverlay}>
        <View style={styles.loadingOverlayContent}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text size="m" color="light" style={styles.loadingOverlayText}>
            İçerikler yükleniyor...
          </Text>
          <Text
            size="s"
            color="light"
            style={[styles.loadingOverlayText, { marginTop: 8 }]}
          >
            Lütfen bekleyin
          </Text>
        </View>
      </View>
    );
  };

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
        data={filteredMedia}
        renderItem={renderMediaItem}
        keyExtractor={(item) =>
          `${item.id}-${item.type}-${Math.random().toString(36).substring(7)}`
        }
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={
          filteredMedia.length > 0 ? styles.columnWrapper : undefined
        }
        contentContainerStyle={
          filteredMedia.length === 0
            ? styles.listContentContainerEmpty
            : styles.listContentContainer
        }
        style={styles.listStyle}
        removeClippedSubviews={true}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        initialNumToRender={6}
        maxToRenderPerBatch={5}
        windowSize={5}
      />

      {/* İçerik Arama Modal'ı */}
      <SearchMovieModal
        visible={searchModalVisible}
        onClose={handleCloseSearchModal}
      />

      {renderLoadingOverlay()}
    </ScreenContainer>
  );
};
