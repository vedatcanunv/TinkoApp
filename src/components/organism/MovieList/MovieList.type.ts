import { ViewProps } from "react-native";
import { Movie } from "../../molecule/MovieCard";

export interface MovieListProps extends ViewProps {
  /**
   * Film listesi
   */
  movies: Movie[];

  /**
   * Liste başlığı
   */
  title?: string;

  /**
   * Başlık rengi
   * @default "primary"
   */
  titleColor?: "default" | "primary" | "secondary";

  /**
   * Boş liste mesajı
   * @default "Henüz film eklenmemiş."
   */
  emptyText?: string;

  /**
   * Film kartına tıklandığında çalışacak fonksiyon
   */
  onMoviePress?: (movie: Movie) => void;

  /**
   * + butonu gösterilsin mi?
   * @default false
   */
  showAddButton?: boolean;

  /**
   * + butonuna tıklandığında çalışacak fonksiyon
   */
  onAddButtonPress?: () => void;
}
