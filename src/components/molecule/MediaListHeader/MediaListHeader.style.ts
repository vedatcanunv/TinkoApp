import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.grayExtraLight,
    borderRadius: 8,
    padding: 4,
    marginTop: SPACING.SMALL,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
  activeTabText: {
    color: COLORS.white,
  },
  inactiveTabText: {
    color: COLORS.primary,
  },
});
