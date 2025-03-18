import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";

export const styles = StyleSheet.create({
  // Ana konteyner
  container: {
    borderRadius: 12,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: COLORS.white,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    flexDirection: "row",
  },

  // İçerik alanı
  content: {
    flex: 1,
    padding: 12,
  },

  // Poster alanı
  posterContainer: {
    width: 100,
    aspectRatio: 2 / 3,
    backgroundColor: COLORS.grayLighter,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  // Poster yoksa ilk harf gösterimi
  placeholderText: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.grayDark,
  },

  // Başlık ve yıl alanı
  titleContainer: {
    marginBottom: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
    color: COLORS.textDefault,
  },

  year: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },

  // Türler alanı
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 6,
    maxWidth: "100%",
  },

  // Boyut varyantları
  small: {
    height: 100,
  },

  medium: {
    height: 130,
  },

  large: {
    height: 150,
  },
});
