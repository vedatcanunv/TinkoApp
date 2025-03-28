import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING, TYPOGRAPHY, VISUAL} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  // Button base style
  button: {
    borderRadius: VISUAL.RADIUS.MEDIUM,
    paddingHorizontal: SPACING.REGULAR,
    paddingVertical: SPACING.MEDIUM,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // Button variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  // Button sizes
  small: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
  medium: {
    paddingHorizontal: SPACING.REGULAR,
    paddingVertical: SPACING.MEDIUM,
  },
  large: {
    paddingHorizontal: SPACING.LARGE,
    paddingVertical: SPACING.REGULAR,
  },
  // Button states
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: TYPOGRAPHY.FONT_SIZE.REGULAR,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
  },
  // Text colors based on button variant
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  transparentText: {
    color: COLORS.primary,
  },
  // Icon styles
  iconLeft: {
    marginRight: SPACING.SMALL,
  },
  iconRight: {
    marginLeft: SPACING.SMALL,
  },
});
