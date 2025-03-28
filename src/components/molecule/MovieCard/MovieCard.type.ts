import {TouchableOpacityProps, ViewProps} from 'react-native';

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

export interface Movie {
  /**
   * Film ID'si
   */
  id: string | number;

  /**
   * Film başlığı
   */
  title: string;

  /**
   * Film yapım yılı
   */
  year: string | number;

  /**
   * Film türleri
   */
  genres: Genre[];

  /**
   * Film poster URL'i
   */
  posterUrl?: string;

  /**
   * Film puanı
   */
  rating?: number;
}

export interface MovieCardProps extends Omit<TouchableOpacityProps, 'onPress'> {
  /**
   * Film verisi
   */
  movie: Movie;

  /**
   * Film posteri yoksa gösterilecek yer tutucu
   */
  placeholderText?: string;

  /**
   * Kart boyutu varyantı
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Film kartına tıklandığında çalışacak fonksiyon
   */
  onPress?: (movie: Movie) => void;
}
