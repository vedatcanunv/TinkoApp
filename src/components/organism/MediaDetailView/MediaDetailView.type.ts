import { MediaContent } from "../../molecule/MediaCard/MediaCard.type";
import { EdgeInsets } from "react-native-safe-area-context";

export interface MediaDetailViewProps {
  /**
   * Gösterilecek medya içeriği
   */
  media: MediaContent;

  /**
   * Güvenli alan kenar boşlukları
   */
  insets: EdgeInsets;

  /**
   * İzlendi olarak işaretlemek için fonksiyon
   */
  onMarkAsWatched?: () => void;

  /**
   * İzleme listesine eklemek için fonksiyon
   */
  onAddToWatchlist?: () => void;
}
