import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING} from '../../../helpers/styleKit';

export const styles = StyleSheet.create({
  detailModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 10,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    color: COLORS.white,
    marginRight: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white,
    marginRight: 10,
  },
  ratingText: {
    color: COLORS.white,
    marginLeft: 4,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
  },
  genresContentContainer: {
    paddingRight: 20,
  },
  genreItem: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.TINY,
    borderRadius: 16,
    marginRight: SPACING.SMALL,
    marginBottom: SPACING.SMALL,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  genreText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  summaryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  summaryText: {
    color: COLORS.grayLight,
    lineHeight: 22,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 90,
    color: COLORS.grayLight,
  },
  detailValue: {
    flex: 1,
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  watchlistButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  watchlistButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  watchedButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  watchedButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
