import { Dimensions, Platform, StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING, VISUAL } from "../../../helpers/styleKit";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mediaList: {
    paddingTop: 12,
  },
  listContentContainer: {
    paddingBottom: 40,
    backgroundColor: COLORS.background,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listContentContainerEmpty: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listStyle: {
    backgroundColor: COLORS.background,
  },
  listFooter: {
    height: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLighter,
    marginBottom: 16,
  },
  movieList: {
    paddingBottom: 16,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  posterContainer: {
    marginRight: 12,
  },
  posterPlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: COLORS.grayLighter,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
  },
  movieTitle: {
    marginBottom: 4,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 16,
  },
  addMovieButton: {
    minWidth: 120,
  },
  mediaItem: {
    marginBottom: SPACING.MEDIUM,
    flexDirection: "column",
    alignItems: "center",
  },
  loadingMoreContainer: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loadingMoreText: {
    marginLeft: 8,
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: SPACING.TINY,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingOverlayContent: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: VISUAL.RADIUS.MEDIUM,
    padding: SPACING.LARGE,
    minWidth: width * 0.7,
    maxWidth: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  loadingOverlayText: {
    marginTop: SPACING.MEDIUM,
    textAlign: "center",
    maxWidth: "90%",
  },
  detailModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailCard: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 10,
  },
  detailCardContent: {
    flex: 1,
    padding: SPACING.REGULAR,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: SPACING.SMALL,
  },
});
