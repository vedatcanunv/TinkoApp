import { StackScreenProps } from "@react-navigation/stack";

// Auth Stack için tip tanımlamaları
export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Auth navigasyon props için tip tanımlaması
export type AuthNavigationProps = {
  navigateToMain: () => void;
};

// Screen props için tip tanımlamaları
export type AuthScreenProps = StackScreenProps<AuthStackParamList>;
