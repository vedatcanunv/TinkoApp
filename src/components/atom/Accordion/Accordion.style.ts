import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
    marginRight: 8,
  },
  content: {
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  contentInner: {
    padding: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  disabled: {
    opacity: 0.5,
  },
});
