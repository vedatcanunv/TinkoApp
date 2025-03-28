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
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SMALL,
  },
  personImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personInfo: {
    marginLeft: SPACING.SMALL,
    flex: 1,
  },
});
