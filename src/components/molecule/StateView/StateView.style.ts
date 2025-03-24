import { StyleSheet } from "react-native";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.LARGE,
  },
  loadingText: {
    marginTop: SPACING.MEDIUM,
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.LARGE,
  },
  errorText: {
    textAlign: "center",
    marginBottom: SPACING.MEDIUM,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.LARGE,
  },
  emptyText: {
    textAlign: "center",
  },
});
