import { ViewProps, StyleProp, ViewStyle } from "react-native";

export type IconSize = "small" | "medium" | "large";
export type IconColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "light"
  | "white";

export interface IconProps extends ViewProps {
  /**
   * İkon adı
   */
  name: string;

  /**
   * İkon boyutu
   * @default 'medium'
   */
  size?: IconSize;

  /**
   * İkon rengi
   * @default 'default'
   */
  color?: IconColor;

  /**
   * Ek stil özellikleri
   */
  style?: StyleProp<ViewStyle>;
}
