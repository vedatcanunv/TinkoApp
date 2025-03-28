import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../helpers/colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: 300,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 10,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  backdrop: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(25, 118, 210, 0.15)',
    zIndex: 1,
  },
  dotsContainer: {
    position: 'absolute',
    width: 380,
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
    position: 'absolute',
  },
});
