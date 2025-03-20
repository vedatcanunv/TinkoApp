import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  FlatList,
  Pressable,
  Image,
  Animated,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StatusBar,
  ImageBackground,
  Platform,
  Dimensions,
  InteractionManager,
} from "react-native";
import { Input, Text, Button, Loading } from "../../atom";
import { Modal as CustomModal } from "../../atom/Modal";
import { MediaCard } from "../../molecule/MediaCard";
import { styles, detailStyles } from "./SearchMovieModal.style";
import { MovieOrSeries, SearchMovieModalProps } from "./SearchMovieModal.type";
import * as IconModule from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../helpers/colors";
import { tmdbService } from "../../../services";
import { MediaContent } from "../../molecule/MediaCard/MediaCard.type";
import { SPACING } from "../../../helpers/styleKit";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

// Typescript için Cast işlemi
const Ionicons = IconModule.default as any;

// Genişlik ve yüksekliği al
const { width, height } = Dimensions.get("window");

// Yeni modern detay kartı stil tanımlamaları - KALDIRILDI, .style.ts'e taşındı

// Yedek örnek veri (API çağrısı başarısız olursa kullanılacak)
const SAMPLE_MOVIES: MovieOrSeries[] = [
  {
    id: 1,
    title: "Başlangıç",
    originalTitle: "Inception",
    posterUrl: "https://picsum.photos/id/1/300/450",
    year: 2010,
    rating: 8.8,
    duration: "2s 28dk",
    summary:
      "Dom Cobb, zihinlerin derinliklerine inerek değerli sırları çalmakta usta bir hırsızdır. Bu nadir yetenek, onu kurumsal casusluk dünyasında aranılan biri haline getirmiştir, ancak aynı zamanda uluslararası bir kaçak olmasına ve sevdiği her şeyi kaybetmesine neden olmuştur.",
    genres: [
      { id: 1, name: "Bilim Kurgu" },
      { id: 2, name: "Aksiyon" },
      { id: 3, name: "Gerilim" },
    ],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    type: "movie",
  },
  {
    id: 2,
    title: "Breaking Bad",
    originalTitle: "Breaking Bad",
    posterUrl: "https://picsum.photos/id/2/300/450",
    year: 2008,
    rating: 9.5,
    duration: "5 Sezon",
    summary:
      "Kanser teşhisi konulan bir kimya öğretmeni, ailesinin geleceğini güvence altına almak için metamfetamin üretip satmaya başlar ve suç dünyasında hızla yükselir.",
    genres: [
      { id: 4, name: "Dram" },
      { id: 5, name: "Suç" },
      { id: 6, name: "Gerilim" },
    ],
    director: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    type: "series",
  },
  // Diğer örnek veriler buradan kaldırıldı
];

