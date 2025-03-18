import React from "react";
import { View, StyleSheet } from "react-native";
import { styles } from "./ScreenContainer.style";
import { ScreenContainerProps } from "./ScreenContainer.type";
import { LAYOUT } from "../../../helpers/layout";

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
