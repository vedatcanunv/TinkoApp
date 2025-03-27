import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { LAYOUT } from "../../../helpers/layout";
import { SPACING } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.LARGE,
    paddingVertical: SPACING.MEDIUM,
  },
  scrollContainer: {
    flex: 1,
  },
  statsContainer: {
    padding: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.grayExtraLight,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 8,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: COLORS.grayExtraLight,
    borderRadius: 8,
    padding: 16,
  },
  statItem: {
    marginBottom: 12,
  },
  statBar: {
    height: 8,
    backgroundColor: COLORS.grayLight,
    borderRadius: 4,
    marginBottom: 4,
  },
  statBarFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  statLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  personItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  personImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grayLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  personInfo: {
    flex: 1,
  },
  actionsContainer: {
    padding: 16,
    paddingBottom: LAYOUT.TAB_BAR_HEIGHT + 40,
  },
  actionButton: {
    marginBottom: 12,
  },
  logoutButton: {
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    minWidth: 120,
  },
  stats: {
    marginBottom: SPACING.MEDIUM,
  },
  mediaList: {
    marginBottom: SPACING.LARGE,
  },
  contentContainer: {
    flexGrow: 1,
  },
  section: {
    marginHorizontal: SPACING.SMALL,
    marginBottom: SPACING.LARGE,
  },
});
