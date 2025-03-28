import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 999,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});
