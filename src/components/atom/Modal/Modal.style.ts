import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING, VISUAL } from "../../../helpers/styleKit";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: COLORS.black,
  },
  contentContainer: {
    backgroundColor: COLORS.background,
    width: "100%",
    borderTopLeftRadius: VISUAL.RADIUS.LARGE,
    borderTopRightRadius: VISUAL.RADIUS.LARGE,
    paddingTop: SPACING.MEDIUM,
    paddingHorizontal: SPACING.REGULAR,
    paddingBottom: SPACING.LARGE,
    maxHeight: "90%",
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.textLighter,
    alignSelf: "center",
    marginBottom: SPACING.MEDIUM,
  },
  dragHandleContainer: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    marginBottom: SPACING.MEDIUM,
  },
});
