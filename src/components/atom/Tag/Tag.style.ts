import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';

export const styles = StyleSheet.create({
  // Ana konteyner
  container: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    maxWidth: 120,
    marginRight: 8,
    marginBottom: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  // Varyantlar
  default: {
    backgroundColor: COLORS.grayExtraLight,
  },
  primary: {
    backgroundColor: COLORS.buttonPrimaryLight,
  },
  secondary: {
    backgroundColor: COLORS.backgroundLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },

  // Boyutlar
  small: {
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  medium: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  large: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
  },

  // Durumlar
  selected: {
    backgroundColor: COLORS.buttonPrimaryLight,
    borderColor: COLORS.primary,
  },
  selectedOutline: {
    borderColor: COLORS.primary,
  },

  // Metin
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  textDefault: {
    color: COLORS.textDefault,
  },
  textPrimary: {
    color: COLORS.primary,
  },
  textSecondary: {
    color: COLORS.textDefault,
  },
  textOutline: {
    color: COLORS.textDefault,
  },
  textSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
