import { Platform, Dimensions } from "react-native";

// Ekran boyutu için sabitleri tanımla
const { width, height } = Dimensions.get("window");
export const isIphoneX =
  Platform.OS === "ios" && (height >= 812 || width >= 812);

// TabBar ve Layout için sabitler
export const LAYOUT = {
  // Home indicator yüksekliği
  HOME_INDICATOR_HEIGHT: isIphoneX ? 25 : 0,

  // TabBar yüksekliği
  TAB_BAR_HEIGHT: 60,

  // Toplam bottom padding (TabBar + home indicator + ekstra boşluk)
  BOTTOM_PADDING: 95,

  // Ekstra boşluk
  EXTRA_PADDING: 15,

  // SafeArea değerleri
  SAFE_AREA: {
    TOP: Platform.OS === "ios" ? 44 : 0,
    BOTTOM: isIphoneX ? 34 : 0,
  },

  // + Buton pozisyonu
  ADD_BUTTON_BOTTOM: 15,
};
