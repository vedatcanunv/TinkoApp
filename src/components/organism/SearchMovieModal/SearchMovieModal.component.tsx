import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  InteractionManager,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  TouchableHighlight,
  View,
} from 'react-native';
import * as IconModule from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../helpers/colors';
import {tmdbService} from '../../../services';
import {useUserMediaStore} from '../../../store/userMediaStore';
import {Input, Loading, Text} from '../../atom';
import {Modal as CustomModal} from '../../atom/Modal';
import {MediaCard} from '../../molecule/MediaCard';
import {MediaContent} from '../../molecule/MediaCard/MediaCard.type';
import {StateView} from '../../molecule/StateView';
import {detailStyles, styles} from './SearchMovieModal.style';
import {SearchMovieModalProps} from './SearchMovieModal.type';

// Typescript için Cast işlemi
const Ionicons = IconModule.default as any;

export const SearchMovieModal: React.FC<SearchMovieModalProps> = ({visible, onClose, style}) => {
  // State tanımlamaları
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaContent | null>(null);
  const [movies, setMovies] = useState<MediaContent[]>([]);
  const [tvShows, setTvShows] = useState<MediaContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailCardVisible, setDetailCardVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentReady, setContentReady] = useState(false);
  const [modalReady, setModalReady] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const isClosingRef = useRef(false);

  // Store'dan fonksiyonları al
  const {addWatchedMovie, addWatchedSeries, addMovieToWatchlist, addSeriesToWatchlist} =
    useUserMediaStore();

  // Modal görünür olduğunda bir kere çalışacak ve içerik hazırlığını yapacak
  useEffect(() => {
    if (visible && !modalReady) {
      const timer = setTimeout(() => {
        setModalReady(true);
      }, 300);

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
          console.log('SearchMovieModal: İçerik yükleniyor...');
          InteractionManager.runAfterInteractions(async () => {
            try {
              const turkishContent = await tmdbService.getPopularInTurkey(1);

              if (!isClosingRef.current) {
                const popularMovies = turkishContent.filter(item => item.type === 'movie');
                const popularTVShows = turkishContent.filter(item => item.type === 'tv');

                setMovies(popularMovies);
                setTvShows(popularTVShows);
                setContentReady(true);
                setPage(2);
                setError(null);
                console.log("SearchMovieModal: Türkiye'de popüler içerik başarıyla yüklendi");
              }
            } catch (err) {
              if (!isClosingRef.current) {
                console.error('İçerik yüklenirken hata:', err);
                setError('İçerik yüklenemedi.');
                setContentReady(true);
              }
            } finally {
              if (!isClosingRef.current) {
                setLoading(false);
              }
            }
          });
        } catch (err) {
          console.error('İçerik yükleme başlatılamadı:', err);
          setLoading(false);
          setError('İçerik yüklenirken hata oluştu');
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
        setSearchQuery('');
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
        const foundMovies = searchResults.filter(item => item.type === 'movie');
        const foundTvShows = searchResults.filter(item => item.type === 'series');

        setMovies(foundMovies);
        setTvShows(foundTvShows);
        setError(null);
      } catch (err) {
        console.error(`"${searchQuery}" araması sırasında hata:`, err);
        setError('Arama yapılırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  // Arama alanı temizlendiğinde popüler içeriğe geri dön
  const handleClearSearch = useCallback(async () => {
    setSearchQuery('');
    setLoading(true);
    setPage(1);
    setHasMoreData(true);

    try {
      console.log("SearchMovieModal: Arama temizlendi, Türkiye'de popüler içerik getiriliyor...");
      const turkishContent = await tmdbService.getPopularInTurkey(1);

      // Film ve dizi olarak ayır
      const popularMovies = turkishContent.filter(item => item.type === 'movie');
      const popularTVShows = turkishContent.filter(item => item.type === 'tv');

      setMovies(popularMovies);
      setTvShows(popularTVShows);
      setPage(2); // Bir sonraki sayfa için
      setError(null);
    } catch (err) {
      console.error('İçerik yeniden yüklenirken hata:', err);
      setError('İçerik yüklenemedi. Örnek veriler gösteriliyor.');
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
      console.log(`SearchMovieModal: Sayfa ${page} için daha fazla içerik yükleniyor...`);
      const newTurkishContent = await tmdbService.getPopularInTurkey(page);

      if (newTurkishContent.length === 0) {
        setHasMoreData(false);
        return;
      }

      // Film ve dizi olarak ayır
      const newMovies = newTurkishContent.filter(item => item.type === 'movie');
      const newTVShows = newTurkishContent.filter(item => item.type === 'tv');

      // Mevcut içerikle yeni içeriği birleştir
      setMovies(prevMovies => {
        // Duplicate ID'leri önle
        const movieIds = new Set(prevMovies.map(m => m.id));
        const uniqueNewMovies = newMovies.filter(m => !movieIds.has(m.id));
        return [...prevMovies, ...uniqueNewMovies];
      });

      setTvShows(prevTVShows => {
        // Duplicate ID'leri önle
        const tvShowIds = new Set(prevTVShows.map(tv => tv.id));
        const uniqueNewTVShows = newTVShows.filter(tv => !tvShowIds.has(tv.id));
        return [...prevTVShows, ...uniqueNewTVShows];
      });

      // Bir sonraki sayfa için
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.error(`Sayfa ${page} için daha fazla içerik yüklenirken hata:`, err);
      setError('Daha fazla içerik yüklenirken hata oluştu');
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
      if (media.type === 'movie') {
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
    console.log('SearchMovieModal: Detay kartı kapatılıyor');

    // Hemen kapatma hissini vermek için
    setDetailCardVisible(false);

    // Animasyon için çok kısa bir süre bekleyelim, ancak selectedMedia'yı null yapmayalım
    // Bu sayede ana modal görünür kalacak
  }, []);

  // İzlendi olarak işaretle
  const handleMarkAsWatched = useCallback(() => {
    if (selectedMedia) {
      if (selectedMedia.type === 'movie') {
        addWatchedMovie(selectedMedia);
      } else {
        addWatchedSeries(selectedMedia);
      }
      console.log('İzlendi olarak işaretlendi:', selectedMedia.title);
      handleCloseDetail();
    }
  }, [selectedMedia, addWatchedMovie, addWatchedSeries]);

  // İzleme listesine ekle
  const handleAddToWatchlist = useCallback(() => {
    if (selectedMedia) {
      if (selectedMedia.type === 'movie') {
        addMovieToWatchlist(selectedMedia);
      } else {
        addSeriesToWatchlist(selectedMedia);
      }
      console.log('İzleme listesine eklendi:', selectedMedia.title);
    }
  }, [selectedMedia, addMovieToWatchlist, addSeriesToWatchlist]);

  // Grid görünümünde medya kartını render et
  const renderMediaItem = useCallback(
    ({item}: {item: MediaContent}) => (
      <View style={styles.gridItem}>
        <MediaCard media={item} size="small" onPress={handleMediaPress} />
      </View>
    ),
    [handleMediaPress]
  );

  // Modalı kapat
  const handleCloseModal = useCallback(() => {
    console.log('SearchMovieModal: Modal kapatılıyor');
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
        visible={detailCardVisible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent
        onRequestClose={handleCloseDetail}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View style={detailStyles.fullscreenModal}>
          {/* Backdrop ve Üst Katman */}
          <View style={detailStyles.backdropContainer}>
            <ImageBackground
              source={{
                uri: selectedMedia.posterUrl || 'https://picsum.photos/id/870/1000/800?blur=2',
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
                {detailLoading ? (
                  <View
                    style={[
                      detailStyles.poster,
                      {
                        backgroundColor: COLORS.grayLight,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <Loading size="large" color="primary" />
                  </View>
                ) : selectedMedia.posterUrl ? (
                  <Image
                    source={{
                      uri: selectedMedia.posterUrl,
                    }}
                    style={detailStyles.poster}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[detailStyles.poster, {backgroundColor: COLORS.grayLight}]}>
                    <Text style={{color: COLORS.white, textAlign: 'center'}}>Resim Yok</Text>
                  </View>
                )}
              </View>

              <View style={detailStyles.infoContainer}>
                {detailLoading ? (
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Loading size="small" color="primary" />
                    <Text style={[detailStyles.infoText, {marginTop: 8}]}>
                      Detaylar yükleniyor...
                    </Text>
                  </View>
                ) : (
                  <>
                    <Text style={detailStyles.title} numberOfLines={2}>
                      {selectedMedia.title}
                    </Text>

                    <View style={detailStyles.basicInfo}>
                      <Text style={detailStyles.infoText}>{selectedMedia.year}</Text>
                      <View style={detailStyles.dot} />
                      <Text style={detailStyles.infoText}>{selectedMedia.duration}</Text>
                      {selectedMedia.rating && (
                        <>
                          <View style={detailStyles.dot} />
                          <View style={detailStyles.rating}>
                            <Ionicons name="star" size={14} color={COLORS.warning} />
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
                      {selectedMedia.genres.map(genre => (
                        <View key={genre.id.toString()} style={detailStyles.genreItem}>
                          <Text style={detailStyles.genreText}>{genre.name}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  </>
                )}
              </View>
            </View>

            {/* Özet Bölümü - Loading durumunda gösterilmesin */}
            {!detailLoading && (
              <View style={[detailStyles.summaryContainer, {marginBottom: 15}]}>
                <Text style={detailStyles.summaryTitle}>Özet</Text>
                <Text style={detailStyles.summaryText}>
                  {selectedMedia.summary ? (
                    selectedMedia.summary
                  ) : (
                    <>
                      {`${selectedMedia.title}, `}
                      {selectedMedia.type === 'tv' ? 'Pembe Dizi' : ''}
                      {` ${selectedMedia.genres?.map(g => g.name).join(' ve ')} türlerinde `}
                      {selectedMedia.type === 'movie' ? 'bir film' : 'bir dizi'}
                      {'. '}
                      {selectedMedia.director &&
                        `Yapımın yönetmenliğini ${selectedMedia.director} üstleniyor. `}
                      {selectedMedia.cast &&
                        selectedMedia.cast.length > 0 &&
                        `Başrollerinde ${selectedMedia.cast.join(', ')} gibi ünlü isimler yer alıyor.`}
                    </>
                  )}
                </Text>
              </View>
            )}

            {/* Yapım Bilgileri - Loading durumunda gösterilmesin */}
            {!detailLoading && (
              <View style={[detailStyles.sectionContainer, {marginBottom: 70}]}>
                <Text style={detailStyles.sectionTitle}>Yapım Bilgileri</Text>

                {/* Yönetmen */}
                {selectedMedia.director && (
                  <View style={detailStyles.infoRow}>
                    <Text style={detailStyles.infoLabel}>Yönetmen:</Text>
                    <Text style={detailStyles.infoValue}>{selectedMedia.director}</Text>
                  </View>
                )}

                {/* Türler */}
                <View style={detailStyles.infoRow}>
                  <Text style={detailStyles.infoLabel}>Türler:</Text>
                  <Text style={detailStyles.infoValue}>
                    {selectedMedia.genres.map(g => g.name).join(', ')}
                  </Text>
                </View>

                {/* Oyuncular */}
                {selectedMedia.cast && selectedMedia.cast.length > 0 && (
                  <View style={detailStyles.infoRow}>
                    <Text style={detailStyles.infoLabel}>Oyuncular:</Text>
                    <Text style={detailStyles.infoValue}>{selectedMedia.cast.join(', ')}</Text>
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
                    <Text style={detailStyles.infoValue}>{selectedMedia.duration}</Text>
                  </View>
                )}

                {/* IMDB Puanı */}
                {selectedMedia.rating && (
                  <View style={detailStyles.infoRow}>
                    <Text style={detailStyles.infoLabel}>IMDB Puanı:</Text>
                    <Text style={detailStyles.infoValue}>{selectedMedia.rating.toFixed(1)}/10</Text>
                  </View>
                )}

                {/* Orijinal Dil */}
                {selectedMedia.originalLanguage && (
                  <View style={detailStyles.infoRow}>
                    <Text style={detailStyles.infoLabel}>Orijinal Dil:</Text>
                    <Text style={detailStyles.infoValue}>
                      {(() => {
                        switch (selectedMedia.originalLanguage) {
                          case 'en':
                            return 'İngilizce';
                          case 'tr':
                            return 'Türkçe';
                          case 'ja':
                            return 'Japonca';
                          case 'ko':
                            return 'Korece';
                          case 'fr':
                            return 'Fransızca';
                          case 'de':
                            return 'Almanca';
                          case 'es':
                            return 'İspanyolca';
                          case 'it':
                            return 'İtalyanca';
                          case 'ru':
                            return 'Rusça';
                          case 'pt':
                            return 'Portekizce';
                          default:
                            return selectedMedia.originalLanguage.toUpperCase();
                        }
                      })()}
                    </Text>
                  </View>
                )}

                {/* Sezon ve Bölüm Sayısı - Sadece diziler için */}
                {selectedMedia.type === 'tv' && (
                  <>
                    {selectedMedia.numberOfSeasons && (
                      <View style={detailStyles.infoRow}>
                        <Text style={detailStyles.infoLabel}>Sezon Sayısı:</Text>
                        <Text style={detailStyles.infoValue}>{selectedMedia.numberOfSeasons}</Text>
                      </View>
                    )}

                    {selectedMedia.numberOfEpisodes && (
                      <View style={detailStyles.infoRow}>
                        <Text style={detailStyles.infoLabel}>Bölüm Sayısı:</Text>
                        <Text style={detailStyles.infoValue}>{selectedMedia.numberOfEpisodes}</Text>
                      </View>
                    )}
                  </>
                )}

                {/* Yapım Ülkeleri */}
                {selectedMedia.productionCountries &&
                  selectedMedia.productionCountries.length > 0 && (
                    <View style={[detailStyles.infoRow, {marginBottom: 20}]}>
                      <Text style={detailStyles.infoLabel}>Yapım Ülkesi:</Text>
                      <Text style={detailStyles.infoValue}>
                        {selectedMedia.productionCountries.map(country => country.name).join(', ')}
                      </Text>
                    </View>
                  )}
              </View>
            )}
          </ScrollView>

          {/* Alt Butonlar - Scroll view dışına taşındı */}
          <View style={detailStyles.actionsContainer}>
            {Platform.OS === 'android' ? (
              <Pressable
                style={[detailStyles.secondaryButton, {flex: 1.5}]}
                onPress={handleCloseDetail}
                android_ripple={{
                  color: COLORS.primary,
                  borderless: true,
                  foreground: true,
                }}
              >
                <Text style={[detailStyles.buttonText, {color: COLORS.primary, fontSize: 16}]}>
                  Kapat
                </Text>
              </Pressable>
            ) : (
              <TouchableHighlight
                style={[detailStyles.secondaryButton, {flex: 1.5}]}
                onPress={handleCloseDetail}
                underlayColor="rgba(0,0,0,0.1)"
                activeOpacity={0.6}
              >
                <Text style={[detailStyles.buttonText, {color: COLORS.primary, fontSize: 16}]}>
                  Kapat
                </Text>
              </TouchableHighlight>
            )}
            <Pressable
              style={detailStyles.primaryButton}
              onPress={handleMarkAsWatched}
              android_ripple={{
                color: 'rgba(255,255,255,0.3)',
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
              <Text style={[detailStyles.buttonText, {color: COLORS.white, fontSize: 18}]}>
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
      <View style={{paddingVertical: 20, alignItems: 'center'}}>
        <Loading size="small" color="primary" />
        <Text style={{marginTop: 8, fontSize: 14, color: COLORS.textSecondary}}>
          Daha fazla içerik yükleniyor...
        </Text>
      </View>
    );
  };

  // Bu kısmı değiştirdik - detay kartını ayrı bir return ile döndürmek yerine ana UI içine ekliyoruz
  // Detay kartını ayrı bir komponent olarak render et, ancak return etme
  const detailCard = selectedMedia ? renderDetailCard() : null;

  return (
    <CustomModal visible={visible} onClose={handleCloseModal} height={90} style={style}>
      <View style={styles.container}>
        {/* Arama alanı */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Film veya dizi ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Ionicons name="search" size={20} color={COLORS.textLight} />}
            rightIcon={
              searchQuery ? (
                <Pressable onPress={handleClearSearch}>
                  <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
                </Pressable>
              ) : null
            }
          />
        </View>

        {/* Medya grid listesi */}
        <View style={{flex: 1}}>
          {loading ? (
            <StateView
              loading={true}
              loadingText={searchQuery ? 'Aranıyor...' : 'İçerik yükleniyor...'}
            />
          ) : error ? (
            <StateView error={error} errorText={error} />
          ) : allMedia.length === 0 ? (
            <StateView
              empty={true}
              emptyText={
                searchQuery
                  ? `"${searchQuery}" ile ilgili sonuç bulunamadı.`
                  : 'Görüntülenecek içerik bulunamadı.'
              }
            />
          ) : (
            <FlatList
              data={allMedia}
              renderItem={renderMediaItem}
              keyExtractor={item => `${item.id.toString()}-${item.type}`}
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
                console.log('Refreshing...');
                handleClearSearch();
              }}
              refreshing={loading}
            />
          )}
        </View>

        {/* Detay kartını burada ekleyelim */}
        {detailCard}
      </View>
    </CustomModal>
  );
};
