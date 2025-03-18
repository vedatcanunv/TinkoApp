import React, { memo } from "react";
import { Text as RNText } from "react-native";
import { TextProps } from "./Text.type";
import { styles } from "./Text.style";

export const Text = memo(
  ({
    children,
    size = "m",
    weight = "regular",
    color = "default",
    align = "left",
    style,
    uppercase,
    lowercase,
    capitalize,
    underline,
    ...props
  }: TextProps) => {
    // Stil kombinasyonları
    const textStyle = [
      styles[size],
      styles[weight],
      styles[color],
      styles[align],
      uppercase && styles.uppercase,
      lowercase && styles.lowercase,
      capitalize && styles.capitalize,
      underline && styles.underline,
      style,
    ];

    return (
      <RNText style={textStyle} {...props}>
        {children}
      </RNText>
    );
  }
);
