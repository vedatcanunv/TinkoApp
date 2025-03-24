import React from "react";
import { View } from "react-native";
import { styles } from "./ScreenContainer.style";
import { ScreenContainerProps } from "./ScreenContainer.type";

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  withTabBarPadding = true,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};
