import {EdgeInsets} from 'react-native-safe-area-context';
import {MediaContent} from '../../molecule/MediaCard/MediaCard.type';

export interface MediaHeaderProps {
  /**
   * Gösterilecek medya içeriği
   */
  media: MediaContent;

  /**
   * Güvenli alan kenar boşlukları
   */
  insets: EdgeInsets;
}
