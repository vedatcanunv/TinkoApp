import { StyleProp, ViewStyle } from "react-native";
import { MediaContent } from "../../../components/molecule/MediaCard/MediaCard.type";

export interface MediaDetailCardProps {
  /**
   * Görüntülenecek medya içeriği
   */
  media: MediaContent | null;

  /**
   * Modalin görünür olup olmadığı
   */
  visible: boolean;

  /**
   * Modalin kapanması için fonksiyon
   */
  onClose: () => void;

  /**
   * İzlendi butonu için fonksiyon
   */
  onMarkAsWatched: () => void;

  /**
   * İzleme listesine ekle butonu için fonksiyon
   */
  onAddToWatchlist: () => void;

  /**
   * Yükleme durumu
   * @default false
   */
  loading?: boolean;

  /**
   * Özel stiller
   */
  style?: StyleProp<ViewStyle>;

  /**
   * İçerik değişiklikleri için fonksiyon
   */
  onContentChange?: (media: MediaContent | null) => void;
}
