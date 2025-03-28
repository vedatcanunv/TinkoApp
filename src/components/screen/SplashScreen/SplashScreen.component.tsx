import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useCallback} from 'react';
import {View} from 'react-native';
import {tmdbService} from '../../../services';
import {styles} from './SplashScreen.style';
import {SplashScreenProps} from './SplashScreen.type';

export const SplashScreen: React.FC<SplashScreenProps> = ({onFinish}) => {
  const lottieRef = useRef<LottieView>(null);

  // Veri yükleme fonksiyonunu useCallback ile optimize et
  const fetchInitialData = useCallback(async () => {
    try {
      console.log('Veriler yükleniyor...');

      // Promise.all kullanarak paralel istekler yap
      await Promise.all([
        tmdbService.getPopularMovies(),
        tmdbService.getPopularInTurkey(),
        tmdbService.getMovieGenres(),
        tmdbService.getTVGenres(),
      ]);

      console.log('Tüm veriler başarıyla yüklendi!');
      return true;
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    // API isteklerini başlat ve yüklenme durumunu izle
    const startTime = Date.now();
    const minSplashTime = 3000;

    fetchInitialData().then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minSplashTime - elapsedTime);

      setTimeout(onFinish, remainingTime);
    });
  }, [fetchInitialData, onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView
          ref={lottieRef}
          source={require('../../../assets/animations/loadingCut.json')}
          style={styles.lottieAnimation}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};
