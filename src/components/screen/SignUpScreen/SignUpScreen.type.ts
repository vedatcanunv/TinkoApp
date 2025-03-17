export interface SignUpScreenProps {
  /**
   * Kayıt olunduğunda çalışacak fonksiyon
   */
  onSignUp: (name: string, email: string, password: string) => void;

  /**
   * Giriş yap butonuna tıklandığında çalışacak fonksiyon
   */
  onLoginPress: () => void;
}
