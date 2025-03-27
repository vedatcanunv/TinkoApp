import { StyleProp, ViewStyle } from "react-native";

export type MediaFilter = "watched" | "watchlist";

export interface MediaListHeaderProps {
  /**
   * Başlık
   */
  title: string;

  /**
   * Aktif filtre
   */
  activeFilter: MediaFilter;

  /**
   * Filtre değişikliği callback'i
   */
  onFilterChange: (filter: MediaFilter) => void;

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
