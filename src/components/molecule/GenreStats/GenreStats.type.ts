import {StyleProp, ViewStyle} from 'react-native';

export interface Genre {
  /**
   * Tür ID'si
   */
  id: number;

  /**
   * Tür adı
   */
  name: string;

  /**
   * Türün toplam içerikteki yüzdesi
   */
  percentage: number;
}

export interface GenreStatsProps {
  /**
   * Başlık
   */
  title: string;

  /**
   * Tür istatistikleri
   */
  genres: Genre[];

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
