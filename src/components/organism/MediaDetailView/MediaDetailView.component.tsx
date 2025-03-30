import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  Pressable,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles} from './MediaDetailView.style';
import {MediaDetailViewProps} from './MediaDetailView.type';
import {COLORS} from '../../../helpers/colors';
import {MediaContent} from '../../molecule/MediaCard/MediaCard.type';

export const MediaDetailView: React.FC<MediaDetailViewProps> = ({
  media,
  insets,
  onClose,
  onMarkAsWatched,
  onAddToWatchlist,
}) => {
  if (!media) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Backdrop ve Üst Katman */}
      <View style={styles.backdropContainer}>
        <ImageBackground
          source={{
            uri: media.posterUrl || 'https://picsum.photos/id/870/1000/800?blur=2',
          }}
          style={styles.backdrop}
          resizeMode="cover"
        >
          <View style={styles.overlayBackground} />
        </ImageBackground>
      </View>

      {/* Ana İçerik */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={[styles.contentScrollContainer, {paddingTop: insets.top + 20}]}
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
        <View style={styles.posterAndInfoContainer}>
          <View style={styles.posterContainer}>
            {media.posterUrl ? (
              <Image
                source={{
                  uri: media.posterUrl,
                }}
                style={styles.poster}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.poster, {backgroundColor: COLORS.grayLight}]}>
                <Text style={{color: COLORS.white, textAlign: 'center'}}>Resim Yok</Text>
              </View>
            )}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {media.title}
            </Text>

            <View style={styles.basicInfo}>
              <Text style={styles.infoText}>{media.year}</Text>
              <View style={styles.dot} />
              <Text style={styles.infoText}>{media.duration}</Text>
              {media.rating && (
                <>
                  <View style={styles.dot} />
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color={COLORS.warning} />
                    <Text style={styles.ratingText}>{media.rating.toFixed(1)}</Text>
                  </View>
                </>
              )}
            </View>

            {/* Türler */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.genresScrollContainer}
            >
              {media.genres.map(genre => (
                <View key={genre.id.toString()} style={styles.genreItem}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Özet Bölümü */}
        <View style={[styles.summaryContainer, {marginBottom: 15}]}>
          <Text style={styles.summaryTitle}>Özet</Text>
          <Text style={styles.summaryText}>
            {media.summary ? (
              media.summary
            ) : (
              <>
                {`${media.title}, `}
                {media.type === 'tv' ? 'Pembe Dizi' : ''}
                {` ${media.genres?.map(g => g.name).join(' ve ')} türlerinde `}
                {media.type === 'movie' ? 'bir film' : 'bir dizi'}
                {'. '}
                {media.director && `Yapımın yönetmenliğini ${media.director} üstleniyor. `}
                {media.cast &&
                  media.cast.length > 0 &&
                  `Başrollerinde ${media.cast.join(', ')} gibi ünlü isimler yer alıyor.`}
              </>
            )}
          </Text>
        </View>

        {/* Yapım Bilgileri */}
        <View style={[styles.sectionContainer, {marginBottom: 70}]}>
          <Text style={styles.sectionTitle}>Yapım Bilgileri</Text>

          {/* Yönetmen */}
          {media.director && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Yönetmen:</Text>
              <Text style={styles.infoValue}>{media.director}</Text>
            </View>
          )}

          {/* Türler */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Türler:</Text>
            <Text style={styles.infoValue}>{media.genres.map(g => g.name).join(', ')}</Text>
          </View>

          {/* Oyuncular */}
          {media.cast && media.cast.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Oyuncular:</Text>
              <Text style={styles.infoValue}>{media.cast.join(', ')}</Text>
            </View>
          )}

          {/* Yıl */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Yıl:</Text>
            <Text style={styles.infoValue}>{media.year}</Text>
          </View>

          {/* Süre */}
          {media.duration && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Süre:</Text>
              <Text style={styles.infoValue}>{media.duration}</Text>
            </View>
          )}

          {/* IMDB Puanı */}
          {media.rating && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>IMDB Puanı:</Text>
              <Text style={styles.infoValue}>{media.rating.toFixed(1)}/10</Text>
            </View>
          )}

          {/* Orijinal Dil */}
          {media.originalLanguage && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Orijinal Dil:</Text>
              <Text style={styles.infoValue}>
                {(() => {
                  switch (media.originalLanguage) {
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
                      return media.originalLanguage.toUpperCase();
                  }
                })()}
              </Text>
            </View>
          )}

          {/* Sezon ve Bölüm Sayısı - Sadece diziler için */}
          {media.type === 'tv' && (
            <>
              {media.numberOfSeasons && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Sezon Sayısı:</Text>
                  <Text style={styles.infoValue}>{media.numberOfSeasons}</Text>
                </View>
              )}

              {media.numberOfEpisodes && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Bölüm Sayısı:</Text>
                  <Text style={styles.infoValue}>{media.numberOfEpisodes}</Text>
                </View>
              )}
            </>
          )}

          {/* Yapım Ülkeleri */}
          {media.productionCountries && media.productionCountries.length > 0 && (
            <View style={[styles.infoRow, {marginBottom: 20}]}>
              <Text style={styles.infoLabel}>Yapım Ülkesi:</Text>
              <Text style={styles.infoValue}>
                {media.productionCountries.map(country => country.name).join(', ')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Alt Butonlar */}
      <View style={[styles.actionsContainer, {paddingBottom: insets.bottom + 16}]}>
        {Platform.OS === 'android' ? (
          <Pressable style={[styles.secondaryButton, {flex: 1.5}]} onPress={onAddToWatchlist}>
            <Text style={[styles.buttonText, {color: COLORS.primary, fontSize: 16}]}>
              İzleme Listeme Ekle
            </Text>
          </Pressable>
        ) : (
          <TouchableHighlight
            style={[styles.secondaryButton, {flex: 1.5}]}
            onPress={onAddToWatchlist}
            underlayColor="rgba(0,0,0,0.1)"
            activeOpacity={0.6}
          >
            <Text style={[styles.buttonText, {color: COLORS.primary, fontSize: 16}]}>
              İzleme Listeme Ekle
            </Text>
          </TouchableHighlight>
        )}
        <Pressable
          style={styles.primaryButton}
          onPress={onMarkAsWatched}
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
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonText, {color: COLORS.white, fontSize: 18}]}>İzledim</Text>
        </Pressable>
      </View>
    </View>
  );
};
