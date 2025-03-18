import React, { useEffect } from "react";
import {
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { styles } from "./Modal.style";
import { ModalProps } from "./Modal.type";

const { height } = Dimensions.get("window");

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  backdropOpacity = 0.5,
  height: modalHeight = 50,
  style,
  contentContainerStyle,
  closeOnBackdropPress = true,
}) => {
  const translateY = new Animated.Value(height);
  const backdropOpacityAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      // Modal açılırken animasyon
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacityAnim, {
          toValue: backdropOpacity,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Modal kapanırken animasyon
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity]);

  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <RNModal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: backdropOpacityAnim,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateY }],
              height: `${modalHeight}%`,
            },
            contentContainerStyle,
          ]}
        >
          <Pressable
            onPress={onClose}
            style={{ paddingVertical: 10, alignItems: "center" }}
          >
            <View style={styles.dragHandle} />
          </Pressable>
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};
