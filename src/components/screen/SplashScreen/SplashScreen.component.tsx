import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { tmdbService } from "../../../services";
import { SplashScreenProps } from "./SplashScreen.type";

const { width } = Dimensions.get("window");

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Bileşen yüklenir yüklenmez doğrudan ana sayfaya geçiş yap
  useEffect(() => {
    // API isteklerini arka planda başlat ama beklemeden ana sayfaya geç
    fetchInitialData();

    // Hemen ana sayfaya geç
    onFinish();
  }, []);

  // API verilerini getir (arka planda çalışacak)
  const fetchInitialData = async () => {
    try {
      // Paralel olarak tüm gerekli verileri getir
      await Promise.all([
        tmdbService.getPopularMovies(),
        tmdbService.getPopularInTurkey(),
        tmdbService.getMovieGenres(),
        tmdbService.getTVGenres(),
      ]);
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
    }
  };

  // Boş bir view döndür - zaten görünmeyecek
  return null;
};
