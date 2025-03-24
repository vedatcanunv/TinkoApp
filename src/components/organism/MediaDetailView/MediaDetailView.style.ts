import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: SPACING.SMALL,
  },
  summaryContainer: {
    padding: SPACING.MEDIUM,
  },
  summaryText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  detailsContainer: {
    padding: SPACING.MEDIUM,
    paddingBottom: SPACING.LARGE,
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: SPACING.TINY,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
    width: 100,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
