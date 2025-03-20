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

export interface IconPosition {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface CameraIconProps {
  delay?: number;
  position: IconPosition;
}

export interface DirectorChairIconProps {
  delay?: number;
  position: IconPosition;
}

export interface ClapperIconProps {
  delay?: number;
  position: IconPosition;
}
