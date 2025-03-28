import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sizes
  small: {
    width: 16,
    height: 16,
  },
  medium: {
    width: 24,
    height: 24,
  },
  large: {
    width: 32,
    height: 32,
  },
  // Colors
  colorDefault: {
    color: COLORS.textDefault,
  },
  colorPrimary: {
    color: COLORS.primary,
  },
  colorSecondary: {
    color: COLORS.secondary,
  },
  colorSuccess: {
    color: COLORS.success,
  },
  colorDanger: {
    color: COLORS.danger,
  },
  colorWarning: {
    color: COLORS.warning,
  },
  colorLight: {
    color: COLORS.grayDark,
  },
  colorWhite: {
    color: COLORS.white,
  },
});
