import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { styles } from "./Error.style";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const Error: React.FC<ErrorProps> = ({
  message = "Bir hata oluştu. Lütfen tekrar deneyin.",
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/animations/error.json")}
        style={styles.animation}
        autoPlay
        loop={false}
        speed={1}
      />
      {message && <Text style={styles.message}>{message}</Text>}
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Tekrar Dene</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
