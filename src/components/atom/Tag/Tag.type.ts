import { TouchableOpacityProps } from "react-native";

export type TagVariant = "default" | "primary" | "secondary" | "outline";
export type TagSize = "small" | "medium" | "large";

export interface TagProps extends TouchableOpacityProps {
  /**
   * Tag içeriği
   */
  label: string;

  /**
   * Tag varyantı
   * @default "default"
   */
  variant?: TagVariant;

  /**
   * Tag boyutu
   * @default "medium"
   */
  size?: TagSize;

  /**
   * Tıklanabilir mi?
   * @default true
   */
  isClickable?: boolean;

  /**
   * Seçili durumda mı?
   * @default false
   */
  isSelected?: boolean;

  /**
   * Seçildiğinde çalışacak fonksiyon
   */
  onSelect?: () => void;
}
