import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

export interface ProfileAvatarProps {
  /**
   * Avatar görseli
   */
  source?: ImageSourcePropType;

  /**
   * Avatar boyutu
   * @default "medium"
   */
  size?: "small" | "medium" | "large";

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