export const SearchMovieModal: React.FC<SearchMovieModalProps> = ({
  visible,
  onClose,
  style,
}) => {
  // State tanımlamaları
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);
  const [movies, setMovies] = useState<MediaContent[]>([]);
  const [tvShows, setTvShows] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // Daha fazla içerik yüklenirken
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailCardVisible, setDetailCardVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentReady, setContentReady] = useState(false);
  const [modalReady, setModalReady] = useState(false);
  const [page, setPage] = useState(1); // Sayfa numarası
  const [hasMoreData, setHasMoreData] = useState(true); // Daha fazla veri var mı
  const isClosingRef = useRef(false);

  // Modal görünür olduğunda bir kere çalışacak ve içerik hazırlığını yapacak
  useEffect(() => {
    if (visible && !modalReady) {
      // Önce modal animasyonunun tamamlanmasını bekleyelim
      const timer = setTimeout(() => {
        setModalReady(true);
      }, 300); // 300ms tipik bir modal açılma animasyonu süresi

      return () => clearTimeout(timer);
    }
  }, [visible, modalReady]);

  // Modal hazır olduğunda içerik yüklemeyi başlat
  useEffect(() => {
    if (visible && modalReady && !contentReady) {
      const fetchInitialContent = async () => {
        setLoading(true);
        setError(null);

        try {
          console.log("SearchMovieModal: İçerik yükleniyor...");
          // İçerik yükleme işlemini etkileşimlerin ardından yap
          InteractionManager.runAfterInteractions(async () => {
            try {
              // Türkiye'de popüler içerikleri getir
              const turkishContent = await tmdbService.getPopularInTurkey(1);

              if (!isClosingRef.current) {
                // Film ve dizi olarak ayır
                const popularMovies = turkishContent.filter(
                  (item) => item.type === "movie"
                );
                const popularTVShows = turkishContent.filter(
                  (item) => item.type === "tv"
                );

                setMovies(popularMovies);
                setTvShows(popularTVShows);
                setContentReady(true);
                setPage(2); // Bir sonraki sayfa için
                setError(null);
                console.log(
                  "SearchMovieModal: Türkiye'de popüler içerik başarıyla yüklendi"
                );
              }
            } catch (err) {
              if (!isClosingRef.current) {
                console.error("İçerik yüklenirken hata:", err);
                setError("İçerik yüklenemedi. Örnek veriler gösteriliyor.");
                // Hata durumunda örnek verileri göster
                setMovies(
                  SAMPLE_MOVIES.filter(
                    (m) => m.type === "movie"
                  ) as MediaContent[]
                );
                setTvShows(
                  SAMPLE_MOVIES.filter(
                    (m) => m.type === "series"
                  ) as MediaContent[]
                );
                setContentReady(true);
              }
            } finally {
              if (!isClosingRef.current) {
                setLoading(false);
              }
            }
          });
        } catch (err) {
          console.error("İçerik yükleme başlatılamadı:", err);
          setLoading(false);
          setError("İçerik yüklenirken hata oluştu");
        }
      };

      fetchInitialContent();
    }
  }, [visible, modalReady, contentReady]);

  // Modal kapandığında state'leri sıfırla
  useEffect(() => {
    if (!visible) {
      // Sonraki açılışta yeniden içerik yüklemek için
      setContentReady(false);
      setModalReady(false);
      isClosingRef.current = false;

      // Diğer state'leri temizlemek için bir timeout kullan
      // Bu sayede kapanma animasyonu sırasında UI'da garip davranışlar olmaz
      const timer = setTimeout(() => {
        setSearchQuery("");
        setSelectedMedia(null);
        setDetailCardVisible(false);
        setMovies([]);
        setTvShows([]);
        setError(null);
        setPage(1);
        setHasMoreData(true);
      }, 300); // 300ms tipik bir modal kapanma animasyonu süresi

      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Arama yap (debounce ile)
  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    const searchTimer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const searchResults = await tmdbService.searchMedia(searchQuery);
        // Arama sonuçlarını film ve diziye göre ayır
        const foundMovies = searchResults.filter(
          (item) => item.type === "movie"
        );
        const foundTvShows = searchResults.filter(
          (item) => item.type === "series"
        );

        setMovies(foundMovies);
        setTvShows(foundTvShows);
        setError(null);
      } catch (err) {
        console.error(`"${searchQuery}" araması sırasında hata:`, err);
        setError("Arama yapılırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  // Arama alanı temizlendiğinde popüler içeriğe geri dön
  const handleClearSearch = useCallback(async () => {
    setSearchQuery("");
    setLoading(true);
    setPage(1);
    setHasMoreData(true);

    try {
      console.log(
        "SearchMovieModal: Arama temizlendi, Türkiye'de popüler içerik getiriliyor..."
      );
      const turkishContent = await tmdbService.getPopularInTurkey(1);

      // Film ve dizi olarak ayır
      const popularMovies = turkishContent.filter(
        (item) => item.type === "movie"
      );
      const popularTVShows = turkishContent.filter(
        (item) => item.type === "tv"
      );

      setMovies(popularMovies);
      setTvShows(popularTVShows);
      setPage(2); // Bir sonraki sayfa için
      setError(null);
    } catch (err) {
      console.error("İçerik yeniden yüklenirken hata:", err);
      setError("İçerik yüklenemedi. Örnek veriler gösteriliyor.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Daha fazla içerik yükle
  const handleLoadMore = useCallback(async () => {
    // Eğer arama modu aktifse, daha fazla içerik yüklemeye gerek yok
    if (searchQuery || loading || loadingMore || !hasMoreData || error) {
      return;
    }

    setLoadingMore(true);

    try {
      console.log(
        `SearchMovieModal: Sayfa ${page} için daha fazla içerik yükleniyor...`
      );
      const newTurkishContent = await tmdbService.getPopularInTurkey(page);

      if (newTurkishContent.length === 0) {
        setHasMoreData(false);
        return;
      }

      // Film ve dizi olarak ayır
      const newMovies = newTurkishContent.filter(
        (item) => item.type === "movie"
      );
      const newTVShows = newTurkishContent.filter((item) => item.type === "tv");

      // Mevcut içerikle yeni içeriği birleştir
      setMovies((prevMovies) => {
        // Duplicate ID'leri önle
        const movieIds = new Set(prevMovies.map((m) => m.id));
        const uniqueNewMovies = newMovies.filter((m) => !movieIds.has(m.id));
        return [...prevMovies, ...uniqueNewMovies];
      });

      setTvShows((prevTVShows) => {
        // Duplicate ID'leri önle
        const tvShowIds = new Set(prevTVShows.map((tv) => tv.id));
        const uniqueNewTVShows = newTVShows.filter(
          (tv) => !tvShowIds.has(tv.id)
        );
        return [...prevTVShows, ...uniqueNewTVShows];
      });

      // Bir sonraki sayfa için
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.error(
        `Sayfa ${page} için daha fazla içerik yüklenirken hata:`,
        err
      );
      setError("Daha fazla içerik yüklenirken hata oluştu");
    } finally {
      setLoadingMore(false);
    }
  }, [page, searchQuery, loading, loadingMore, hasMoreData, error]);

  // Tüm medya içeriği
  const allMedia = useMemo(() => {
    // Filmleri ve dizileri birleştir, karıştır
    return [...movies, ...tvShows].sort(() => Math.random() - 0.5);
  }, [movies, tvShows]);

  // Medya öğesine tıklandığında
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

  // Detay kartını kapat
  const handleCloseDetail = useCallback(() => {
    console.log("SearchMovieModal: Detay kartı kapatılıyor");

    // Hemen kapatma hissini vermek için
    setDetailCardVisible(false);

    // Animasyon bitiminde medya bilgisini sıfırla
    setTimeout(() => {
      console.log("SearchMovieModal: Seçili medya sıfırlanıyor");
      setSelectedMedia(null);
    }, 300);
  }, []);

  // İzlendi olarak işaretle
  const handleMarkAsWatched = useCallback(() => {
    // Burada izlendi olarak işaretleme mantığı olacak
    console.log("İzlendi olarak işaretlendi:", selectedMedia?.title);
    handleCloseDetail();
  }, [selectedMedia]);

  // Grid görünümünde medya kartını render et
  const renderMediaItem = useCallback(
    ({ item }: { item: MediaContent }) => (
      <View style={styles.gridItem}>
        <MediaCard media={item} size="small" onPress={handleMediaPress} />
      </View>
    ),
    [handleMediaPress]
  );

  // Modalı kapat
  const handleCloseModal = useCallback(() => {
    console.log("SearchMovieModal: Modal kapatılıyor");
    isClosingRef.current = true;

    // UI thread'i bloke etmemek için InteractionManager kullanıyoruz
    InteractionManager.runAfterInteractions(() => {
      // Önce detay açıksa kapatalım
      if (detailCardVisible) {
        setDetailCardVisible(false);
        // Biraz bekleyip sonra modalı kapatalım
        setTimeout(() => {
          setSelectedMedia(null);
          onClose();
        }, 200);
      } else {
        onClose();
      }
    });
  }, [detailCardVisible, onClose]);

  // Film detaylarını gösteren kart bileşeni
  const renderDetailCard = () => {
    if (!selectedMedia) {
      return null;
    }

    return (
      <Modal
        visible={!!selectedMedia}
        animationType="fade"
        transparent={true}
        statusBarTranslucent
        onRequestClose={handleCloseDetail}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={detailStyles.fullscreenModal}>
          {/* Backdrop ve Üst Katman */}
          <View style={detailStyles.backdropContainer}>
            <ImageBackground
              source={{
                uri:
                  selectedMedia.posterUrl ||
                  "https://picsum.photos/id/870/1000/800?blur=2",
              }}
              style={detailStyles.backdrop}
              resizeMode="cover"
            >
              <View style={detailStyles.overlayBackground} />
            </ImageBackground>
          </View>

          {/* Ana İçerik */}
          <ScrollView
            style={detailStyles.contentContainer}
            contentContainerStyle={detailStyles.contentScrollContainer}
            showsVerticalScrollIndicator={true}
            scrollEnabled={true}
            bounces={true}
            alwaysBounceVertical={false}
            decelerationRate="fast"
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            scrollEventThrottle={16}
            indicatorStyle="white"
            fadingEdgeLength={0}
            removeClippedSubviews={true}
          >
            {/* Poster ve Temel Bilgiler */}
            <View style={detailStyles.posterAndInfoContainer}>
              <View style={detailStyles.posterContainer}>
                {selectedMedia.posterUrl ? (
                  <Image
                    source={{
                      uri: selectedMedia.posterUrl,
                    }}
                    style={detailStyles.poster}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={[
                      detailStyles.poster,
                      { backgroundColor: COLORS.grayLight },
                    ]}
                  >
                    <Text style={{ color: COLORS.white, textAlign: "center" }}>
                      Resim Yok
                    </Text>
                  </View>
                )}
              </View>

              <View style={detailStyles.infoContainer}>
                <Text style={detailStyles.title} numberOfLines={2}>
                  {selectedMedia.title}
                </Text>

                <View style={detailStyles.basicInfo}>
                  <Text style={detailStyles.infoText}>
                    {selectedMedia.year}
                  </Text>
                  <View style={detailStyles.dot} />
                  <Text style={detailStyles.infoText}>
                    {selectedMedia.duration}
                  </Text>
                  {selectedMedia.rating && (
                    <>
                      <View style={detailStyles.dot} />
                      <View style={detailStyles.rating}>
                        <Ionicons
                          name="star"
                          size={14}
                          color={COLORS.warning}
                        />
                        <Text style={detailStyles.ratingText}>
                          {selectedMedia.rating.toFixed(1)}
                        </Text>
                      </View>
                    </>
                  )}
                </View>

                {/* Türler */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={detailStyles.genresScrollContainer}
                >
                  {selectedMedia.genres.map((genre) => (
                    <View
                      key={genre.id.toString()}
                      style={detailStyles.genreItem}
                    >
                      <Text style={detailStyles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Özet Bölümü - Her zaman görünsün */}
            <View style={[detailStyles.summaryContainer, { marginBottom: 15 }]}>
              <Text style={detailStyles.summaryTitle}>Özet</Text>
              <Text style={detailStyles.summaryText}>
                {selectedMedia.summary ? (
                  selectedMedia.summary
                ) : (
                  <>
                    {`${selectedMedia.title}, `}
                    {selectedMedia.type === "tv" ? "Pembe Dizi" : ""}
                    {` ${selectedMedia.genres?.map((g) => g.name).join(" ve ")} türlerinde `}
                    {selectedMedia.type === "movie" ? "bir film" : "bir dizi"}
                    {". "}
                    {selectedMedia.director &&
                      `Yapımın yönetmenliğini ${selectedMedia.director} üstleniyor. `}
                    {selectedMedia.cast &&
                      selectedMedia.cast.length > 0 &&
                      `Başrollerinde ${selectedMedia.cast.join(", ")} gibi ünlü isimler yer alıyor.`}
                  </>
                )}
              </Text>
            </View>

            {/* Yapım Bilgileri */}
            <View style={[detailStyles.sectionContainer, { marginBottom: 70 }]}>
              <Text style={detailStyles.sectionTitle}>Yapım Bilgileri</Text>

              {/* Yönetmen */}
              {selectedMedia.director && (
                <View style={detailStyles.infoRow}>
                  <Text style={detailStyles.infoLabel}>Yönetmen:</Text>
                  <Text style={detailStyles.infoValue}>
                    {selectedMedia.director}
                  </Text>
                </View>
              )}

              {/* Türler */}
              <View style={detailStyles.infoRow}>
                <Text style={detailStyles.infoLabel}>Türler:</Text>
                <Text style={detailStyles.infoValue}>
                  {selectedMedia.genres.map((g) => g.name).join(", ")}
                </Text>
              </View>

              {/* Oyuncular */}
              {selectedMedia.cast && selectedMedia.cast.length > 0 && (
                <View style={detailStyles.infoRow}>
                  <Text style={detailStyles.infoLabel}>Oyuncular:</Text>
                  <Text style={detailStyles.infoValue}>
                    {selectedMedia.cast.join(", ")}
                  </Text>
                </View>
              )}

              {/* Yıl */}
              <View style={detailStyles.infoRow}>
                <Text style={detailStyles.infoLabel}>Yıl:</Text>
                <Text style={detailStyles.infoValue}>{selectedMedia.year}</Text>
              </View>

              {/* Süre */}
              {selectedMedia.duration && (
                <View style={detailStyles.infoRow}>
                  <Text style={detailStyles.infoLabel}>Süre:</Text>
                  <Text style={detailStyles.infoValue}>
                    {selectedMedia.duration}
                  </Text>
                </View>
              )}

              {/* IMDB Puanı */}
              {selectedMedia.rating && (
                <View style={detailStyles.infoRow}>
                  <Text style={detailStyles.infoLabel}>IMDB Puanı:</Text>
                  <Text style={detailStyles.infoValue}>
                    {selectedMedia.rating.toFixed(1)}/10
                  </Text>
                </View>
              )}

              {/* Orijinal Dil */}
              {selectedMedia.originalLanguage && (
                <View style={detailStyles.infoRow}>
                  <Text style={detailStyles.infoLabel}>Orijinal Dil:</Text>
                  <Text style={detailStyles.infoValue}>
                    {(() => {
                      switch (selectedMedia.originalLanguage) {
                        case "en":
                          return "İngilizce";
                        case "tr":
                          return "Türkçe";
                        case "ja":
                          return "Japonca";
                        case "ko":
                          return "Korece";
                        case "fr":
                          return "Fransızca";
                        case "de":
                          return "Almanca";
                        case "es":
                          return "İspanyolca";
                        case "it":
                          return "İtalyanca";
                        case "ru":
                          return "Rusça";
                        case "pt":
                          return "Portekizce";
                        default:
                          return selectedMedia.originalLanguage.toUpperCase();
                      }
                    })()}
                  </Text>
                </View>
              )}

              {/* Sezon ve Bölüm Sayısı - Sadece diziler için */}
              {selectedMedia.type === "tv" && (
                <>
                  {selectedMedia.numberOfSeasons && (
                    <View style={detailStyles.infoRow}>
                      <Text style={detailStyles.infoLabel}>Sezon Sayısı:</Text>
                      <Text style={detailStyles.infoValue}>
                        {selectedMedia.numberOfSeasons}
                      </Text>
                    </View>
                  )}

                  {selectedMedia.numberOfEpisodes && (
                    <View style={detailStyles.infoRow}>
                      <Text style={detailStyles.infoLabel}>Bölüm Sayısı:</Text>
                      <Text style={detailStyles.infoValue}>
                        {selectedMedia.numberOfEpisodes}
                      </Text>
                    </View>
                  )}
                </>
              )}

              {/* Yapım Ülkeleri */}
              {selectedMedia.productionCountries &&
                selectedMedia.productionCountries.length > 0 && (
                  <View style={[detailStyles.infoRow, { marginBottom: 20 }]}>
                    <Text style={detailStyles.infoLabel}>Yapım Ülkesi:</Text>
                    <Text style={detailStyles.infoValue}>
                      {selectedMedia.productionCountries
                        .map((country) => country.name)
                        .join(", ")}
                    </Text>
                  </View>
                )}
            </View>
          </ScrollView>

          {/* Alt Butonlar - Scroll view dışına taşındı */}
          <View style={detailStyles.actionsContainer}>
            {Platform.OS === "android" ? (
              <Pressable
                style={[detailStyles.secondaryButton, { flex: 1.5 }]}
                onPress={handleCloseDetail}
                android_ripple={{
                  color: COLORS.primary,
                  borderless: true,
                  foreground: true,
                }}
              >
                <Text
                  style={[
                    detailStyles.buttonText,
                    { color: COLORS.primary, fontSize: 16 },
                  ]}
                >
                  Kapat
                </Text>
              </Pressable>
            ) : (
              <TouchableHighlight
                style={[detailStyles.secondaryButton, { flex: 1.5 }]}
                onPress={handleCloseDetail}
                underlayColor="rgba(0,0,0,0.1)"
                activeOpacity={0.6}
              >
                <Text
                  style={[
                    detailStyles.buttonText,
                    { color: COLORS.primary, fontSize: 16 },
                  ]}
                >
                  Kapat
                </Text>
              </TouchableHighlight>
            )}
            <Pressable
              style={detailStyles.primaryButton}
              onPress={handleMarkAsWatched}
              android_ripple={{
                color: "rgba(255,255,255,0.3)",
                borderless: true,
                foreground: true,
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={COLORS.white}
                style={detailStyles.buttonIcon}
              />
              <Text
                style={[
                  detailStyles.buttonText,
                  { color: COLORS.white, fontSize: 18 },
                ]}
              >
                İzledim
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  // Render footer - Daha fazla içerik yüklenirken gösterilecek
  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <Loading size="small" color="primary" />
        <Text
          style={{ marginTop: 8, fontSize: 14, color: COLORS.textSecondary }}
        >
          Daha fazla içerik yükleniyor...
        </Text>
      </View>
    );
  };

  // Detay kartını gösterme değişikliği
  if (detailCardVisible && selectedMedia) {
    return renderDetailCard();
  }

  return (
    <CustomModal
      visible={visible}
      onClose={handleCloseModal}
      height={90}
      style={style}
    >
      <View style={styles.container}>
        {/* Arama alanı */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Film veya dizi ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={
              <Ionicons name="search" size={20} color={COLORS.textLight} />
            }
            rightIcon={
              searchQuery ? (
                <Pressable onPress={handleClearSearch}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={COLORS.textLight}
                  />
                </Pressable>
              ) : null
            }
          />
        </View>

        {/* Medya grid listesi */}
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading size="large" color="primary" />
              <Text size="m" color="light" style={styles.loadingText}>
                {searchQuery ? "Aranıyor..." : "İçerik yükleniyor..."}
              </Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text size="m" color="danger" style={styles.errorText}>
                {error}
              </Text>
            </View>
          ) : allMedia.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text size="m" color="light" style={styles.emptyText}>
                {searchQuery
                  ? `"${searchQuery}" ile ilgili sonuç bulunamadı.`
                  : "Görüntülenecek içerik bulunamadı."}
              </Text>
            </View>
          ) : (
            <FlatList
              data={allMedia}
              renderItem={renderMediaItem}
              keyExtractor={(item) => `${item.id.toString()}-${item.type}`}
              numColumns={2}
              contentContainerStyle={styles.mediaList}
              columnWrapperStyle={styles.mediaGridContainer}
              showsVerticalScrollIndicator={true}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={7}
              scrollEnabled={true}
              scrollEventThrottle={16}
              indicatorStyle="black"
              onRefresh={() => {
                console.log("Refreshing...");
                handleClearSearch();
              }}
              refreshing={loading}
            />
          )}
        </View>
      </View>
    </CustomModal>
  );
};
