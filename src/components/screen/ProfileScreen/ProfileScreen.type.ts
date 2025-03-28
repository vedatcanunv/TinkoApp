import {StyleProp, ViewStyle} from 'react-native';

export interface ProfileScreenProps {
  /**
   * Çıkış yapıldığında çalışacak fonksiyon
   */
  onLogout: () => void;

  /**
   * İzlenen filmler butonuna tıklandığında çalışacak fonksiyon
   */
  onWatchedMoviesPress: () => void;

  /**
   * İzlenen diziler butonuna tıklandığında çalışacak fonksiyon
   */
  onWatchedTVShowsPress: () => void;
}

export interface GenreStats {
  id: number;
  name: string;
  percentage: number;
}

export interface PersonStats {
  id: number;
  name: string;
  count: number;
}

export interface UserStats {
  totalWatchedMovies: number;
  totalWatchedTVShows: number;
  favoriteGenres: GenreStats[];
  favoriteActors: PersonStats[];
  favoriteDirectors: PersonStats[];
}
