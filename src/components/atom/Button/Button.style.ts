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
  filled: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
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
  filledText: {
    color: COLORS.white,
  },
  outlineText: {
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
