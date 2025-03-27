import { StyleProp, ViewStyle } from "react-native";

export interface StatisticCardProps {
  /**
   * İstatistik başlığı
   */
  title: string;

  /**
   * İstatistik değeri
   */
  value: number;

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
