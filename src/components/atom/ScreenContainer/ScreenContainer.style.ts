import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {Platform} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    marginTop: Platform.OS === 'ios' ? null : 30,
    paddingHorizontal: 8,
  },
});
