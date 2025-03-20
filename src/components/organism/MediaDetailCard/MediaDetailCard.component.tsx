import React from "react";
import { View, ScrollView, Modal, Image, TouchableOpacity } from "react-native";
import { Text, Loading } from "../../../components/atom";
import { styles } from "./MediaDetailCard.style";
import { MediaDetailCardProps } from "./MediaDetailCard.type";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../helpers/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Genre } from "../../../components/molecule/MediaCard/MediaCard.type";

export const MediaDetailCard: React.FC<MediaDetailCardProps> = ({
  media,
  visible,
  onClose,
  onMarkAsWatched,
  onAddToWatchlist,
  loading = false,
}) => {
  const insets = useSafeAreaInsets();

  if (!media) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.detailModalContainer}>
        <View style={styles.detailCard}>
          {/* Kapat Butonu */}
          <TouchableOpacity
            style={[styles.closeButtonContainer, { top: insets.top + 16 }]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color={COLORS.white} />
          </TouchableOpacity>

          {loading ? (
            <View style={styles.loadingContainer}>
              <Loading
                size="large"
                color="white"
                text="Yükleniyor..."
                textColor={COLORS.white as any}
              />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingTop: insets.top + 20,
                paddingBottom: insets.bottom + 40,
              }}
              showsVerticalScrollIndicator={false}
            >
              {/* Poster ve Başlık */}
              <View style={styles.headerContainer}>
                {media.posterUrl && (
                  <Image
                    source={{ uri: media.posterUrl }}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{media.title}</Text>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoText}>{media.year}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.infoText}>{media.duration}</Text>
                    {media.rating && (
                      <>
                        <View style={styles.dot} />
                        <Ionicons
                          name="star"
                          size={16}
                          color={COLORS.warning}
                        />
                        <Text style={styles.ratingText}>
                          {media.rating.toFixed(1)}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </View>

              {/* Türler */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.genresContainer}
                contentContainerStyle={styles.genresContentContainer}
              >
                {media.genres &&
                  media.genres.map((genre: Genre) => (
                    <View key={genre.id.toString()} style={styles.genreItem}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
              </ScrollView>

              {/* Özet */}
              <View style={styles.summaryContainer}>
                <Text style={styles.sectionTitle}>Özet</Text>
                <Text style={styles.summaryText}>
                  {media.summary ||
                    `${media.title} hakkında özet bilgi bulunamadı.`}
                </Text>
              </View>

              {/* Yapım Bilgileri */}
              <View style={styles.detailsContainer}>
                <Text style={styles.sectionTitle}>Yapım Bilgileri</Text>

                {/* Yönetmen */}
                {media.director && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Yönetmen:</Text>
                    <Text style={styles.detailValue}>{media.director}</Text>
                  </View>
                )}

                {/* Türler */}
                {media.genres && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Türler:</Text>
                    <Text style={styles.detailValue}>
                      {media.genres.map((g: Genre) => g.name).join(", ")}
                    </Text>
                  </View>
                )}

                {/* Oyuncular */}
                {media.cast && media.cast.length > 0 && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Oyuncular:</Text>
                    <Text style={styles.detailValue}>
                      {media.cast.join(", ")}
                    </Text>
                  </View>
                )}

                {/* Yıl */}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Yıl:</Text>
                  <Text style={styles.detailValue}>{media.year}</Text>
                </View>

                {/* Süre */}
                {media.duration && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Süre:</Text>
                    <Text style={styles.detailValue}>{media.duration}</Text>
                  </View>
                )}

                {/* IMDB Puanı */}
                {media.rating && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>IMDB Puanı:</Text>
                    <Text style={styles.detailValue}>
                      {media.rating.toFixed(1)}/10
                    </Text>
                  </View>
                )}
              </View>

              {/* İzlendi/İzleme Listesi Butonları */}
              <View
                style={[
                  styles.buttonContainer,
                  { marginBottom: insets.bottom + 20 },
                ]}
              >
                <TouchableOpacity
                  style={styles.watchlistButton}
                  activeOpacity={0.7}
                  onPress={onAddToWatchlist}
                >
                  <Text style={styles.watchlistButtonText}>
                    İzleme Listeme Ekle
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.watchedButton}
                  activeOpacity={0.7}
                  onPress={onMarkAsWatched}
                >
                  <Text style={styles.watchedButtonText}>İzledim</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};
