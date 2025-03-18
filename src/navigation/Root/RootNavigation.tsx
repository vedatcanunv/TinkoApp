import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { styles } from "./RootNavigation.style";

import { SplashScreen } from "../../components/screen/SplashScreen/SplashScreen.component";
import { AuthContext } from "../../hooks/useAuth";
import { RootStackParamList } from "./RootNavigation.type";
import { AuthNavigation } from "../Auth/AuthNavigation";
import { MainNavigation } from "../Main/MainNavigation";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

const Stack = createStackNavigator<RootStackParamList>();

// Splash ekranı içeriği
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

// Root Navigator
export const RootNavigation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  // Auth işlevleri
  const authContext = {
    signIn: async (token: string) => {
      try {
        await AsyncStorage.setItem("userToken", token);
        setUserToken(token);
      } catch (error) {
        console.error("Oturum açılırken hata oluştu:", error);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("userToken");
        setUserToken(null);
      } catch (error) {
        console.error("Oturum kapatılırken hata oluştu:", error);
      }
    },
    isLoading,
    userToken,
  };

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
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <View style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isLoading ? (
                <Stack.Screen name="Splash" component={SplashScreenWrapper} />
              ) : userToken ? (
                <Stack.Screen name="Main" component={MainNavigation} />
              ) : (
                <Stack.Screen name="Auth" component={AuthNavigation} />
              )}
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
};
