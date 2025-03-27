import React from "react";
import { Image, View } from "react-native";
import { Text } from "../Text";
import { styles } from "./ProfileAvatar.style";
import { ProfileAvatarProps } from "./ProfileAvatar.type";
import { COLORS } from "../../../helpers/colors";

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  source,
  size = "medium",
  style,
}) => {
  const containerStyle = [styles.container, styles[size], style];

  if (!source) {
    return (
      <View style={[containerStyle, { backgroundColor: COLORS.primary }]}>
        <Text size="xl" color="white">
          ?
        </Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Image
        source={source}
        style={[styles.image, styles[size]]}
        resizeMode="cover"
      />
    </View>
  );
};
