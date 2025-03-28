import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from '../../../components/atom';
import {MediaHeader} from '../../molecule/MediaHeader';
import {GenresList} from '../../molecule/GenresList';
import {DetailInfoRow} from '../../molecule/DetailInfoRow';
import {MediaActionButtons} from '../../molecule/MediaActionButtons';
import {styles} from './MediaDetailView.style';
import {MediaDetailViewProps} from './MediaDetailView.type';

export const MediaDetailView: React.FC<MediaDetailViewProps> = ({
  media,
  insets,
  onMarkAsWatched,
  onAddToWatchlist,
}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <MediaHeader media={media} insets={insets} />

      {/* Türler */}
      <GenresList genres={media.genres} />

      {/* Özet */}
      <View style={styles.summaryContainer}>
        <Text style={styles.sectionTitle}>Özet</Text>
        <Text style={styles.summaryText}>
          {media.summary || `${media.title} hakkında özet bilgi bulunamadı.`}
        </Text>
      </View>

      {/* Yapım Bilgileri */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Yapım Bilgileri</Text>

        {/* Yönetmen */}
        {media.director && <DetailInfoRow label="Yönetmen" value={media.director} />}

        {/* Türler */}
        {media.genres && (
          <DetailInfoRow label="Türler" value={media.genres.map(g => g.name).join(', ')} />
        )}

        {/* Oyuncular */}
        {media.cast && media.cast.length > 0 && (
          <DetailInfoRow label="Oyuncular" value={media.cast.join(', ')} />
        )}

        {/* Yıl */}
        <DetailInfoRow
          label="Yıl"
          value={typeof media.year === 'string' ? media.year : String(media.year)}
        />

        {/* Süre */}
        {media.duration && <DetailInfoRow label="Süre" value={media.duration} />}

        {/* IMDB Puanı */}
        {media.rating && (
          <DetailInfoRow label="IMDB Puanı" value={`${media.rating.toFixed(1)}/10`} />
        )}

        {/* Orijinal Dil */}
        {media.originalLanguage && (
          <DetailInfoRow label="Orijinal Dil" value={getLanguageName(media.originalLanguage)} />
        )}

        {/* Sezon ve Bölüm Sayısı - Sadece diziler için */}
        {media.type === 'tv' && (
          <>
            {media.numberOfSeasons && (
              <DetailInfoRow label="Sezon Sayısı" value={String(media.numberOfSeasons)} />
            )}
            {media.numberOfEpisodes && (
              <DetailInfoRow label="Bölüm Sayısı" value={String(media.numberOfEpisodes)} />
            )}
          </>
        )}

        {/* Yapım Ülkeleri */}
        {media.productionCountries && media.productionCountries.length > 0 && (
          <DetailInfoRow
            label="Yapım Ülkesi"
            value={media.productionCountries.map(c => c.name).join(', ')}
          />
        )}
      </View>

      {/* Aksiyon Butonları */}
      {onMarkAsWatched && onAddToWatchlist && (
        <MediaActionButtons
          onMarkAsWatched={onMarkAsWatched}
          onAddToWatchlist={onAddToWatchlist}
          bottomInset={insets.bottom}
        />
      )}
    </ScrollView>
  );
};

// Dil kodu-isim çevirisi
const getLanguageName = (languageCode: string): string => {
  const languages: Record<string, string> = {
    en: 'İngilizce',
    tr: 'Türkçe',
    ja: 'Japonca',
    ko: 'Korece',
    fr: 'Fransızca',
    de: 'Almanca',
    es: 'İspanyolca',
    it: 'İtalyanca',
    ru: 'Rusça',
    pt: 'Portekizce',
  };

  return languages[languageCode] || languageCode.toUpperCase();
};
