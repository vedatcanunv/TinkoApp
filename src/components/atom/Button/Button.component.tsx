import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { styles } from "./Button.style";
import { ButtonProps } from "./Button.type";

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  size = "medium",
  loading = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "outline" || variant === "transparent"
              ? "#007AFF"
              : "#FFFFFF"
          }
        />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
