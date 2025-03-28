import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.TINY,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.white,
    minWidth: 100,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
