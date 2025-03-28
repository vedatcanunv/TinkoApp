import {StyleProp, ViewStyle} from 'react-native';

export interface Genre {
  id: string | number;
  name: string;
}

export interface MediaType {
  id: string | number;
  name: string;
  color: string;
}

export interface MovieOrSeries {
  id: string | number;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  year: string | number;
  rating?: number;
  duration?: string;
  summary?: string;
  genres: Genre[];
  director?: string;
  cast?: string[];
  type: 'movie' | 'series';
}

export interface SearchMovieModalProps {
  /**
   * Modal açık mı?
   */
  visible: boolean;

  /**
   * Modal kapatılınca çalışacak fonksiyon
   */
  onClose: () => void;

  /**
   * Modal container stil özellikleri
   */
  style?: StyleProp<ViewStyle>;
}
