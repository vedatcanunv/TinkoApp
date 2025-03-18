import { StyleSheet } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { SPACING, TYPOGRAPHY, VISUAL } from "../../../helpers/styleKit";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: SPACING.REGULAR,
  },
  label: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
    color: COLORS.textPrimary,
    marginBottom: SPACING.TINY,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: VISUAL.RADIUS.MEDIUM,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: SPACING.MEDIUM,
    height: 48,
    position: "relative",
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.FONT_SIZE.REGULAR,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
  },
  iconContainer: {
    paddingHorizontal: SPACING.TINY,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
    marginTop: SPACING.TINY,
  },
  // Variants
  default: {
    backgroundColor: COLORS.inputBackground,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.borderDefault,
  },
  underline: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  filled: {
    borderColor: "transparent",
    backgroundColor: COLORS.inputFilledBackground,
  },
  // Sizes
  small: {
    height: 36,
    paddingHorizontal: 12,
  },
  medium: {
    height: 48,
    paddingHorizontal: 16,
  },
  large: {
    height: 56,
    paddingHorizontal: 20,
  },
  // States
  focused: {
    borderColor: COLORS.primary,
  },
  hasError: {
    borderColor: COLORS.danger,
  },
  disabled: {
    opacity: 0.6,
  },
  // Icons
  leftIcon: {
    marginRight: SPACING.SMALL,
  },
  rightIcon: {
    marginLeft: SPACING.SMALL,
  },
});
