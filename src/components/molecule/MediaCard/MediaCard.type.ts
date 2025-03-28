import {ReactNode} from 'react';
import {StyleProp, TouchableOpacityProps, ViewStyle} from 'react-native';

export interface Genre {
  /**
   * Tür ID'si
   */
  id: string | number;

  /**
   * Tür adı
   */
  name: string;
}

export interface MediaContent {
  /**
   * Medya ID'si
   */
  id: string | number;

  /**
   * Medya başlığı
   */
  title: string;

  /**
   * Medya orijinal başlığı
   */
  originalTitle?: string;

  /**
   * Medya poster URL'i
   */
  posterUrl: string;

  /**
   * Medya görsel URL'i
   */
  imageURL?: string;

  /**
   * Medya yapım yılı
   */
  year: string | number;

  /**
   * Medya türleri
   */
  genres: Genre[];

  /**
   * Medya tipi (film, dizi veya tv)
   */
  type: 'movie' | 'series' | 'tv';

  // Detay için ekstra bilgiler
  /**
   * Medya puanı
   */
  rating?: number;

  /**
   * Medya süresi
   */
  duration?: string;

  /**
   * Medya özeti
   */
  summary?: string;

  /**
   * Medya yönetmeni
   */
  director?: string;

  /**
   * Medya oyuncuları
   */
  cast?: string[];

  // API'den gelen ek bilgiler
  /**
   * Medya orijinal dili
   */
  originalLanguage?: string;

  /**
   * Medya popülerlik puanı
   */
  popularity?: number;

  /**
   * Medya bütçesi
   */
  budget?: number;

  /**
   * Medya geliri
   */
  revenue?: number;

  /**
   * Medya durumu
   */
  status?: string;

  /**
   * Medya web sitesi
   */
  homepage?: string;

  /**
   * Medya yapım şirketleri
   */
  productionCompanies?: {
    /**
     * Şirket ID'si
     */
    id: number;

    /**
     * Şirket adı
     */
    name: string;

    /**
     * Şirket logo URL'i
     */
    logo_path?: string;

    /**
     * Şirket ülke kodu
     */
    origin_country?: string;
  }[];

  /**
   * Medya yapım ülkeleri
   */
  productionCountries?: {
    /**
     * Ülke ISO kodu
     */
    iso_3166_1: string;

    /**
     * Ülke adı
     */
    name: string;
  }[];

  /**
   * Dizi sezon sayısı
   */
  numberOfSeasons?: number;

  /**
   * Dizi bölüm sayısı
   */
  numberOfEpisodes?: number;
}

export interface MediaCardProps extends Omit<TouchableOpacityProps, 'onPress'> {
  /**
   * Medya içeriği (film veya dizi)
   */
  media: MediaContent;

  /**
   * Kart boyutu
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Medyaya tıklandığında çalışacak fonksiyon
   */
  onPress?: (media: MediaContent) => void;

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Film/Dizi etiketini göster
   * @default true
   */
  showType?: boolean;

  /**
   * En fazla kaç tür etiketi gösterileceği
   * @default 3
   */
  maxGenreTags?: number;
}
