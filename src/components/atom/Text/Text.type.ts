import { TextProps as RNTextProps } from "react-native";

export type TextSize = "s" | "m" | "l" | "xl" | "xxl" | "xxxl" | "display";

export type TextWeight = "regular" | "medium" | "semibold" | "bold";

export type TextColor =
  | "default"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "lighter"
  | "white";

export type TextAlign = "left" | "center" | "right" | "justify";

export interface TextProps extends RNTextProps {
  /**
   * Yazı tipi boyutu
   * @default "m"
   */
  size?: TextSize;

  /**
   * Yazı tipi ağırlığı
   * @default "regular"
   */
  weight?: TextWeight;

  /**
   * Metin rengi
   * @default "default"
   */
  color?: TextColor;

  /**
   * Metin hizalaması
   * @default "left"
   */
  align?: TextAlign;

  /**
   * Ek stil özellikleri
   */
  style?: RNTextProps["style"];

  /**
   * Altı çizili metin
   * @default false
   */
  underline?: boolean;

  /**
   * Büyük harfli metin
   * @default false
   */
  uppercase?: boolean;

  /**
   * Küçük harfli metin
   * @default false
   */
  lowercase?: boolean;

  /**
   * İlk harfleri büyük metin
   * @default false
   */
  capitalize?: boolean;

  /**
   * Metin içeriği
   */
  children: React.ReactNode;
}
