export interface ErrorProps {
  /**
   * Hata mesajı
   * @default "Bir hata oluştu. Lütfen tekrar deneyin."
   */
  message?: string;

  /**
   * Yeniden deneme butonuna basıldığında çağrılacak fonksiyon
   */
  onRetry?: () => void;
}
