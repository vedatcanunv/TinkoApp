import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    maxWidth: '50%',
  },
  mediaGridContainer: {
    justifyContent: 'space-between',
  },
  footerContainer: {
    paddingVertical: SPACING.MEDIUM,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: SPACING.SMALL,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
