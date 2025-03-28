import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text} from '../Text';
import {styles} from './MediaCard.style';
import {MediaCardProps} from './MediaCard.type';
import {COLORS} from '../../../helpers/colors';

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  posterUrl,
  type,
  rating,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={({pressed}) => [styles.container, style, pressed && {opacity: 0.8}]}
      onPress={onPress}
    >
      <Image source={{uri: posterUrl}} style={styles.poster} />
      <View style={styles.overlay}>
        <Text size="s" weight="medium" color="white" style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.footer}>
          <Text size="xs" color="white" style={styles.type}>
            {type === 'movie' ? 'Film' : 'Dizi'}
          </Text>
          {rating && (
            <View style={styles.ratingContainer}>
              <Text size="xs" color="white">
                {rating.toFixed(1)}
              </Text>
              <Text size="xs" color="primary">
                ★
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
