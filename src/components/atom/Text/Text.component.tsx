import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { TextProps } from "./Text.type";

// Stil tanımlamaları doğrudan bileşen içinde
const styles = StyleSheet.create({
  base: {
    fontFamily: "System",
  },
  // Varyantlar
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
});

// Renk stilleri
const colorStyles = {
  default: "#000000",
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  danger: "#FF3B30",
  warning: "#FF9500",
  light: "#8E8E93",
  white: "#FFFFFF",
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  color = "default",
  align = "left",
  style,
  ...props
}) => {
  // Stil hesaplama
  const textStyle = [
    styles.base,
    styles[variant],
    { color: colorStyles[color], textAlign: align },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};
