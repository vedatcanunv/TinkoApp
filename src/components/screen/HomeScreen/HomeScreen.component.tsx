import React, { useCallback, useEffect, useState, useMemo } from "react";
import { View } from "react-native";
import { Button, ScreenContainer, Text } from "../../../components/atom";
import { MediaContent } from "../../../components/molecule/MediaCard/MediaCard.type";
import { tmdbService } from "../../../services";
import { MediaDetailCard } from "../../organism/MediaDetailCard";
import { SearchMovieModal } from "../../organism/SearchMovieModal";
import { MediaList } from "../../organism/MediaList";
import { StateView } from "../../molecule/StateView";
import { styles } from "./HomeScreen.style";
import { HomeScreenProps } from "./HomeScreen.type";
import { useUserMediaStore } from "../../../store/userMediaStore";

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const [media, setMedia] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);
  const [detailCardVisible, setDetailCardVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Store'dan fonksiyonları al
  const {
    addWatchedMovie,
    addWatchedSeries,
    addMovieToWatchlist,
    addSeriesToWatchlist,
  } = useUserMediaStore();

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

  // MediaContent tipindeki veriyi alıp detay kartı gösterecek fonksiyon
  const handleMediaPress = useCallback(async (media: MediaContent) => {
    setDetailLoading(true);
    setSelectedMedia(media);
    setDetailCardVisible(true);

    try {
      let detailResult: MediaContent | null = null;

      // Film veya dizi olmasına göre detay bilgisini getir
      if (media.type === "movie") {
        detailResult = await tmdbService.getMovieDetails(media.id as number);
      } else {
        detailResult = await tmdbService.getTVShowDetails(media.id as number);
      }

      if (detailResult) {
        setSelectedMedia(detailResult);
      }
    } catch (err) {
      console.error(`${media.title} detayları alınırken hata:`, err);
      // Hata durumunda mevcut medya bilgisiyle devam et
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // Detay kartını kapat - değiştirildi
  const handleCloseDetail = useCallback(() => {
    console.log("HomeScreen: Detay kartı kapatılıyor");

    // Sadece detay kartını kapat, modal durumunu değiştirme
    setDetailCardVisible(false);
    setSelectedMedia(null);

    // Modal görünürlüğünü değiştirmeden!
    // setSearchModalVisible durumunu DEĞİŞTİRME
  }, []);

  // İzlendi olarak işaretle
  const handleMarkAsWatched = useCallback(() => {
    if (selectedMedia) {
      if (selectedMedia.type === "movie") {
        addWatchedMovie(selectedMedia);
      } else {
        addWatchedSeries(selectedMedia);
      }
      console.log("İzlendi olarak işaretlendi:", selectedMedia.title);
      handleCloseDetail();
    }
  }, [selectedMedia, addWatchedMovie, addWatchedSeries]);

  // İzleme listesine ekle
  const handleAddToWatchlist = useCallback(() => {
    if (selectedMedia) {
      if (selectedMedia.type === "movie") {
        addMovieToWatchlist(selectedMedia);
      } else {
        addSeriesToWatchlist(selectedMedia);
      }
      console.log("İzleme listesine eklendi:", selectedMedia.title);
      handleCloseDetail();
    }
  }, [selectedMedia, addMovieToWatchlist, addSeriesToWatchlist]);

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

  // Filtreleme ve hesaplama işlemlerini useMemo ile optimize et
  const filteredMedia = useMemo(() => {
    if (!searchQuery) return media;
    return media.filter((media) =>
      media.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [media, searchQuery]);

  // Loading durumunu kontrol et
  const renderContent = () => {
    if (loading && page === 1 && !refreshing) {
      return null; // İlk yüklemede loading gösterme (splash'te yapıldı)
    }

    // İçerik render
  };

  // Ana yükleme ekranı
  if (loading && page === 1) {
    return (
      <ScreenContainer style={styles.loadingContainer}>
        <StateView loading={true} loadingText="İçerik yükleniyor..." />
      </ScreenContainer>
    );
  }

  // Hata ekranı
  if (error && media.length === 0) {
    return (
      <ScreenContainer style={styles.errorContainer}>
        <StateView error={error} errorText={error} />
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
        <StateView loading={true} loadingText="İçerikler yükleniyor..." />
      </View>
    );
  };

  return (
    <ScreenContainer style={[styles.container]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text
            size="xxxl"
            weight="bold"
            color="primary"
            style={{ fontSize: 32 }}
          >
            Tinko
          </Text>
        </View>
      </View>

      {/* MediaList bileşeni ile tüm medya içeriğini göster */}
      <MediaList
        data={filteredMedia}
        onPress={handleMediaPress}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {/* İçerik Arama Modal'ı */}
      <SearchMovieModal
        visible={searchModalVisible}
        onClose={handleCloseSearchModal}
      />

      {/* Daha fazla içerik yükleme göstergesi */}
      {renderLoadingOverlay()}

      {/* MediaDetailCard - detay kartını renderDetailCard yerine kullanıyoruz */}
      <MediaDetailCard
        media={selectedMedia}
        visible={detailCardVisible}
        onClose={handleCloseDetail}
        onMarkAsWatched={handleMarkAsWatched}
        onAddToWatchlist={handleAddToWatchlist}
        loading={detailLoading}
      />
    </ScreenContainer>
  );
};
