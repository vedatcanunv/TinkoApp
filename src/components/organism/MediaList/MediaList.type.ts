import {StyleProp, ViewStyle} from 'react-native';
import {MediaContent} from '../../molecule/MediaCard/MediaCard.type';

export interface MediaListProps {
  /**
   * Gösterilecek medya listesi
   */
  data: MediaContent[];

  /**
   * Medya kartına tıklandığında tetiklenecek fonksiyon
   */
  onPress: (media: MediaContent) => void;

  /**
   * Daha fazla içerik yüklendiğinde tetiklenecek fonksiyon
   */
  onLoadMore?: () => void;

  /**
   * Daha fazla içerik yüklenme durumu
   */
  loadingMore?: boolean;

  /**
   * Yenileme durumu
   */
  refreshing?: boolean;

  /**
   * Yenileme işlemi tetiklendiğinde çalışacak fonksiyon
   */
  onRefresh?: () => void;

  /**
   * Dış view style
   */
  style?: StyleProp<ViewStyle>;
}
