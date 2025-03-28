import React, {useRef} from 'react';
import {View, Pressable, InteractionManager, Text, Platform} from 'react-native';
import {SearchMovieModal} from '../../organism/SearchMovieModal';
import {styles} from './TabBar.style';
import {TabBarProps, TabIconProps} from './TabBar.type';
import * as IconModule from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../helpers/colors';

// Typescript için Cast işlemi
const Ionicons = IconModule.default as any;

// Vector Icons kullanan Home ve Profile ikonları
export const HomeIcon = ({focused, color}: TabIconProps) => (
  <View style={[styles.iconContainer]}>
    <Ionicons
      name={focused ? 'home' : 'home-outline'}
      size={Platform.OS === 'android' ? 26 : 25}
      color={color || (focused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint)}
    />
  </View>
);

export const ProfileIcon = ({focused, color}: TabIconProps) => (
  <View style={[styles.iconContainer]}>
    <Ionicons
      name={focused ? 'person' : 'person-outline'}
      size={Platform.OS === 'android' ? 26 : 25}
      color={color || (focused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint)}
    />
  </View>
);

export const TabBar: React.FC<TabBarProps> = ({state, descriptors, navigation}) => {
  const [searchModalVisible, setSearchModalVisible] = React.useState(false);
  // Birden fazla basışı engellemek için ref kullanıyoruz
  const isProcessingRef = useRef(false);

  // + Butonuna basıldığında modal açma
  const handleAddButtonPress = () => {
    // Eğer zaten bir işlem yapılıyorsa çıkış yapıyoruz
    if (isProcessingRef.current) {
      console.log('TabBar: İşlem zaten devam ediyor, tekrar buton basışı görmezden gelindi');
      return;
    }

    console.log('TabBar: + butonuna basıldı');
    isProcessingRef.current = true;

    // Doğrudan setState kullanmak daha güvenli olabilir, InteractionManager'ı kaldıralım
    setSearchModalVisible(true);
    console.log('TabBar: Modal açıldı');

    // Kısa bir gecikme sonra isProcessingRef'i sıfırlıyoruz
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 500);
  };

  // Modal kapanınca
  const handleCloseSearchModal = () => {
    // Eğer zaten bir işlem yapılıyorsa çıkış yapıyoruz
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // Doğrudan setState kullanmak daha güvenli olabilir
    setSearchModalVisible(false);
    console.log('TabBar: Modal kapatıldı');

    // Kısa bir gecikme sonra isProcessingRef'i sıfırlıyoruz
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 500);
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* Tab bar içeriği */}
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const icon = options.tabBarIcon;

        // Tab'e tıklandığında
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Tab'e uzun basıldığında
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // 2 element gösterilecek, HomeTab ve ProfileTab
        if (index === 0 || index === 1) {
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({pressed}) => [
                styles.tabItem,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              android_ripple={
                Platform.OS === 'android'
                  ? {
                      color: COLORS.primary + '20', // %20 opaklık ile
                      borderless: false,
                      radius: 24,
                    }
                  : undefined
              }
            >
              {/* İkon */}
              {icon &&
                icon({
                  focused: isFocused,
                  color: isFocused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint,
                  size: Platform.OS === 'android' ? 28 : 30,
                })}

              {/* Etiket */}
              <Text style={[styles.tabLabel, isFocused ? styles.activeTabLabel : null]}>
                {String(label)}
              </Text>
            </Pressable>
          );
        }
        return null;
      })}

      {/* Orta + butonu */}
      <Pressable
        style={({pressed}) => [
          styles.addButton,
          {
            transform: [{scale: pressed ? 0.95 : 1}],
          },
        ]}
        onPress={handleAddButtonPress}
        android_ripple={
          Platform.OS === 'android'
            ? {
                color: COLORS.white,
                borderless: true,
                radius: 28,
              }
            : undefined
        }
      >
        <Ionicons name="add" size={Platform.OS === 'android' ? 34 : 37} color={COLORS.white} />
      </Pressable>

      {/* Film Arama Modalı */}
      <SearchMovieModal visible={searchModalVisible} onClose={handleCloseSearchModal} />
    </View>
  );
};
