import {StyleSheet} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {LAYOUT} from '../../../helpers/layout';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  // Başlık alanı
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Boş liste
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  emptyText: {
    color: COLORS.textLight,
    fontSize: 16,
    textAlign: 'center',
  },

  // Ekleme butonu
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Film listesi
  list: {
    flex: 1,
    paddingBottom: 250,
  },
});
