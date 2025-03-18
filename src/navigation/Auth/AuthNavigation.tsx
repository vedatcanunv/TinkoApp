import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../components/screen/LoginScreen/LoginScreen.component";
import { SignUpScreen } from "../../components/screen/SignUpScreen/SignUpScreen.component";
import { AuthStackParamList, AuthNavigationProps } from "./AuthNavigation.type";
import { useAuth } from "../../hooks/useAuth";

const Stack = createStackNavigator<AuthStackParamList>();

// Screen wrapper'lar
const LoginScreenWrapper = ({ navigation }: any) => {
  const auth = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      // Gerçek uygulamada API isteği yapılır
      // Şimdilik mock veri kullanıyoruz
      await auth.signIn("dummy-token");
    } catch (error) {
      console.error("Giriş yapılırken hata oluştu:", error);
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <LoginScreen onLogin={handleLogin} onSignUpPress={handleSignUpPress} />
  );
};

const SignUpScreenWrapper = ({ navigation }: any) => {
  const auth = useAuth();

  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      // Gerçek uygulamada API isteği yapılır
      // Şimdilik mock veri kullanıyoruz
      await auth.signIn("dummy-token");
    } catch (error) {
      console.error("Kayıt olunurken hata oluştu:", error);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <SignUpScreen onSignUp={handleSignUp} onLoginPress={handleLoginPress} />
  );
};

// Auth Stack Navigator
export const AuthNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreenWrapper} />
      <Stack.Screen name="SignUp" component={SignUpScreenWrapper} />
    </Stack.Navigator>
  );
};
