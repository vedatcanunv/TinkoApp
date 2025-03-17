import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  // Renkler
  colorDefault: {
    color: "#000000",
  },
  colorPrimary: {
    color: "#007AFF",
  },
  colorSecondary: {
    color: "#5856D6",
  },
  colorSuccess: {
    color: "#34C759",
  },
  colorDanger: {
    color: "#FF3B30",
  },
  colorWarning: {
    color: "#FF9500",
  },
  colorLight: {
    color: "#8E8E93",
  },
  colorWhite: {
    color: "#FFFFFF",
  },
  // Hizalama
  alignLeft: {
    textAlign: "left",
  },
  alignCenter: {
    textAlign: "center",
  },
  alignRight: {
    textAlign: "right",
  },
});
