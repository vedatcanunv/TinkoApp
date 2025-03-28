import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: SPACING.MEDIUM,
    marginBottom: SPACING.MEDIUM,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: SPACING.MEDIUM,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.SMALL,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.TINY,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.grayLight,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.grayLight,
    marginHorizontal: 6,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.warning,
    marginLeft: 4,
  },
});
