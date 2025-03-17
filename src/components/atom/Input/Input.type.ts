import { TextInputProps, ViewStyle } from "react-native";

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
   * Ek stil özellikleri
   */
  style?: ViewStyle;
}
