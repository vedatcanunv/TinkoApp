import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.MEDIUM,
  },
  watchlistButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.MEDIUM,
    flex: 1,
    marginRight: SPACING.SMALL,
    alignItems: "center",
    justifyContent: "center",
  },
  watchlistButtonText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  watchedButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.MEDIUM,
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  watchedButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
});
