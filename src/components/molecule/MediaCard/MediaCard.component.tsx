import React from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { styles } from "./MediaCard.style";
import { MediaCardProps } from "./MediaCard.type";
import { COLORS } from "../../../helpers/colors";
import { TYPOGRAPHY } from "../../../helpers/styleKit";
import * as IconModule from "react-native-vector-icons/Ionicons";

// Typescript için Cast işlemi
const Icon = IconModule.default;

export const MediaCard = ({
  media,
  size = "medium",
  onPress,
  style,
  showType = true,
  maxGenreTags = 3,
}: MediaCardProps) => {
  // Press işleyicisi
  const handlePress = () => {
    if (onPress && media) {
      onPress(media);
    }
  };

  // Medya başlığı işleme
  const getTitle = () => {
    return media?.title || "Bilinmeyen Başlık";
  };

  // Medya türüne göre tag stilini belirle
  const getTypeTagStyle = () => {
    if (media?.type === "movie") {
      return [styles.typeTag, styles.movieTag];
    } else if (media?.type === "tv" || media?.type === "series") {
      return [styles.typeTag, styles.seriesTag];
    }
    return [styles.typeTag, styles.movieTag];
  };

  // Medya türüne göre etiket adı
  const getTypeTagLabel = () => {
    if (media?.type === "movie") {
      return "Film";
    } else if (media?.type === "tv" || media?.type === "series") {
      return "Dizi";
    }
    return "Film";
  };

  // Kart boyutu
  const sizeStyle =
    size === "small"
      ? styles.small
      : size === "large"
        ? styles.large
        : styles.medium;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        sizeStyle,
        style,
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
      onPress={handlePress}
      android_ripple={{ color: COLORS.primary, borderless: false, radius: -5 }}
    >
      <View style={styles.posterContainer}>
        {media?.imageURL || media?.posterUrl ? (
          <Image
            source={{ uri: media?.imageURL || media?.posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, { backgroundColor: COLORS.grayLight }]}>
            <Text style={{ color: COLORS.white, textAlign: "center" }}>
              Resim Yok
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: TYPOGRAPHY.FONT_SIZE.MEDIUM,
              fontWeight: TYPOGRAPHY.FONT_WEIGHT.BOLD,
              flexShrink: 1,
            }}
            numberOfLines={1}
          >
            {getTitle()}
          </Text>
          {media?.year && (
            <Text
              style={{
                color: COLORS.white,
                fontSize: TYPOGRAPHY.FONT_SIZE.SMALL,
                marginLeft: 8,
                fontWeight: TYPOGRAPHY.FONT_WEIGHT.MEDIUM,
              }}
            >
              {media.year}
            </Text>
          )}
        </View>

        <View style={styles.tagsContainer}>
          {showType && (
            <View style={getTypeTagStyle()}>
              <Text style={styles.typeTagText}>{getTypeTagLabel()}</Text>
            </View>
          )}

          {media?.genres && media.genres.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                flex: 1,
                marginLeft: 5,
              }}
              contentContainerStyle={{
                paddingRight: 10,
              }}
              nestedScrollEnabled={true}
              pointerEvents="box-none"
              onTouchStart={(e) => {
                // ScrollView'a dokunulduğunda olayın yukarı yayılmasını engelle
                e.stopPropagation();
              }}
            >
              {media.genres.map((genre, index) => (
                <Pressable
                  key={`${genre.id || index}`}
                  style={({ pressed }) => [
                    styles.genreTag,
                    pressed && { opacity: 0.9, transform: [{ scale: 0.95 }] },
                  ]}
                  onPress={(e) => {
                    // Türe tıklandığında olayın yukarı yayılmasını engelle
                    e.stopPropagation();
                  }}
                >
                  <Text style={styles.genreTagText}>
                    {typeof genre === "string" ? genre : genre.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Pressable>
  );
};
