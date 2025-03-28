import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING, VISUAL} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  container: {
    padding: SPACING.MEDIUM,
  },
  title: {
    marginBottom: SPACING.MEDIUM,
  },
  genreItem: {
    marginBottom: SPACING.MEDIUM,
  },
  genreBar: {
    height: 8,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: VISUAL.RADIUS.SMALL,
    overflow: 'hidden',
    marginBottom: SPACING.TINY,
  },
  genreBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  genreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
