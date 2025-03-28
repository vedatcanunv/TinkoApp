/**
 * Ana uygulama giriş noktası
 * Tüm bileşenler, servisler ve yardımcı fonksiyonlar buradan dışa aktarılır
 */

// Components
export * from './components/atom/Button';
export * from './components/atom/Text';
export * from './components/atom/Input';
export * from './components/atom/Icon';

// Screen bileşenleri
export {LoginScreen} from './components/screen/LoginScreen/LoginScreen.component';
export {SignUpScreen} from './components/screen/SignUpScreen/SignUpScreen.component';
export {HomeScreen} from './components/screen/HomeScreen/HomeScreen.component';
export {ProfileScreen} from './components/screen/ProfileScreen/ProfileScreen.component';
export {SplashScreen} from './components/screen/SplashScreen/SplashScreen.component';

// Tip tanımlamaları
export type {LoginScreenProps} from './components/screen/LoginScreen/LoginScreen.type';
export type {SignUpScreenProps} from './components/screen/SignUpScreen/SignUpScreen.type';
export type {HomeScreenProps as HomeComponentProps} from './components/screen/HomeScreen/HomeScreen.type';
export type {ProfileScreenProps as ProfileComponentProps} from './components/screen/ProfileScreen/ProfileScreen.type';
export type {SplashScreenProps} from './components/screen/SplashScreen/SplashScreen.type';

// Hooks
export * from './hooks/useAuth';

// Services
// export * from './services';

// Utils
// export * from './utils';

// Helpers
// export * from './helpers';

// Navigasyon - tip çakışmaları olabileceğinden burada export etmiyoruz
// Navigasyon bileşenlerini doğrudan "./src/navigation" üzerinden import edin
