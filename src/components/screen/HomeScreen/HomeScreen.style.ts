import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { LAYOUT } from "../../../helpers/layout";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 0,
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: COLORS.background,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerAddButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAddButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "500",
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },
  listContentContainerEmpty: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
    flexGrow: 1,
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
  genreContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  genreTag: {
    backgroundColor: COLORS.grayLighter,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grayLighter,
    justifyContent: "center",
    alignItems: "center",
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
});
