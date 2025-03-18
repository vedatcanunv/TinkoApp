// TMDB API yanıt tipleri

// API'den dönen genel yanıt formatı
export interface TMDBResponse<T> {
  page?: number;
  results?: T[];
  total_results?: number;
  total_pages?: number;
}

// Temel film/dizi nesnesi
export interface TMDBMediaBase {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string | null;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
}

// Film nesnesi
export interface TMDBMovie extends TMDBMediaBase {
  title: string;
  original_title: string;
  release_date: string;
  adult: boolean;
  video: boolean;
  original_language: string;
}

// Dizi nesnesi
export interface TMDBTVShow extends TMDBMediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  original_language: string;
}

// Detay tipleri
// Film detayları
export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: any | null;
  budget: number;
  genres: TMDBGenre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: TMDBCompany[];
  production_countries: TMDBCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: TMDBLanguage[];
  status: string;
  tagline: string | null;
}

// Dizi detayları
export interface TMDBTVShowDetails extends TMDBTVShow {
  created_by: TMDBCreator[];
  episode_run_time: number[];
  genres: TMDBGenre[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TMDBEpisode | null;
  next_episode_to_air: TMDBEpisode | null;
  networks: TMDBNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: TMDBCompany[];
  production_countries: TMDBCountry[];
  seasons: TMDBSeason[];
  spoken_languages: TMDBLanguage[];
  status: string;
  tagline: string | null;
  type: string;
}

// Yardımcı tipler
export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TMDBCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBCreator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface TMDBEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TMDBNetwork {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDBSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

// Krediler (oyuncular, ekip)
export interface TMDBCredits {
  id: number;
  cast: TMDBCast[];
  crew: TMDBCrew[];
}

export interface TMDBCast {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface TMDBCrew {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}
