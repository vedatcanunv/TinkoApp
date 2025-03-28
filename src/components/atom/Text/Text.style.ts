import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {TYPOGRAPHY} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  // Font weights
  regular: {
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.REGULAR,
  },
  medium: {
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
  },
  semibold: {
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.SEMIBOLD,
  },
  bold: {
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  // Font sizes
  s: {
    fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
    lineHeight: 16,
  },
  m: {
    fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
    lineHeight: 20,
  },
  l: {
    fontSize: TYPOGRAPHY.FONT_SIZE.REGULAR,
    lineHeight: 24,
  },
  xl: {
    fontSize: TYPOGRAPHY.FONT_SIZE.LARGE,
    lineHeight: 28,
  },
  xxl: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XL,
    lineHeight: 32,
  },
  xxxl: {
    fontSize: TYPOGRAPHY.FONT_SIZE.XXL,
    lineHeight: 36,
  },
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
  },
  // Colors
  default: {
    color: COLORS.textDefault,
  },
  primary: {
    color: COLORS.primary,
  },
  secondary: {
    color: COLORS.secondary,
  },
  info: {
    color: COLORS.info,
  },
  success: {
    color: COLORS.success,
  },
  warning: {
    color: COLORS.warning,
  },
  danger: {
    color: COLORS.danger,
  },
  light: {
    color: COLORS.textLight,
  },
  lighter: {
    color: COLORS.textLighter,
  },
  white: {
    color: COLORS.white,
  },
  // Text align
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  justify: {
    textAlign: 'justify',
  },
  // Additional styles
  underline: {
    textDecorationLine: 'underline',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});
