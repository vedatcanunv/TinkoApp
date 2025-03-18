import { ReactNode } from "react";
import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";

export interface Genre {
  id: string | number;
  name: string;
}

export interface MediaContent {
  id: string | number;
  title: string;
  originalTitle?: string;
  posterUrl: string;
  imageURL?: string;
  year: string | number;
  genres: Genre[];
  type: "movie" | "series" | "tv";
  // Detay için ekstra bilgiler
  rating?: number;
  duration?: string;
  summary?: string;
  director?: string;
  cast?: string[];

  // API'den gelen ek bilgiler
  originalLanguage?: string;
  popularity?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  homepage?: string;
  productionCompanies?: {
    id: number;
    name: string;
    logo_path?: string;
    origin_country?: string;
  }[];
  productionCountries?: { iso_3166_1: string; name: string }[];
  numberOfSeasons?: number;
  numberOfEpisodes?: number;
}

export interface MediaCardProps extends Omit<TouchableOpacityProps, "onPress"> {
  /**
   * Medya içeriği (film veya dizi)
   */
  media: MediaContent;

  /**
   * Kart boyutu
   * @default "medium"
   */
  size?: "small" | "medium" | "large";

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
