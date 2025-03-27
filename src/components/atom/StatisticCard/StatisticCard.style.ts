import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 12,
    padding: SPACING.MEDIUM,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  value: {
    fontSize: 24,
    marginBottom: SPACING.TINY,
  },
  title: {
    textAlign: "center",
  },
});
