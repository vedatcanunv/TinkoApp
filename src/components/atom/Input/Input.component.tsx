import React, {useState, useCallback, memo} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './Input.style';
import {InputProps, InputVariant, InputSize} from './Input.type';
import {Text} from '../Text';
import {COLORS} from '../../../helpers/colors';
import * as IconModule from 'react-native-vector-icons/Ionicons';

// Typescript için Cast işlemi
const Icon = IconModule.default;

export const Input = memo(
  ({
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    secureTextEntry,
    variant = 'default',
    size = 'medium',
    disabled = false,
    leftIcon,
    rightIcon,
    style,
    ...props
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        if (props.onFocus) {
          props.onFocus(e);
        }
      },
      [props.onFocus]
    );

    const handleBlur = useCallback(
      (e: any) => {
        setIsFocused(false);
        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur]
    );

    const togglePasswordVisibility = useCallback(() => {
      setIsPasswordVisible(prev => !prev);
    }, []);

    const getVariantStyle = (variant: InputVariant) => {
      return styles[variant];
    };

    const getSizeStyle = (size: InputSize) => {
      return styles[size];
    };

    return (
      <View style={[styles.container, style]}>
        {label && (
          <Text size="m" weight="medium" color="light" style={styles.label}>
            {label}
          </Text>
        )}
        <View
          style={[
            styles.inputContainer,
            getVariantStyle(variant),
            getSizeStyle(size),
            isFocused && styles.focused,
            error && styles.hasError,
            disabled && styles.disabled,
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

          <TextInput
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            placeholderTextColor={COLORS.textLighter}
            autoCorrect={false}
            autoCapitalize="none"
            editable={!disabled}
            {...props}
          />

          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}

          {secureTextEntry && (
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={togglePasswordVisibility}
              hitSlop={styles.passwordButtonHitSlop}
              disabled={disabled}
            >
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color={COLORS.textLighter}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text size="s" color="danger" style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);
