import React, { useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { styles } from "./SplashScreen.style";
import { SplashScreenProps } from "./SplashScreen.type";
import { Text } from "../../../components/atom";

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // 2 saniye sonra splash screen'i kapat
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          <Text variant="h1" color="primary">
            T
          </Text>
        </View>
        <Text variant="h1" color="primary" style={styles.appName}>
          Tinko
        </Text>
        <Text variant="subtitle" color="light" style={styles.tagline}>
          Film ve Dizi Takip Uygulaması
        </Text>
      </View>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
};
