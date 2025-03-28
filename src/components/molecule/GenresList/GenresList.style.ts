import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  genresContainer: {
    marginVertical: SPACING.SMALL,
  },
  genresContentContainer: {
    paddingHorizontal: SPACING.MEDIUM,
  },
  genreItem: {
    backgroundColor: COLORS.grayLight,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.TINY,
    borderRadius: 16,
    marginRight: SPACING.SMALL,
    marginBottom: SPACING.TINY,
  },
  genreText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '500',
  },
});
