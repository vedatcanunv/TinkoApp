import { ReactNode } from "react";
import { TextInputProps, ViewStyle } from "react-native";

export type InputVariant = "default" | "outline" | "underline" | "filled";
export type InputSize = "small" | "medium" | "large";

export interface InputProps extends TextInputProps {
  /**
   * Input etiketi
   */
  label?: string;

  /**
   * Hata mesajı
   */
  error?: string;

  /**
   * Input varyantı
   * @default 'default'
   */
  variant?: InputVariant;

  /**
   * Input boyutu
   * @default 'medium'
   */
  size?: InputSize;

  /**
   * Input pasif durumda mı
   * @default false
   */
  disabled?: boolean;

  /**
   * Input sol tarafındaki ikon
   */
  leftIcon?: ReactNode;

  /**
   * Input sağ tarafındaki ikon
   */
  rightIcon?: ReactNode;

  /**
   * Ek stil özellikleri
   */
  style?: ViewStyle;
}
