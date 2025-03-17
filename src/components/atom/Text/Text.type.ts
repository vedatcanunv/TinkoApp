import { TextProps as RNTextProps } from "react-native";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "subtitle"
  | "body"
  | "bodySmall"
  | "caption";

export type TextColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "light"
  | "white";

export type TextAlign = "left" | "center" | "right";

export interface TextProps extends RNTextProps {
  /**
   * Metin varyantı
   * @default "body"
   */
  variant?: TextVariant;

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
   * Metin içeriği
   */
  children: React.ReactNode;
}
