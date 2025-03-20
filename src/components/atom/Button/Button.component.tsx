import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../helpers/colors";
import { Loading } from "../Loading/Loading.component";
import { styles } from "./Button.style";
import { ButtonProps, ButtonVariant } from "./Button.type";

export const Button: React.FC<ButtonProps> = memo(
  ({
    title,
    onPress,
    disabled = false,
    variant = "primary",
    size = "medium",
    loading = false,
    style,
    iconLeft,
    iconRight,
    ...props
  }) => {
    // Text stili için varyant adını belirleyerek doğru stil referansını al
    const getVariantTextStyle = (variant: ButtonVariant) => {
      switch (variant) {
        case "primary":
          return styles.primaryText;
        case "secondary":
          return styles.secondaryText;
        case "outline":
          return styles.outlineText;
        case "transparent":
          return styles.transparentText;
        default:
          return styles.primaryText;
      }
    };

    // Loading için uygun rengi belirle
    const getLoadingColor = (variant: ButtonVariant) => {
      switch (variant) {
        case "outline":
        case "transparent":
          return COLORS.primary;
        default:
          return COLORS.white;
      }
    };

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
          <Loading
            size={size === "large" ? "medium" : "small"}
            color={getLoadingColor(variant)}
          />
        ) : (
          <>
            {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
            <Text style={[styles.text, getVariantTextStyle(variant)]}>
              {title}
            </Text>
            {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
          </>
        )}
      </TouchableOpacity>
    );
  }
);
