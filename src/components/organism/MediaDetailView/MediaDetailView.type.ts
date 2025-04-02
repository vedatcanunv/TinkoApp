import {MediaContent} from '../../molecule/MediaCard/MediaCard.type';

export interface MediaDetailViewProps {
  /**
   * Gösterilecek medya detayları
   */
  media: MediaContent;

  /**
   * Güvenli alan kenar boşlukları
   */
  insets: {
    top: number;
    bottom: number;
  };

  /**
   * Sayfayı kapatma fonksiyonu
   */
  onClose: () => void;

  /**
   * Medyayı izlendi olarak işaretleme fonksiyonu
   */
  onMarkAsWatched: () => void;

  /**
   * İzleme listesine eklemek için fonksiyon
   */
  onAddToWatchlist: () => void;
}
