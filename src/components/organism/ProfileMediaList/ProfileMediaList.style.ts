import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.MEDIUM,
    paddingBottom: SPACING.MEDIUM,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginTop: SPACING.MEDIUM,
  },
  mediaCard: {
    width: "48%",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.LARGE,
  },
});
