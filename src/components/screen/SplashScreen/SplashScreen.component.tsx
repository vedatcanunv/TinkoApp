import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { tmdbService } from "../../../services";
import { styles } from "./SplashScreen.style";
import { SplashScreenProps } from "./SplashScreen.type";

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const lottieRef = useRef<LottieView>(null);
  const minSplashTime = 3000; // Minimum 3 saniye gösterilsin

  useEffect(() => {
    // API isteklerini başlat ve yüklenme durumunu izle
    const dataLoadPromise = fetchInitialData();
    const startTime = Date.now();

    // API isteklerinin tamamlanmasını bekle ve minSplashTime'dan önce biterse,
    // kalan süre kadar bekle
    dataLoadPromise.then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minSplashTime - elapsedTime);

      setTimeout(() => {
        onFinish();
      }, remainingTime);
    });
  }, []);

  // API verilerini getir ve sonuçlarını bekle
  const fetchInitialData = async () => {
    try {
      console.log("Veriler yükleniyor...");

      // Ana ekranda gösterilecek popüler içerikleri Splash ekranında önceden yükleyelim
      const popularInTurkey = await tmdbService.getPopularInTurkey(1);
      console.log(`Popüler içerikler yüklendi: ${popularInTurkey.length} adet`);

      // Diğer gerekli verileri de yükleyelim
      await Promise.all([
        tmdbService.getPopularMovies(),
        tmdbService.getMovieGenres(),
        tmdbService.getTVGenres(),
      ]);

      console.log("Tüm veriler başarıyla yüklendi!");
      return true;
    } catch (error) {
      console.error("Veri yüklenirken hata oluştu:", error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView
          ref={lottieRef}
          source={require("../../../assets/animations/loadingCut.json")}
          style={styles.lottieAnimation}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};
