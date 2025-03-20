import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  PanResponder,
  PanResponderInstance,
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
  const translateY = useRef(new Animated.Value(height)).current;
  const backdropOpacityAnim = useRef(new Animated.Value(0)).current;
  // Modal'ın yüksekliğini takip etmek için state
  const [currentHeight, setCurrentHeight] = useState(modalHeight);
  const initialTouchY = useRef(0);

  // Panresponder oluşturma
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        // İlk dokunma pozisyonunu kaydet
        initialTouchY.current = gestureState.y0;
      },
      onPanResponderMove: (_, gestureState) => {
        // Sürükleme mesafesini hesapla
        const dragDistance = Math.max(
          0,
          gestureState.moveY - initialTouchY.current
        );

        // Modal'ı hareket ettir
        translateY.setValue(dragDistance);

        // Yüksekliği güncelle (aşağı sürüklendiğinde küçült)
        if (dragDistance > 0) {
          const newHeight = Math.max(
            20,
            modalHeight - (dragDistance / height) * 100
          );
          setCurrentHeight(newHeight);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Eğer belirli bir mesafeden fazla aşağı sürüklenirse modal'ı kapat
        const CLOSE_THRESHOLD = 150;

        if (gestureState.dy > CLOSE_THRESHOLD) {
          onClose();
        } else {
          // Modal'ı eski konumuna geri getir
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
          }).start();

          // Yüksekliği sıfırla
          setCurrentHeight(modalHeight);
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      // Modal'ı sıfırla
      translateY.setValue(height);
      setCurrentHeight(modalHeight);

      // Modal açılırken animasyon
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
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
  }, [visible, backdropOpacity, modalHeight]);

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
              height: `${currentHeight}%`,
            },
            contentContainerStyle,
          ]}
        >
          {/* Sürüklenebilir tutamak */}
          <View
            {...panResponder.panHandlers}
            style={styles.dragHandleContainer}
          >
            <View style={styles.dragHandle} />
          </View>

          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
};
