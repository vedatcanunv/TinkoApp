import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  container: {
    padding: SPACING.MEDIUM,
  },
  title: {
    marginBottom: SPACING.SMALL,
  },
  genreItem: {
    marginBottom: SPACING.SMALL,
  },
  genreBar: {
    height: 6,
    backgroundColor: COLORS.grayLight,
    borderRadius: 16,
    overflow: 'hidden',
  },
  genreBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  genreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.TINY,
  },
});
