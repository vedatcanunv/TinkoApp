import {StyleProp, ViewStyle} from 'react-native';

export interface LoadingProps {
  /**
   * Yükleme göstergesinin boyutu
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Yükleme göstergesinin rengi
   * @default "primary"
   */
  color?: 'primary' | 'white' | string;

  /**
   * Yükleme göstergesinin altında gösterilecek metin
   */
  text?: string;

  /**
   * Metnin rengi
   * @default "primary"
   */
  textColor?: 'primary' | 'light' | 'white' | 'dark' | string;

  /**
   * Tam ekran gösterim
   * @default false
   */
  fullScreen?: boolean;

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
