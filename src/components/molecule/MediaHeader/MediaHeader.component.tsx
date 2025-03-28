import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {Text} from '../../atom/Text';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from '../../../helpers/colors';
import {styles} from './MediaHeader.style';
import {MediaHeaderProps} from './MediaHeader.type';

export const MediaHeader = memo<MediaHeaderProps>(({media, insets}) => (
  <View style={styles.headerContainer}>
    {media.posterUrl && (
      <Image source={{uri: media.posterUrl}} style={styles.poster} resizeMode="cover" />
    )}
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{media.title}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>{media.year}</Text>
        <View style={styles.dot} />
        <Text style={styles.infoText}>{media.duration}</Text>
        {media.rating && (
          <>
            <View style={styles.dot} />
            <Ionicons name="star" size={16} color={COLORS.warning} />
            <Text style={styles.ratingText}>{media.rating.toFixed(1)}</Text>
          </>
        )}
      </View>
    </View>
  </View>
));
