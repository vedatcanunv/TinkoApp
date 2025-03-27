import { StyleProp, ViewStyle } from "react-native";
import { MediaContent } from "../../molecule/MediaCard/MediaCard.type";

export interface Media {
  id: string;
  title: string;
  posterUrl: string;
  type: "movie" | "series";
  rating?: number;
}

export interface ProfileMediaListProps {
  /**
   * Başlık
   */
  title: string;

  /**
   * İzlenen medya listesi
   */
  watchedMedia: MediaContent[];

  /**
   * İzlenecek medya listesi
   */
  watchlistMedia: MediaContent[];

  /**
   * Medya seçildiğinde çağrılacak callback
   */
  onMediaPress: (media: MediaContent) => void;

  /**
   * Özel stil
   */
  style?: StyleProp<ViewStyle>;
}
