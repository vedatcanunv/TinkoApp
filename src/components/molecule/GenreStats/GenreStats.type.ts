import { StyleProp, ViewStyle } from "react-native";

export interface Genre {
  id: number;
  name: string;
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
