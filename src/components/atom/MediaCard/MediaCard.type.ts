import {StyleProp, ViewStyle} from 'react-native';

export interface MediaCardProps {
  /**
   * Medya başlığı
   */
  title: string;

  /**
   * Poster URL'i
   */
  posterUrl: string;

  /**
   * Medya tipi
   */
  type: 'movie' | 'series';

  /**
   * Puan (opsiyonel)
   */
  rating?: number;

  /**
   * Tıklama callback'i
   */
  onPress: () => void;

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
