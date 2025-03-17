export interface SplashScreenProps {
  /**
   * Splash screen tamamlandığında çalışacak fonksiyon
   */
  onFinish: () => void;

  /**
   * Splash screen'in gösterileceği süre (milisaniye)
   * @default 3000
   */
  duration?: number;
}
