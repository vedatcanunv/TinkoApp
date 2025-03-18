import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export interface TabBarProps extends BottomTabBarProps {
  // Özel prop'lar buraya eklenebilir
}

export interface TabIconProps {
  focused: boolean;
  color?: string;
  size?: number;
}
