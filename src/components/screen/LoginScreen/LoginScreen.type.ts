export interface LoginScreenProps {
  /**
   * Giriş yapıldığında çalışacak fonksiyon
   */
  onLogin: (email: string, password: string) => void;

  /**
   * Kayıt ol butonuna tıklandığında çalışacak fonksiyon
   */
  onSignUpPress: () => void;
}
