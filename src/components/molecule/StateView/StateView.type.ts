export interface StateViewProps {
  /**
   * Yükleme durumu
   */
  loading?: boolean;

  /**
   * Hata mesajı
   */
  error?: string | null;

  /**
   * Boş durum
   */
  empty?: boolean;

  /**
   * Boş durum metni
   */
  emptyText?: string;

  /**
   * Yükleme metni
   */
  loadingText?: string;

  /**
   * Hata metni
   */
  errorText?: string;
}
