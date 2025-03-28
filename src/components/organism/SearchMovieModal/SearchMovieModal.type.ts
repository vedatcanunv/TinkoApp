import {StyleProp, ViewStyle} from 'react-native';

/**
 * Film ve dizi türlerini temsil eden interface
 */
export interface Genre {
  /**
   * Tür ID'si
   */
  id: string | number;

  /**
   * Tür adı (örn: "Aksiyon", "Dram", "Komedi")
   */
  name: string;
}

/**
 * Medya tipini temsil eden interface (Film veya Dizi)
 */
export interface MediaType {
  /**
   * Medya tipi ID'si
   */
  id: string | number;

  /**
   * Medya tipi adı (örn: "Film", "Dizi")
   */
  name: string;

  /**
   * Medya tipini temsil eden renk kodu
   */
  color: string;
}

/**
 * Film veya dizi bilgilerini içeren interface
 */
export interface MovieOrSeries {
  /**
   * Film veya dizi ID'si
   */
  id: string | number;

  /**
   * Film veya dizinin başlığı
   */
  title: string;

  /**
   * Film veya dizinin orijinal başlığı (varsa)
   */
  originalTitle?: string;

  /**
   * Film veya dizinin poster görseli URL'i
   */
  posterUrl: string;

  /**
   * Yapım yılı
   */
  year: string | number;

  /**
   * IMDB puanı (varsa)
   */
  rating?: number;

  /**
   * Süre bilgisi (Film için dakika, Dizi için sezon sayısı)
   */
  duration?: string;

  /**
   * Özet bilgisi
   */
  summary?: string;

  /**
   * Film veya dizinin türleri
   */
  genres: Genre[];

  /**
   * Yönetmen bilgisi (varsa)
   */
  director?: string;

  /**
   * Oyuncu kadrosu (varsa)
   */
  cast?: string[];

  /**
   * Medya tipi ('movie' veya 'series')
   */
  type: 'movie' | 'series';
}

/**
 * SearchMovieModal bileşeninin props interface'i
 * Film ve dizi arama modalının özelliklerini tanımlar
 */
export interface SearchMovieModalProps {
  /**
   * Modal'ın görünürlük durumu
   * @default false
   */
  visible: boolean;

  /**
   * Modal kapatıldığında çağrılacak fonksiyon
   * Kullanıcı geri tuşuna bastığında veya modal kapatıldığında tetiklenir
   */
  onClose: () => void;

  /**
   * Modal container'ının stil özellikleri
   * Modal'ın görünümünü özelleştirmek için kullanılır
   * @optional
   */
  style?: StyleProp<ViewStyle>;
}
