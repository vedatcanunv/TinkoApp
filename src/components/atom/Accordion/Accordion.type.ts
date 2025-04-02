import {ViewStyle, TextStyle, ColorValue} from 'react-native';

/**
 * Accordion bileşeninin prop tipleri
 */
export interface AccordionProps {
  /**
   * Accordion başlığı
   */
  title: string;

  /**
   * Accordion içeriği
   */
  children: React.ReactNode;

  /**
   * Accordion'un açık/kapalı durumu
   * Kontrollü mod için kullanılır
   * @default false
   */
  isExpanded?: boolean;

  /**
   * Accordion açılıp kapandığında tetiklenecek fonksiyon
   */
  onToggle?: () => void;

  /**
   * Başlık metni için özel stil
   */
  titleStyle?: TextStyle;

  /**
   * İçerik alanı için özel stil
   */
  contentStyle?: ViewStyle;

  /**
   * Accordion container'ı için özel stil
   */
  containerStyle?: ViewStyle;

  /**
   * Başlık alanı için özel stil
   */
  headerStyle?: ViewStyle;

  /**
   * Açılma/kapanma ikonunun rengi
   * @default '#666'
   */
  iconColor?: ColorValue;

  /**
   * Açılma/kapanma ikonunun boyutu
   * @default 24
   */
  iconSize?: number;

  /**
   * Açılma/kapanma animasyonunun süresi (milisaniye)
   * @default 300
   */
  animationDuration?: number;

  /**
   * Accordion'un devre dışı bırakılıp bırakılmadığı
   * @default false
   */
  disabled?: boolean;
}

/**
 * Accordion bileşeninin iç durum tipleri
 */
export interface AccordionState {
  /**
   * Accordion'un açık/kapalı durumu
   */
  isExpanded: boolean;

  /**
   * İçeriğin yüksekliği
   */
  contentHeight: number;
}
