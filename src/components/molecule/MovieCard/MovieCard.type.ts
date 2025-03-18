import { TouchableOpacityProps, ViewProps } from "react-native";

export interface Genre {
  id: string | number;
  name: string;
}

export interface Movie {
  id: string | number;
  title: string;
  year: string | number;
  genres: Genre[];
  posterUrl?: string;
  rating?: number;
}

export interface MovieCardProps extends Omit<TouchableOpacityProps, "onPress"> {
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
  size?: "small" | "medium" | "large";

  /**
   * Film kartına tıklandığında çalışacak fonksiyon
   */
  onPress?: (movie: Movie) => void;
}
