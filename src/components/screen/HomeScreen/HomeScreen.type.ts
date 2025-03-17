export interface HomeScreenProps {
  /**
   * Film kartına tıklandığında çalışacak fonksiyon
   */
  onMoviePress: (movieId: number) => void;

  /**
   * Film ekle butonuna tıklandığında çalışacak fonksiyon
   */
  onAddPress: () => void;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  liked: boolean;
}
