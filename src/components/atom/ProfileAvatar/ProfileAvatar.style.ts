import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: COLORS.grayLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  small: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 80,
    height: 80,
  },
  large: {
    width: 120,
    height: 120,
  },
});
