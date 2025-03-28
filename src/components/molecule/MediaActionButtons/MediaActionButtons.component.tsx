import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '../../../components/atom';
import {styles} from './MediaActionButtons.style';
import {MediaActionButtonsProps} from './MediaActionButtons.type';

export const MediaActionButtons: React.FC<MediaActionButtonsProps> = ({
  onAddToWatchlist,
  onMarkAsWatched,
  bottomInset = 0,
}) => {
  return (
    <View style={[styles.buttonContainer, {marginBottom: bottomInset + 20}]}>
      <TouchableOpacity
        style={styles.watchlistButton}
        activeOpacity={0.7}
        onPress={onAddToWatchlist}
      >
        <Text style={styles.watchlistButtonText}>İzleme Listeme Ekle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.watchedButton} activeOpacity={0.7} onPress={onMarkAsWatched}>
        <Text style={styles.watchedButtonText}>İzledim</Text>
      </TouchableOpacity>
    </View>
  );
};
