import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING, TYPOGRAPHY, VISUAL } from "../../../helpers/styleKit";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - SPACING.MEDIUM; // 2 kart yan yana, daha az margin ile
const CARD_ASPECT_RATIO = 0.75; // Poster oranı 2:3 (film posterleri için standart)

export const styles = StyleSheet.create({
  // Kart ana konteyner
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH / CARD_ASPECT_RATIO, // Görsel oranına göre boy
    borderRadius: VISUAL.RADIUS.SMALL,
    overflow: "hidden",
    backgroundColor: COLORS.backgroundDark,
    elevation: 5,
    position: "relative",
    margin: SPACING.TINY,
    marginBottom: SPACING.MEDIUM,
  },
  // Kart boyutları - Artık yükseklik görsel oranına göre belirleniyor
  small: {
    width: width / 2.2, // Biraz daha büyük
    height: width / 2.2 / CARD_ASPECT_RATIO,
  },
  medium: {
    width: CARD_WIDTH,
    height: CARD_WIDTH / CARD_ASPECT_RATIO,
  },
  large: {
    width: width - SPACING.MEDIUM * 2,
    height: (width - SPACING.MEDIUM * 2) / CARD_ASPECT_RATIO,
  },
  // Poster konteyner (tüm arka planı kaplayacak)
  posterContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    borderRadius: VISUAL.RADIUS.SMALL,
    overflow: "hidden",
    backgroundColor: COLORS.backgroundDark,
  },
  poster: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // İçerik bölümü (transparan ve poster üzerinde)
  content: {
    position: "absolute",
    padding: SPACING.MEDIUM,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    backgroundColor: "rgba(0,0,0,0.5)", // Tek bir transparan katman
    paddingVertical: SPACING.MEDIUM,
    borderBottomLeftRadius: VISUAL.RADIUS.SMALL,
    borderBottomRightRadius: VISUAL.RADIUS.SMALL,
  },
  // Başlık ve yıl
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.SMALL,
  },
  // Tür etiketleri
  tagsContainer: {
    flexDirection: "row",
    marginTop: SPACING.SMALL,
    alignItems: "center",
    overflow: "visible",
    width: "100%",
  },
  // Tür etiketleri stilleri
  genreContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  genreTag: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.TINY,
    borderRadius: VISUAL.RADIUS.MEDIUM,
    marginRight: SPACING.SMALL,
    backgroundColor: COLORS.primary,
    elevation: 3,
  },
  genreTagText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  // MediaCard için özel tip tag stilleri (Film/Dizi)
  typeTag: {
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: SPACING.TINY / 2,
    borderRadius: VISUAL.RADIUS.SMALL,
    marginRight: SPACING.SMALL,
  },
  movieTag: {
    backgroundColor: COLORS.danger,
  },
  seriesTag: {
    backgroundColor: COLORS.warning,
  },
  typeTagText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
});
