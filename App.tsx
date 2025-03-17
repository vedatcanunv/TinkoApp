import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

import {
  SplashScreen,
  LoginScreen,
  SignUpScreen,
  HomeScreen,
  ProfileScreen,
} from "./src";

// Navigasyon tipleri
type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

// Navigasyon stack'leri
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

// Auth Stack Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreenWrapper} />
      <AuthStack.Screen name="SignUp" component={SignUpScreenWrapper} />
    </AuthStack.Navigator>
  );
};

// Main Tab Navigator
const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#F2F2F7",
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreenWrapper}
        options={{
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreenWrapper}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: size / 2,
              }}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

// Ekran wrapper'ları
const SplashScreenWrapper = ({ navigation }: any) => {
  const handleSplashFinish = async () => {
    try {
      // Kullanıcı giriş durumunu kontrol et
      const userToken = await AsyncStorage.getItem("userToken");

      // Giriş durumuna göre yönlendir
      if (userToken) {
        navigation.replace("Main");
      } else {
        navigation.replace("Auth");
      }
    } catch (error) {
      console.error("Giriş durumu kontrol edilirken hata oluştu:", error);
      navigation.replace("Auth");
    }
  };

  return <SplashScreen onFinish={handleSplashFinish} />;
};

const LoginScreenWrapper = ({ navigation }: any) => {
  const handleLogin = async (email: string, password: string) => {
    try {
      // Gerçek uygulamada API isteği yapılır
      // Şimdilik mock veri kullanıyoruz
      await AsyncStorage.setItem("userToken", "dummy-token");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
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
  const handleSignUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      // Gerçek uygulamada API isteği yapılır
      // Şimdilik mock veri kullanıyoruz
      await AsyncStorage.setItem("userToken", "dummy-token");
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
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

const HomeScreenWrapper = ({ navigation }: any) => {
  const handleMoviePress = (movieId: number) => {
    // Film detay sayfasına yönlendir
    console.log(`Film ID: ${movieId}`);
  };

  const handleAddPress = () => {
    // Film arama sayfasına yönlendir
    console.log("Film ekle butonuna tıklandı");
  };

  return (
    <HomeScreen onMoviePress={handleMoviePress} onAddPress={handleAddPress} />
  );
};

const ProfileScreenWrapper = ({ navigation }: any) => {
  const handleLogout = async () => {
    try {
      // Kullanıcı oturumunu kapat
      await AsyncStorage.removeItem("userToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  const handleWatchedMoviesPress = () => {
    // İzlenen filmler sayfasına yönlendir
    console.log("İzlenen filmler butonuna tıklandı");
  };

  const handleWatchedTVShowsPress = () => {
    // İzlenen diziler sayfasına yönlendir
    console.log("İzlenen diziler butonuna tıklandı");
  };

  return (
    <ProfileScreen
      onLogout={handleLogout}
      onWatchedMoviesPress={handleWatchedMoviesPress}
      onWatchedTVShowsPress={handleWatchedTVShowsPress}
    />
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    // Uygulama başladığında kullanıcı giriş durumunu kontrol et
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (error) {
        console.error("Kullanıcı durumu kontrol edilirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <RootStack.Screen name="Splash" component={SplashScreenWrapper} />
        ) : userToken ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
