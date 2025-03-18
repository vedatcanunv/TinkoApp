import { Platform } from "react-native";
import { COLORS } from "./colors";

/**
 * Tipografi tanımlamaları
 */
export const TYPOGRAPHY = {
  // Yazı boyutları
  FONT_SIZE: {
    SMALL: 12,
    MEDIUM: 14,
    REGULAR: 16,
    LARGE: 18,
    XL: 20,
    XXL: 24,
    XXXL: 28,
  },

  // Yazı kalınlıkları - React Native için geçerli değerler
  FONT_WEIGHT: {
    REGULAR: "400",
    MEDIUM: "500",
    SEMIBOLD: "600",
    BOLD: "700",
  } as const,

  // Hazır yazı stilleri
  TEXT: {
    HEADER: {
      fontSize: 24,
      fontWeight: "700" as const,
      color: COLORS.textPrimary,
    },
    SUBHEADER: {
      fontSize: 20,
      fontWeight: "600" as const,
      color: COLORS.textPrimary,
    },
    TITLE: {
      fontSize: 18,
      fontWeight: "600" as const,
      color: COLORS.textPrimary,
    },
    BODY: {
      fontSize: 16,
      fontWeight: "400" as const,
      color: COLORS.textPrimary,
    },
    CAPTION: {
      fontSize: 14,
      fontWeight: "400" as const,
      color: COLORS.textSecondary,
    },
    SMALL: {
      fontSize: 12,
      fontWeight: "400" as const,
      color: COLORS.textSecondary,
    },
  },
};

/**
 * Layout tanımlamaları
 */
export const SPACING = {
  // Temel aralıklar
  TINY: 4,
  SMALL: 8,
  MEDIUM: 12,
  REGULAR: 16,
  LARGE: 24,
  XL: 32,
  XXL: 40,
  XXXL: 60,
};

/**
 * Görsel efekt tanımlamaları
 */
export const VISUAL = {
  // Köşe yuvarlaklıkları
  RADIUS: {
    SMALL: 4,
    MEDIUM: 8,
    LARGE: 12,
    XL: 16,
    XXL: 20,
    ROUND: 50,
  },

  // Gölge stilleri
  SHADOW: {
    SMALL: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    MEDIUM: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    LARGE: {
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 5,
    },
    COLORED: (color: string) => ({
      shadowColor: color,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 8,
    }),
  },
};

/**
 * Ortak stil yardımcıları
 */
export const STYLE_HELPERS = {
  ROW: {
    flexDirection: "row",
    alignItems: "center",
  },
  CENTER: {
    justifyContent: "center",
    alignItems: "center",
  },
  SPACE_BETWEEN: {
    justifyContent: "space-between",
  },
};
