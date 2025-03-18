import React, { useRef } from "react";
import { View, Pressable, InteractionManager, Text } from "react-native";
import { SearchMovieModal } from "../../organism/SearchMovieModal";
import { styles } from "./TabBar.style";
import { TabBarProps, TabIconProps } from "./TabBar.type";
import * as IconModule from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../helpers/colors";

// Typescript için Cast işlemi
const Ionicons = IconModule.default as any;

// Vector Icons kullanan Home ve Profile ikonları
export const HomeIcon = ({ focused, color }: TabIconProps) => (
  <View style={[styles.iconContainer]}>
    <Ionicons
      name={focused ? "home" : "home-outline"}
      size={25}
      color={
        color || (focused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint)
      }
    />
  </View>
);

export const ProfileIcon = ({ focused, color }: TabIconProps) => (
  <View style={[styles.iconContainer]}>
    <Ionicons
      name={focused ? "person" : "person-outline"}
      size={25}
      color={
        color || (focused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint)
      }
    />
  </View>
);

export const TabBar: React.FC<TabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const [searchModalVisible, setSearchModalVisible] = React.useState(false);
  // Birden fazla basışı engellemek için ref kullanıyoruz
  const isProcessingRef = useRef(false);

  // + Butonuna basıldığında modal açma
  const handleAddButtonPress = () => {
    // Eğer zaten bir işlem yapılıyorsa çıkış yapıyoruz
    if (isProcessingRef.current) {
      console.log(
        "TabBar: İşlem zaten devam ediyor, tekrar buton basışı görmezden gelindi"
      );
      return;
    }

    console.log("TabBar: + butonuna basıldı");
    isProcessingRef.current = true;

    // UI thread'i blokelemeden modal'ı açıyoruz
    InteractionManager.runAfterInteractions(() => {
      setSearchModalVisible(true);
      console.log("TabBar: Modal açıldı");
      // İşlem tamamlandı
      isProcessingRef.current = false;
    });
  };

  // Modal kapanınca
  const handleCloseSearchModal = () => {
    // Eğer zaten bir işlem yapılıyorsa çıkış yapıyoruz
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // UI thread'i blokelemeden modal'ı kapatıyoruz
    InteractionManager.runAfterInteractions(() => {
      setSearchModalVisible(false);
      console.log("TabBar: Modal kapatıldı");
      // İşlem tamamlandı
      isProcessingRef.current = false;
    });
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* Tab bar içeriği */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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
            type: "tabPress",
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
            type: "tabLongPress",
            target: route.key,
          });
        };

        // 2 element gösterilecek, HomeTab ve ProfileTab
        if (index === 0 || index === 1) {
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [
                styles.tabItem,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              {/* İkon */}
              {icon &&
                icon({
                  focused: isFocused,
                  color: isFocused
                    ? COLORS.tabBarActiveTint
                    : COLORS.tabBarInactiveTint,
                  size: 30,
                })}

              {/* Etiket */}
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.activeTabLabel : null,
                ]}
              >
                {String(label)}
              </Text>
            </Pressable>
          );
        }
        return null;
      })}

      {/* Orta + butonu */}
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          {
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={handleAddButtonPress}
      >
        <Ionicons name="add" size={37} color={COLORS.white} />
      </Pressable>

      {/* Film Arama Modalı */}
      <SearchMovieModal
        visible={searchModalVisible}
        onClose={handleCloseSearchModal}
      />
    </View>
  );
};
