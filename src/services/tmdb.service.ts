import axios, { AxiosResponse } from "axios";
import {
  TMDBResponse,
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetails,
  TMDBTVShowDetails,
  TMDBCredits,
  TMDBGenre,
} from "./tmdb.types";
import {
  MediaContent,
  Genre,
} from "../components/molecule/MediaCard/MediaCard.type";
import { TMDB_API_KEY } from "@env";

// TMDB API için temel URL ve API anahtarı
// API anahtarı .env dosyasından alınıyor
const API_KEY = TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "tr-TR";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";
const BACKDROP_SIZE = "original";

// API istekleri için axios instance'ı
const tmdbAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

// Tür bilgilerini tutacak değişkenler
let movieGenres: TMDBGenre[] = [];
let tvGenres: TMDBGenre[] = [];

// Tür bilgilerini yükle
const loadGenres = async () => {
  try {
    // Film ve dizi türlerini paralel olarak getir
    const [movieGenresResponse, tvGenresResponse] = await Promise.all([
      tmdbAPI.get<{ genres: TMDBGenre[] }>("/genre/movie/list"),
      tmdbAPI.get<{ genres: TMDBGenre[] }>("/genre/tv/list"),
    ]);

    movieGenres = movieGenresResponse.data.genres;
    tvGenres = tvGenresResponse.data.genres;

    console.log(
      "Tür bilgileri yüklendi:",
      `Film türleri: ${movieGenres.length}`,
      `Dizi türleri: ${tvGenres.length}`
    );
  } catch (error) {
    console.error("Tür bilgileri yüklenirken hata:", error);
  }
};

// Uygulama başladığında tür bilgilerini yükle
loadGenres();

// Tür ID'sine göre türün adını bul
const getGenreNameById = (id: number, isMovie: boolean = true): string => {
  const genresList = isMovie ? movieGenres : tvGenres;
  const genre = genresList.find((g) => g.id === id);
  return genre ? genre.name : "Bilinmeyen";
};

// Yardımcı fonksiyonlar
const getPosterUrl = (path: string | null): string => {
  if (!path) return "https://via.placeholder.com/300x450?text=No+Poster";
  return `${IMAGE_BASE_URL}${POSTER_SIZE}${path}`;
};

const getBackdropUrl = (path: string | null): string => {
  if (!path) return "https://via.placeholder.com/1280x720?text=No+Backdrop";
  return `${IMAGE_BASE_URL}${BACKDROP_SIZE}${path}`;
};

// Film verisini MediaContent formatına çevirme
const mapMovieToMediaContent = (movie: TMDBMovie): MediaContent => {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    posterUrl: getPosterUrl(movie.poster_path),
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
    genres: movie.genre_ids
      ? movie.genre_ids.map((id) => ({
          id,
          name: getGenreNameById(id, true),
        }))
      : [],
    type: "movie",
    rating: movie.vote_average,
    summary: movie.overview,
  };
};

// TV Show verisini MediaContent formatına çevirme
const mapTVShowToMediaContent = (tvShow: TMDBTVShow): MediaContent => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    originalTitle: tvShow.original_name,
    posterUrl: getPosterUrl(tvShow.poster_path),
    year: tvShow.first_air_date
      ? new Date(tvShow.first_air_date).getFullYear()
      : "Unknown",
    genres: tvShow.genre_ids
      ? tvShow.genre_ids.map((id) => ({
          id,
          name: getGenreNameById(id, false),
        }))
      : [],
    type: "tv",
    rating: tvShow.vote_average,
    summary: tvShow.overview,
  };
};

// TMDBGenre türünü Genre türüne dönüştürme
const mapGenre = (genre: TMDBGenre): Genre => {
  return {
    id: genre.id,
    name: genre.name,
  };
};

