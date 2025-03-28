import {StyleSheet, Dimensions, Platform} from 'react-native';
import {COLORS} from '../../../helpers/colors';
import {SPACING, TYPOGRAPHY, VISUAL} from '../../../helpers/styleKit';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: SPACING.REGULAR,
    paddingVertical: SPACING.SMALL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDefault,
  },
  mediaList: {
    paddingHorizontal: SPACING.TINY,
    paddingTop: SPACING.SMALL,
    paddingBottom: SPACING.XXL,
  },
  mediaCardContainer: {
    marginBottom: SPACING.REGULAR,
  },
  mediaGridContainer: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: SPACING.SMALL,
  },
  detailCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 10,
  },
  detailCardContent: {
    flex: 1,
    padding: SPACING.REGULAR,
  },
  posterContainer: {
    alignItems: 'center',
    marginBottom: SPACING.REGULAR,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: SPACING.SMALL,
  },
  titleContainer: {
    marginBottom: SPACING.REGULAR,
  },
  originalTitle: {
    marginTop: SPACING.TINY,
    opacity: 0.7,
  },
  detailsContainer: {
    marginBottom: SPACING.REGULAR,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SPACING.SMALL,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.REGULAR,
  },
  ratingText: {
    marginLeft: SPACING.TINY,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'visible',
    marginVertical: SPACING.TINY,
  },
  genreItem: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.TINY,
    borderRadius: SPACING.MEDIUM,
    marginRight: SPACING.SMALL,
    marginBottom: SPACING.SMALL,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  summaryContainer: {
    marginBottom: SPACING.REGULAR,
  },
  summaryText: {
    lineHeight: 20,
  },
  directorContainer: {
    marginBottom: SPACING.REGULAR,
  },
  castContainer: {
    marginBottom: SPACING.REGULAR,
  },
  sectionTitle: {
    marginBottom: SPACING.TINY,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.LARGE,
    marginBottom: SPACING.XXL,
  },
  watchedButton: {
    flex: 1,
    marginLeft: SPACING.SMALL,
  },
  closeButton: {
    flex: 1,
    marginRight: SPACING.SMALL,
  },
  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXL,
  },
  loadingText: {
    marginTop: SPACING.SMALL,
  },
  // Detail loading
  detailLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXL,
    paddingHorizontal: SPACING.LARGE,
  },
  errorText: {
    textAlign: 'center',
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.XXL,
    paddingHorizontal: SPACING.LARGE,
  },
  emptyText: {
    textAlign: 'center',
  },
  infoRow: {
    marginBottom: SPACING.TINY,
  },
  typeTag: {
    paddingHorizontal: SPACING.SMALL,
  },
});

// Film detay kartı için stil tanımlamaları
export const detailStyles = StyleSheet.create({
  fullscreenModal: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backdropContainer: {
    width: '100%',
    height: 240,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 6,

    // Platform.OS === 'android' için ek özellikler
    ...Platform.select({
      android: {
        overflow: 'hidden',
      },
    }),
  },
  contentContainer: {
    flex: 1,
    paddingTop: 210,
    position: 'relative',
    zIndex: 2,
  },
  posterAndInfoContainer: {
    flexDirection: 'row',
    marginTop: -70,
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
    zIndex: 3,
  },
  posterContainer: {
    width: 120,
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
    marginTop: 5,
    paddingTop: 5,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  originalTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 8,
  },
  basicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.white,
    marginRight: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.warning,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  genresScrollContainer: {
    marginTop: 10,
    height: 32,
    zIndex: 5,
  },
  genreItem: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: COLORS.primary,
    height: 28,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  genreText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 90,
    backgroundColor: COLORS.background,
    position: 'relative',
    zIndex: 4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  // Modernleştirilmiş özet bölümü stilleri
  summaryContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 30,
    paddingTop: 5,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
    marginTop: 10,
    paddingTop: 5,
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    fontWeight: '400',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  infoLabel: {
    width: 90,
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 10,
    backgroundColor: COLORS.background,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  primaryButton: {
    flex: 2,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonIcon: {
    marginRight: 8,
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  contentScrollContainer: {
    paddingBottom: 60,
  },
});
