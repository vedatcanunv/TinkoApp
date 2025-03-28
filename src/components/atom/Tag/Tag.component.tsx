import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text';
import {styles} from './Tag.style';
import {TagProps} from './Tag.type';

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  isClickable = true,
  isSelected = false,
  onSelect,
  style,
  ...props
}) => {
  // Tag stillerini hesapla
  const containerStyle = [
    styles.container,
    styles[variant],
    styles[size],
    isSelected && (variant === 'outline' ? styles.selectedOutline : styles.selected),
    style,
  ];

  // Tıklama işlevselliği
  const handlePress = () => {
    if (isClickable && onSelect) {
      onSelect();
    }
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      disabled={!isClickable}
      activeOpacity={isClickable ? 0.7 : 1}
      {...props}
    >
      <Text
        size="s"
        color={isSelected ? 'primary' : variant === 'primary' ? 'primary' : 'default'}
        weight={isSelected ? 'semibold' : 'medium'}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
