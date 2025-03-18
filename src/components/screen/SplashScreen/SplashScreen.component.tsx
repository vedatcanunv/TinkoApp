import React, { useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { styles } from "./SplashScreen.style";
import { SplashScreenProps } from "./SplashScreen.type";
import { Text } from "../../../components/atom";
import { COLORS } from "../../../helpers/colors";

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
          <Text size="display" weight="bold" color="primary">
            T
          </Text>
        </View>
        <Text
          size="display"
          weight="bold"
          color="primary"
          style={styles.appName}
        >
          Tinko
        </Text>
        <Text size="xl" weight="semibold" color="light" style={styles.tagline}>
          Film ve Dizi Takip Uygulaması
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={styles.loader}
      />
    </View>
  );
};