// TMDB Servisi
export const tmdbService = {
  // Popüler filmleri getir
  async getPopularMovies(page: number = 1): Promise<MediaContent[]> {
    try {
      const response: AxiosResponse<TMDBResponse<TMDBMovie>> =
        await tmdbAPI.get("/movie/popular", {
          params: {
            page,
          },
        });

      return response.data.results.map(mapMovieToMediaContent);
    } catch (error) {
      console.error("Popüler filmler alınırken hata:", error);
      throw error;
    }
  },

  // Türkiye'de popüler içerikleri getir
  async getPopularInTurkey(page: number = 1): Promise<MediaContent[]> {
    try {
      // Tarihi kategorisi ID'si (TMDB'ye göre)
      const historyGenreId = 36; // Tarih/History kategori ID'si

      // Her sayfada gösterilecek maksimum içerik sayısı (önceden ~80 civarı, şimdi 35)
      const MAX_ITEMS_PER_PAGE = 35;

      // Önce direkt Türk yapımlarını alıyoruz
      const turkishContent = await Promise.all([
        tmdbAPI.get("/discover/movie", {
          params: {
            page,
            language: "tr-TR",
            region: "TR",
            with_original_language: "tr", // Orijinal dili Türkçe olanlar
            sort_by: "popularity.desc", // Popülerliğe göre sırala
          },
        }),
        tmdbAPI.get("/discover/tv", {
          params: {
            page,
            language: "tr-TR",
            region: "TR",
            with_original_language: "tr", // Orijinal dili Türkçe olanlar
            sort_by: "popularity.desc", // Popülerliğe göre sırala
          },
        }),
      ]);

      // Eğer yeterli Türk yapımı yoksa, Türkiye'de popüler küresel içerikleri ekle
      const [turkishMovies, turkishShows] = turkishContent;

      // Türk yapımlarını dönüştürme
      const turkishMovieContents = (turkishMovies.data.results || []).map(
        mapMovieToMediaContent
      );
      const turkishShowContents = (turkishShows.data.results || []).map(
        mapTVShowToMediaContent
      );

      let combinedContent = [...turkishMovieContents, ...turkishShowContents];
      let remainingSlots = MAX_ITEMS_PER_PAGE - combinedContent.length;

      // Eğer Türk yapımları az ise, Türkiye'de popüler global içerikler de ekle
      if (remainingSlots > 0) {
        // Global içerikleri getir
        const globalContentInTurkey = await Promise.all([
          tmdbAPI.get("/movie/popular", {
            params: {
              page,
              region: "TR", // Türkiye bölgesi için
              language: "tr-TR", // Türkçe dilinde
            },
          }),
          tmdbAPI.get("/tv/popular", {
            params: {
              page,
              region: "TR", // Türkiye bölgesi için
              language: "tr-TR", // Türkçe dilinde
            },
          }),
        ]);

        const [globalMovies, globalShows] = globalContentInTurkey;

        // Global içerikleri dönüştürme
        const globalMovieContents = (globalMovies.data.results || []).map(
          mapMovieToMediaContent
        );
        const globalShowContents = (globalShows.data.results || []).map(
          mapTVShowToMediaContent
        );

        // Çakışan ID'leri filtrele (Türk yapımları zaten listemizde varsa global listeye ekleme)
        const turkishIds = combinedContent.map((item) => item.id);
        const filteredGlobalMovies = globalMovieContents.filter(
          (item) => !turkishIds.includes(item.id)
        );
        const filteredGlobalShows = globalShowContents.filter(
          (item) => !turkishIds.includes(item.id)
        );

        // Küresel içerikleri, kalan sayı kadar ekle
        const filmsToAdd = filteredGlobalMovies.slice(
          0,
          Math.floor(remainingSlots / 2)
        );
        const showsToAdd = filteredGlobalShows.slice(
          0,
          Math.ceil(remainingSlots / 2)
        );

        // Türk yapımlarını önce listeye ekle, sonra global içerikleri
        combinedContent = [...combinedContent, ...filmsToAdd, ...showsToAdd];

        // Kalan boşlukları güncelle
        remainingSlots = MAX_ITEMS_PER_PAGE - combinedContent.length;
      }

      // Tarih türü için daha fazla içerik ekle (özel olarak) - yalnızca kalan boşluk varsa
      if (remainingSlots > 0) {
        try {
          const [historyMovies, historyTVShows] = await Promise.all([
            tmdbAPI.get("/discover/movie", {
              params: {
                language: "tr-TR",
                with_genres: historyGenreId, // History/Tarih kategorisi
                sort_by: "popularity.desc",
                region: "TR",
                page: 1,
              },
            }),
            tmdbAPI.get("/discover/tv", {
              params: {
                language: "tr-TR",
                with_genres: historyGenreId, // History/Tarih kategorisi
                sort_by: "popularity.desc",
                region: "TR",
                page: 1,
              },
            }),
          ]);

          console.log(
            `Tarih türünde film sayısı: ${historyMovies.data.results?.length || 0}`
          );
          console.log(
            `Tarih türünde dizi sayısı: ${historyTVShows.data.results?.length || 0}`
          );

          // İçerikleri dönüştür
          const historyMovieContents = (historyMovies.data.results || []).map(
            mapMovieToMediaContent
          );
          const historyTVContents = (historyTVShows.data.results || []).map(
            mapTVShowToMediaContent
          );

          // Mevcut ID'leri topla (string olarak)
          const existingIds = new Set(
            combinedContent.map((item) => String(item.id))
          );

          // Çakışmayanları ekle - Aynı ID'leri kesinlikle engelle
          const newHistoryMovies = historyMovieContents.filter(
            (item) => !existingIds.has(String(item.id))
          );
          const newHistoryTVShows = historyTVContents.filter(
            (item) => !existingIds.has(String(item.id))
          );

          // Kalan boşluklara göre eklenecek tarih içeriklerini sınırla
          const historyMoviesToAdd = newHistoryMovies.slice(
            0,
            Math.floor(remainingSlots / 2)
          );
          const historyShowsToAdd = newHistoryTVShows.slice(
            0,
            Math.ceil(remainingSlots / 2)
          );

          console.log(
            `Eklenecek yeni tarih filmleri: ${historyMoviesToAdd.length}`
          );
          console.log(
            `Eklenecek yeni tarih dizileri: ${historyShowsToAdd.length}`
          );

          // Tarih türündeki içerikleri ana listeye ekle
          combinedContent = [
            ...combinedContent,
            ...historyMoviesToAdd,
            ...historyShowsToAdd,
          ];
        } catch (error) {
          console.error("Tarih türündeki içerikler alınırken hata:", error);
        }
      }

      console.log(`Toplam içerik sayısı: ${combinedContent.length}`);

      // Sonuçları popülerliğe ve Türk yapımı olmasına göre sırala
      return combinedContent.sort((a, b) => {
        // Türk yapımı içerikleri öne al
        const aTitle = a.originalTitle || "";
        const bTitle = b.originalTitle || "";

        const aTurkish = aTitle.match(/[şçğüöıİ]/i) !== null;
        const bTurkish = bTitle.match(/[şçğüöıİ]/i) !== null;

        if (aTurkish && !bTurkish) return -1;
        if (!aTurkish && bTurkish) return 1;

        // Puanı yüksek olanlara öncelik ver
        return (b.rating || 0) - (a.rating || 0);
      });
    } catch (error) {
      console.error("Türkiye'de popüler içerikler alınırken hata:", error);
      throw error;
    }
  },

  // Film detaylarını getir
  async getMovieDetails(movieId: number): Promise<MediaContent> {
    try {
      const [detailsResponse, creditsResponse] = await Promise.all([
        tmdbAPI.get<TMDBMovieDetails>(`/movie/${movieId}`),
        tmdbAPI.get<TMDBCredits>(`/movie/${movieId}/credits`),
      ]);

      const movie = detailsResponse.data;
      const credits = creditsResponse.data;

      return {
        id: movie.id,
        title: movie.title,
        originalTitle: movie.original_title,
        posterUrl: getPosterUrl(movie.poster_path),
        year: new Date(movie.release_date).getFullYear(),
        genres: movie.genres.map(mapGenre),
        type: "movie",
        rating: movie.vote_average,
        duration: movie.runtime
          ? `${Math.floor(movie.runtime / 60)}s ${movie.runtime % 60}dk`
          : undefined,
        summary: movie.overview,
        director: credits.crew.find((c) => c.job === "Director")?.name || "",
        cast: credits.cast.slice(0, 5).map((actor) => actor.name),
        // API'den gelen ek bilgiler
        originalLanguage: movie.original_language,
        popularity: movie.popularity,
        budget: movie.budget,
        revenue: movie.revenue,
        status: movie.status,
        homepage: movie.homepage || undefined,
        productionCompanies: movie.production_companies || [],
        productionCountries: movie.production_countries || [],
      };
    } catch (error) {
      console.error(`Film detayları alınırken hata (ID: ${movieId}):`, error);
      throw error;
    }
  },

  // Popüler dizileri getir
  async getPopularTVShows(): Promise<MediaContent[]> {
    try {
      const response: AxiosResponse<TMDBResponse<TMDBTVShow>> =
        await tmdbAPI.get("/tv/popular");

      return response.data.results.map(mapTVShowToMediaContent);
    } catch (error) {
      console.error("Popüler diziler alınırken hata:", error);
      throw error;
    }
  },

  // Dizi detaylarını getir
  async getTVShowDetails(tvId: number): Promise<MediaContent> {
    try {
      const [detailsResponse, creditsResponse] = await Promise.all([
        tmdbAPI.get<TMDBTVShowDetails>(`/tv/${tvId}`),
        tmdbAPI.get<TMDBCredits>(`/tv/${tvId}/credits`),
      ]);

      const tvShow = detailsResponse.data;
      const credits = creditsResponse.data;

      return {
        id: tvShow.id,
        title: tvShow.name,
        originalTitle: tvShow.original_name,
        posterUrl: getPosterUrl(tvShow.poster_path),
        year: tvShow.first_air_date
          ? `${new Date(tvShow.first_air_date).getFullYear()}${tvShow.status === "Ended" ? `-${new Date(tvShow.last_air_date).getFullYear()}` : ""}`
          : "Unknown",
        genres: tvShow.genres.map(mapGenre),
        type: "tv",
        rating: tvShow.vote_average,
        duration: `${tvShow.number_of_seasons} Sezon`,
        summary: tvShow.overview,
        director:
          tvShow.created_by.map((creator) => creator.name).join(", ") || "",
        cast: credits.cast.slice(0, 5).map((actor) => actor.name),
        // API'den gelen ek bilgiler
        originalLanguage: tvShow.original_language,
        popularity: tvShow.popularity,
        status: tvShow.status,
        homepage: tvShow.homepage || undefined,
        productionCompanies: tvShow.production_companies || [],
        productionCountries: tvShow.production_countries || [],
        numberOfSeasons: tvShow.number_of_seasons,
        numberOfEpisodes: tvShow.number_of_episodes,
      };
    } catch (error) {
      console.error(`Dizi detayları alınırken hata (ID: ${tvId}):`, error);
      throw error;
    }
  },

  // Medya ara (film ve dizi)
  async searchMedia(query: string): Promise<MediaContent[]> {
    try {
      const [movieResponse, tvResponse] = await Promise.all([
        tmdbAPI.get<TMDBResponse<TMDBMovie>>("/search/movie", {
          params: { query },
        }),
        tmdbAPI.get<TMDBResponse<TMDBTVShow>>("/search/tv", {
          params: { query },
        }),
      ]);

      const movies = movieResponse.data.results.map(mapMovieToMediaContent);
      const tvShows = tvResponse.data.results.map(mapTVShowToMediaContent);

      return [...movies, ...tvShows];
    } catch (error) {
      console.error(`Medya araması yapılırken hata (${query}):`, error);
      throw error;
    }
  },

  // Türlere göre filmleri filtrele
  async getMoviesByGenre(genreId: number): Promise<MediaContent[]> {
    try {
      const response: AxiosResponse<TMDBResponse<TMDBMovie>> =
        await tmdbAPI.get("/discover/movie", {
          params: { with_genres: genreId },
        });

      return response.data.results.map(mapMovieToMediaContent);
    } catch (error) {
      console.error(
        `Türe göre filmler alınırken hata (Tür ID: ${genreId}):`,
        error
      );
      throw error;
    }
  },

  // Türlere göre dizileri filtrele
  async getTVShowsByGenre(genreId: number): Promise<MediaContent[]> {
    try {
      const response: AxiosResponse<TMDBResponse<TMDBTVShow>> =
        await tmdbAPI.get("/discover/tv", {
          params: { with_genres: genreId },
        });

      return response.data.results.map(mapTVShowToMediaContent);
    } catch (error) {
      console.error(
        `Türe göre diziler alınırken hata (Tür ID: ${genreId}):`,
        error
      );
      throw error;
    }
  },

  // Film türlerini getir
  async getMovieGenres(): Promise<Genre[]> {
    try {
      return movieGenres.map(mapGenre);
    } catch (error) {
      console.error("Film türleri alınırken hata:", error);
      throw error;
    }
  },

  // Dizi türlerini getir
  async getTVGenres(): Promise<Genre[]> {
    try {
      return tvGenres.map(mapGenre);
    } catch (error) {
      console.error("Dizi türleri alınırken hata:", error);
      throw error;
    }
  },

  // Kategoriye ve türe göre içerik keşfet (kategori ve türe özel içerik getirme)
  async discoverMedia(
    category: string,
    genreId?: string | number,
    page: number = 1
  ): Promise<MediaContent[]> {
    try {
      // Her sayfada gösterilecek maksimum içerik sayısı
      const MAX_ITEMS_PER_PAGE = 35;

      console.log(`Kategori ve türe göre içerik keşfediliyor: 
        Kategori: ${category} 
        Tür ID: ${genreId} 
        Sayfa: ${page}
        Max İçerik: ${MAX_ITEMS_PER_PAGE}`);

      // Öncelikli olarak tüm kategorilerde Türkiye'de popüler içerikleri getir
      let turkishMedia: MediaContent[] = [];

      try {
        // Türkiye'de popüler içerikleri getir (sayı sınırlı)
        const turkishContent = await this.getPopularInTurkey(page);

        // Kategori filtreleme
        if (category !== "all") {
          turkishMedia = turkishContent.filter((item) => {
            if (category === "movie" && item.type === "movie") return true;
            if (category === "tv" && item.type === "tv") return true;
            return false;
          });
        } else {
          turkishMedia = turkishContent;
        }

        // Tür filtreleme
        if (genreId) {
          turkishMedia = turkishMedia.filter((item) => {
            const hasGenre = item.genres?.some((genre) => {
              // Hem ID hem de isim bazlı kontrol yap
              if (typeof genre === "string") {
                return genre.toLowerCase() === genreId.toString().toLowerCase();
              } else {
                return (
                  genre.id?.toString() === genreId.toString() ||
                  genre.name?.toLowerCase() === genreId.toString().toLowerCase()
                );
              }
            });
            return hasGenre;
          });
        }

        console.log(`Türkiye'de popüler içerik sayısı: ${turkishMedia.length}`);

        // Eğer Türkiye'den yeterli içerik bulunamazsa (2'den az) global olarak ara
        if (turkishMedia.length >= 2) {
          // Toplam içerik sayısını sınırla
          return turkishMedia.slice(0, MAX_ITEMS_PER_PAGE);
        }
      } catch (error) {
        console.error("Türkiye içerikleri alınırken hata:", error);
        // Hata durumunda global aramaya geç
      }

      console.log(
        "Türkiye içerikleri yetersiz, global içerikler getiriliyor..."
      );

      // Tümü seçili ise hem film hem dizi getir
      if (category === "all") {
        // Tür seçili ise o türde hem film hem dizi getir
        if (genreId) {
          const requests = [
            tmdbAPI.get("/discover/movie", {
              params: {
                page,
                language: "tr-TR",
                with_genres: genreId,
                sort_by: "popularity.desc",
              },
            }),
            tmdbAPI.get("/discover/tv", {
              params: {
                page,
                language: "tr-TR",
                with_genres: genreId,
                sort_by: "popularity.desc",
              },
            }),
          ];

          const [movieResponse, tvResponse] = await Promise.all(requests);

          // Sınırlı sayıda film ve dizi al
          const itemsPerType = Math.floor(
            (MAX_ITEMS_PER_PAGE - turkishMedia.length) / 2
          );

          const movies = (movieResponse.data.results || [])
            .slice(0, itemsPerType)
            .map(mapMovieToMediaContent);

          const tvShows = (tvResponse.data.results || [])
            .slice(0, itemsPerType)
            .map(mapTVShowToMediaContent);

          console.log(
            `Bulunan global içerik sayısı: Film: ${movies.length}, Dizi: ${tvShows.length}`
          );

          // Türkçe içerikleri öne çıkar
          const combinedResults = [...turkishMedia, ...movies, ...tvShows].sort(
            (a, b) => {
              // Türk yapımı içerikleri öne al
              const aTitle = a.originalTitle || "";
              const bTitle = b.originalTitle || "";

              const aTurkish = aTitle.match(/[şçğüöıİ]/i) !== null;
              const bTurkish = bTitle.match(/[şçğüöıİ]/i) !== null;

              if (aTurkish && !bTurkish) return -1;
              if (!aTurkish && bTurkish) return 1;

              // Puanı yüksek olanlara öncelik ver
              return (b.rating || 0) - (a.rating || 0);
            }
          );

          // Tekrarlayan içerikleri kaldır
          const uniqueResults = combinedResults.filter(
            (item, index, self) =>
              index ===
              self.findIndex((t) => t.id === item.id && t.type === item.type)
          );

          // Toplam içerik sayısını sınırla
          return uniqueResults.slice(0, MAX_ITEMS_PER_PAGE);
        } else {
          // Tür seçili değilse ve Türkiye içerikleri yetersizse, global popüler içerikler
          const results = await this.getPopularInTurkey(page);
          return results.slice(0, MAX_ITEMS_PER_PAGE);
        }
      }
      // Film kategorisi seçiliyse
      else if (category === "movie") {
        // Belirli bir tür seçili ise o türdeki filmleri getir
        const endpoint = genreId ? "/discover/movie" : "/movie/popular";
        const params: any = {
          page,
          language: "tr-TR",
          sort_by: "popularity.desc",
        };

        // Tür seçili ise parametre olarak ekle
        if (genreId) {
          params.with_genres = genreId;
        }

        const response = await tmdbAPI.get(endpoint, { params });

        // Sayfa başına içerik sayısını sınırla
        const itemsToGet = MAX_ITEMS_PER_PAGE - turkishMedia.length;

        const movies = (response.data.results || [])
          .slice(0, itemsToGet)
          .map(mapMovieToMediaContent);

        console.log(`Bulunan global film sayısı: ${movies.length}`);

        // Türkiye'den bulunan filmler ile birleştir ve tekrarları kaldır
        const allMovies = [...turkishMedia, ...movies];
        const uniqueMovies = allMovies.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        // Önceliği Türk filmlerine ver
        return uniqueMovies
          .sort((a, b) => {
            const aTitle = a.originalTitle || "";
            const bTitle = b.originalTitle || "";

            const aTurkish = aTitle.match(/[şçğüöıİ]/i) !== null;
            const bTurkish = bTitle.match(/[şçğüöıİ]/i) !== null;

            if (aTurkish && !bTurkish) return -1;
            if (!aTurkish && bTurkish) return 1;

            return (b.rating || 0) - (a.rating || 0);
          })
          .slice(0, MAX_ITEMS_PER_PAGE);
      }
      // Dizi kategorisi seçiliyse
      else if (category === "tv") {
        // Belirli bir tür seçili ise o türdeki dizileri getir
        const endpoint = genreId ? "/discover/tv" : "/tv/popular";
        const params: any = {
          page,
          language: "tr-TR",
          sort_by: "popularity.desc",
        };

        // Tür seçili ise parametre olarak ekle
        if (genreId) {
          params.with_genres = genreId;
        }

        const response = await tmdbAPI.get(endpoint, { params });

        // Sayfa başına içerik sayısını sınırla
        const itemsToGet = MAX_ITEMS_PER_PAGE - turkishMedia.length;

        const tvShows = (response.data.results || [])
          .slice(0, itemsToGet)
          .map(mapTVShowToMediaContent);

        console.log(`Bulunan global dizi sayısı: ${tvShows.length}`);

        // Türkiye'den bulunan diziler ile birleştir ve tekrarları kaldır
        const allTVShows = [...turkishMedia, ...tvShows];
        const uniqueTVShows = allTVShows.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        // Önceliği Türk dizilerine ver
        return uniqueTVShows
          .sort((a, b) => {
            const aTitle = a.originalTitle || "";
            const bTitle = b.originalTitle || "";

            const aTurkish = aTitle.match(/[şçğüöıİ]/i) !== null;
            const bTurkish = bTitle.match(/[şçğüöıİ]/i) !== null;

            if (aTurkish && !bTurkish) return -1;
            if (!aTurkish && bTurkish) return 1;

            return (b.rating || 0) - (a.rating || 0);
          })
          .slice(0, MAX_ITEMS_PER_PAGE);
      }

      return [...turkishMedia].slice(0, MAX_ITEMS_PER_PAGE);
    } catch (error) {
      console.error("İçerik keşfedilirken hata:", error);
      throw error;
    }
  },
};
