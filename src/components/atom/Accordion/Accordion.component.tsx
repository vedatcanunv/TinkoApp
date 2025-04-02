import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles} from './Accordion.style';
import {AccordionProps, AccordionState} from './Accordion.type';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isExpanded: controlledIsExpanded,
  onToggle,
  titleStyle,
  contentStyle,
  containerStyle,
  headerStyle,
  iconColor = '#666',
  iconSize = 24,
  animationDuration = 300,
  disabled = false,
}) => {
  const [state, setState] = useState<AccordionState>({
    isExpanded: controlledIsExpanded || false,
    contentHeight: 0,
  });

  const contentHeight = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (controlledIsExpanded !== undefined) {
      setState(prev => ({...prev, isExpanded: controlledIsExpanded}));
      animateContent(controlledIsExpanded);
    }
  }, [controlledIsExpanded]);

  const animateContent = (expand: boolean) => {
    const toValue = expand ? 1 : 0;
    const duration = animationDuration;

    Animated.parallel([
      Animated.timing(contentHeight, {
        toValue,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnimation, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleToggle = () => {
    if (disabled) return;

    const newIsExpanded = !state.isExpanded;
    setState(prev => ({...prev, isExpanded: newIsExpanded}));
    animateContent(newIsExpanded);
    onToggle?.();
  };

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.header, headerStyle, disabled && styles.disabled]}
        onPress={handleToggle}
        disabled={disabled}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Animated.View style={{transform: [{rotate}]}}>
          <Ionicons name="chevron-down" size={iconSize} color={iconColor} style={styles.icon} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.content,
          contentStyle,
          {
            maxHeight: contentHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000], // Yeterince büyük bir değer
            }),
          },
        ]}
      >
        <View style={styles.contentInner}>{children}</View>
      </Animated.View>
    </View>
  );
};
