import React from 'react';
import {View} from 'react-native';
import {styles} from './Icon.style';
import {IconProps} from './Icon.type';

// Not: Gerçek bir uygulamada burada bir ikon kütüphanesi kullanılabilir
// Örneğin: react-native-vector-icons, @expo/vector-icons, vb.
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color = 'default',
  style,
  ...props
}) => {
  // Renk değerini doğrudan al
  let colorValue = '#000000'; // Varsayılan siyah

  switch (color) {
    case 'primary':
      colorValue = '#007AFF';
      break;
    case 'secondary':
      colorValue = '#5856D6';
      break;
    case 'success':
      colorValue = '#34C759';
      break;
    case 'danger':
      colorValue = '#FF3B30';
      break;
    case 'warning':
      colorValue = '#FF9500';
      break;
    case 'light':
      colorValue = '#8E8E93';
      break;
    case 'white':
      colorValue = '#FFFFFF';
      break;
  }

  // Bu örnek için basit bir placeholder kullanıyoruz
  // Gerçek uygulamada burada ikon kütüphanesinden ilgili ikon render edilir
  return (
    <View style={[styles.container, styles[size], style]} {...props}>
      {/* Burada ikon kütüphanesinden ilgili ikon render edilecek */}
      {/* Örnek: <MaterialIcons name={name} size={sizeMap[size]} color={colorValue} /> */}
    </View>
  );
};
