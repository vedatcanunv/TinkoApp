import React, {useCallback, memo} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from '../../../helpers/colors';
import {MediaDetailCardProps} from './MediaDetailCard.type';
import {styles} from './MediaDetailCard.style';
import {StateView} from '../../molecule/StateView';
import {MediaDetailView} from '../MediaDetailView';

export const MediaDetailCard = memo<MediaDetailCardProps>(
  ({
    media,
    visible,
    onClose,
    onMarkAsWatched,
    onAddToWatchlist,
    loading = false,
    onContentChange,
  }) => {
    const insets = useSafeAreaInsets();

    // İçerik değişikliği yaparak kapatma işlemi
    const handleClosePress = useCallback(() => {
      if (onContentChange) {
        onContentChange(null); // Önce içeriği sıfırla
      }
      onClose(); // Sonra modal'ı kapat
    }, [onContentChange, onClose]);

    // Medya içeriği yoksa render etme
    if (!media) return null;

    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent
        onRequestClose={onClose}
      >
        <View style={styles.detailModalContainer}>
          <View style={styles.detailCard}>
            {/* Kapat Butonu */}
            <TouchableOpacity
              style={[styles.closeButtonContainer, {top: insets.top + 16}]}
              onPress={handleClosePress}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color={COLORS.white} />
            </TouchableOpacity>

            {/* Yükleme durumu */}
            <StateView loading={loading} loadingText="İçerik yükleniyor..." />

            {/* Ana içerik */}
            {!loading && (
              <MediaDetailView
                media={media}
                insets={insets}
                onMarkAsWatched={onMarkAsWatched}
                onAddToWatchlist={onAddToWatchlist}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
);
