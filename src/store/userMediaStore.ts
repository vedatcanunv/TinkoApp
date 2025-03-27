import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MediaContent } from "../components/molecule/MediaCard/MediaCard.type";

interface UserMediaState {
  // İzlenen filmler
  watchedMovies: MediaContent[];
  // İzlenen diziler
  watchedSeries: MediaContent[];
  // İzlenecek filmler
  watchlistMovies: MediaContent[];
  // İzlenecek diziler
  watchlistSeries: MediaContent[];

  // İzlenen filmleri yönetme
  addWatchedMovie: (movie: MediaContent) => void;
  removeWatchedMovie: (movieId: number) => void;

  // İzlenen dizileri yönetme
  addWatchedSeries: (series: MediaContent) => void;
  removeWatchedSeries: (seriesId: number) => void;

  // İzlenecek filmleri yönetme
  addMovieToWatchlist: (movie: MediaContent) => void;
  removeMovieFromWatchlist: (movieId: number) => void;

  // İzlenecek dizileri yönetme
  addSeriesToWatchlist: (series: MediaContent) => void;
  removeSeriesFromWatchlist: (seriesId: number) => void;

  // İstatistikler
  getStats: () => {
    totalWatchedMovies: number;
    totalWatchedSeries: number;
    totalWatchlistMovies: number;
    totalWatchlistSeries: number;
  };
}

export const useUserMediaStore = create<UserMediaState>()(
  persist(
    (set, get) => ({
      // Başlangıç durumu
      watchedMovies: [],
      watchedSeries: [],
      watchlistMovies: [],
      watchlistSeries: [],

      // İzlenen filmler için metodlar
      addWatchedMovie: (movie) =>
        set((state) => {
          // Eğer film zaten izlenenler listesindeyse ekleme
          if (state.watchedMovies.some((m) => m.id === movie.id)) {
            return state;
          }

          // Eğer film izlenecekler listesindeyse oradan çıkar
          const updatedWatchlist = state.watchlistMovies.filter(
            (m) => m.id !== movie.id
          );

          return {
            watchedMovies: [...state.watchedMovies, movie],
            watchlistMovies: updatedWatchlist,
          };
        }),

      removeWatchedMovie: (movieId) =>
        set((state) => ({
          watchedMovies: state.watchedMovies.filter((m) => m.id !== movieId),
        })),

      // İzlenen diziler için metodlar
      addWatchedSeries: (series) =>
        set((state) => {
          // Eğer dizi zaten izlenenler listesindeyse ekleme
          if (state.watchedSeries.some((s) => s.id === series.id)) {
            return state;
          }

          // Eğer dizi izlenecekler listesindeyse oradan çıkar
          const updatedWatchlist = state.watchlistSeries.filter(
            (s) => s.id !== series.id
          );

          return {
            watchedSeries: [...state.watchedSeries, series],
            watchlistSeries: updatedWatchlist,
          };
        }),

      removeWatchedSeries: (seriesId) =>
        set((state) => ({
          watchedSeries: state.watchedSeries.filter((s) => s.id !== seriesId),
        })),

      // İzlenecek filmler için metodlar
      addMovieToWatchlist: (movie) =>
        set((state) => {
          // Eğer film zaten izlenecekler listesindeyse ekleme
          if (state.watchlistMovies.some((m) => m.id === movie.id)) {
            return state;
          }

          // Eğer film izlenenler listesindeyse ekleme
          if (state.watchedMovies.some((m) => m.id === movie.id)) {
            return state;
          }

          return {
            watchlistMovies: [...state.watchlistMovies, movie],
          };
        }),

      removeMovieFromWatchlist: (movieId) =>
        set((state) => ({
          watchlistMovies: state.watchlistMovies.filter(
            (m) => m.id !== movieId
          ),
        })),

      // İzlenecek diziler için metodlar
      addSeriesToWatchlist: (series) =>
        set((state) => {
          // Eğer dizi zaten izlenecekler listesindeyse ekleme
          if (state.watchlistSeries.some((s) => s.id === series.id)) {
            return state;
          }

          // Eğer dizi izlenenler listesindeyse ekleme
          if (state.watchedSeries.some((s) => s.id === series.id)) {
            return state;
          }

          return {
            watchlistSeries: [...state.watchlistSeries, series],
          };
        }),

      removeSeriesFromWatchlist: (seriesId) =>
        set((state) => ({
          watchlistSeries: state.watchlistSeries.filter(
            (s) => s.id !== seriesId
          ),
        })),

      // İstatistikler için metod
      getStats: () => {
        const state = get();
        return {
          totalWatchedMovies: state.watchedMovies.length,
          totalWatchedSeries: state.watchedSeries.length,
          totalWatchlistMovies: state.watchlistMovies.length,
          totalWatchlistSeries: state.watchlistSeries.length,
        };
      },
    }),
    {
      name: "user-media-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
