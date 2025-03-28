import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {Text} from '../../atom/Text';
import {Tag} from '../../atom/Tag';
import {styles} from './MovieCard.style';
import {Movie, MovieCardProps} from './MovieCard.type';

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  placeholderText,
  size = 'medium',
  onPress,
  style,
  ...props
}) => {
  // İlk harfi almak için
  const getFirstLetter = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  // Karta tıklandığında
  const handlePress = () => {
    if (onPress) {
      onPress(movie);
    }
  };

  // Poster URL'i için bir rastgele ID oluştur
  const getRandomPosterId = () => {
    // Film ID'si varsa onu kullan, yoksa rastgele bir sayı kullan
    return movie.id ? movie.id.toString() : Math.floor(Math.random() * 1000);
  };

  return (
    <TouchableOpacity
      style={[styles.container, styles[size], style]}
      onPress={handlePress}
      activeOpacity={0.8}
      {...props}
    >
      {/* Poster alanı */}
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://picsum.photos/id/${getRandomPosterId()}/200/300`,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>

      {/* İçerik alanı */}
      <View style={styles.content}>
        {/* Başlık ve yıl */}
        <View style={styles.titleContainer}>
          <Text size="l" weight="semibold" numberOfLines={1}>
            {movie.title}
          </Text>
          <Text size="m" color="light">
            {movie.year}
          </Text>
        </View>

        {/* Türler */}
        <View style={styles.genresContainer}>
          {movie.genres
            .map(genre => (
              <Tag
                key={genre.id}
                label={genre.name}
                variant="default"
                size="small"
                isClickable={false}
              />
            ))
            .slice(0, 3)}
        </View>
      </View>
    </TouchableOpacity>
  );
};
