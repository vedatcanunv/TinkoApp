import {ReactNode} from 'react';
import {TouchableOpacityProps} from 'react-native';

export type ButtonVariant = 'filled' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Buton metni
   */
  title: string;

  /**
   * Butona tıklandığında çalışacak fonksiyon
   */
  onPress: () => void;

  /**
   * Butonun devre dışı bırakılıp bırakılmayacağını belirler
   * @default false
   */
  disabled?: boolean;

  /**
   * Butonun görünüm varyantı
   * @default 'filled'
   */
  variant?: ButtonVariant;

  /**
   * Butonun boyutu
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Butonun yükleme durumunda olup olmadığını belirler
   * @default false
   */
  loading?: boolean;

  /**
   * Butonun sol tarafında görüntülenecek ikon
   */
  iconLeft?: ReactNode;

  /**
   * Butonun sağ tarafında görüntülenecek ikon
   */
  iconRight?: ReactNode;
}
