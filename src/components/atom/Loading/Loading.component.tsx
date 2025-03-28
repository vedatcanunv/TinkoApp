import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './Loading.style';
import {LoadingProps} from './Loading.type';
import {COLORS} from '../../../helpers/colors';
import {Text} from '../Text';

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color = 'primary',
  text,
  textColor = 'primary',
  fullScreen = false,
  style,
}) => {
  // Size değerlerine göre ActivityIndicator size'ını ayarla
  const indicatorSize = size === 'large' ? 'large' : 'small';

  // Renk değerini belirle
  const indicatorColor =
    color === 'primary' ? COLORS.primary : color === 'white' ? COLORS.white : color;

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <ActivityIndicator size={indicatorSize} color={indicatorColor} />

      {text && (
        <Text color={textColor as any} size={size === 'large' ? 'm' : 's'} style={styles.text}>
          {text}
        </Text>
      )}
    </View>
  );
};
