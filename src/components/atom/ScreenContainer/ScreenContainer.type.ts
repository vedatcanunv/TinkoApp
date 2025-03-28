import {ViewProps, StyleProp, ViewStyle} from 'react-native';

export interface ScreenContainerProps extends ViewProps {
  /**
   * Otomatik olarak tab bar'a göre bottom padding eklensin mi?
   * @default true
   */
  withTabBarPadding?: boolean;

  /**
   * Ek stil özellikleri
   */
  style?: StyleProp<ViewStyle>;

  /**
   * İçerik bileşenleri
   */
  children: React.ReactNode;
}
