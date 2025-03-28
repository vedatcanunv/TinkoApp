import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text';
import {styles} from './Tag.style';
import {TagProps} from './Tag.type';
import {COLORS} from '../../../helpers/colors';

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

  // Metin boyutunu boyuta göre ayarla
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'medium':
        return 12;
      case 'large':
        return 14;
      default:
        return 12;
    }
  };

  // Metin stillerini hesapla
  const getTextColor = () => {
    if (isSelected) {
      return COLORS.primary;
    }

    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.textDefault;
      case 'outline':
        return COLORS.textDefault;
      default:
        return COLORS.textDefault;
    }
  };

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
