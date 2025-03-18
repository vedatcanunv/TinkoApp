import { ReactNode } from "react";
import { ViewStyle, StyleProp } from "react-native";

export interface ModalProps {
  /**
   * Modal'ın görünür olup olmadığını belirler
   */
  visible: boolean;

  /**
   * Modal kapatıldığında çalışacak fonksiyon
   */
  onClose: () => void;

  /**
   * Modal içeriği
   */
  children: ReactNode;

  /**
   * Modal arkaplan karartma ayarı
   * @default 0.5
   */
  backdropOpacity?: number;

  /**
   * Modal'ın yüksekliği (ekran yüzdesi olarak)
   * @default 50
   */
  height?: number;

  /**
   * Modal'a özel stil
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Modal içerik konteynırına özel stil
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Arka plana tıklandığında modal'ın kapanıp kapanmayacağı
   * @default true
   */
  closeOnBackdropPress?: boolean;
}
