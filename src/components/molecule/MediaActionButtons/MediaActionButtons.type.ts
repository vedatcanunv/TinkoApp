export interface MediaActionButtonsProps {
  /**
   * İzleme listesine ekle butonuna tıklandığında çalışacak fonksiyon
   */
  onAddToWatchlist: () => void;

  /**
   * İzledim butonuna tıklandığında çalışacak fonksiyon
   */
  onMarkAsWatched: () => void;

  /**
   * Alt kenarlık boşluğu
   */
  bottomInset?: number;
}
