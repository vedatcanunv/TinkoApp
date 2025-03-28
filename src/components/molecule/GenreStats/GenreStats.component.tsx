import React from 'react';
import {View} from 'react-native';
import {Text} from '../../atom/Text';
import {styles} from './GenreStats.style';
import {GenreStatsProps} from './GenreStats.type';

export const GenreStats: React.FC<GenreStatsProps> = ({title, genres, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text size="xl" weight="bold" color="primary" style={styles.title}>
        {title}
      </Text>
      {genres.map(genre => (
        <View key={genre.id} style={styles.genreItem}>
          <View style={styles.genreBar}>
            <View style={[styles.genreBarFill, {width: `${genre.percentage}%`}]} />
          </View>
          <View style={styles.genreInfo}>
            <Text size="m" color="light">
              {genre.name}
            </Text>
            <Text size="m" color="light">
              {genre.percentage}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
