import React from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { styles } from "./TabBar.style";
import { TabBarProps, TabIconProps } from "./TabBar.type";
import * as IconModule from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../helpers/colors";

// Typescript sorunu için Cast işlemi
const Ionicons = IconModule.default as any;

// Vector Icons kullanan Home ve Profile ikonları
const HomeIcon = ({ focused, color }: TabIconProps) => (
  <View
    style={[styles.iconContainer, focused ? styles.activeIconContainer : null]}
  >
    <Ionicons
      name={focused ? "home" : "home-outline"}
      size={28}
      color={
        color || (focused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint)
      }
    />
  </View>
);

const ProfileIcon = ({ focused, color }: TabIconProps) => (
  <View
    style={[styles.iconContainer, focused ? styles.activeIconContainer : null]}
  >
    <Ionicons
      name={focused ? "person" : "person-outline"}
      size={28}
      color={
        color || (focused ? COLORS.tabBarActiveTint : COLORS.tabBarInactiveTint)
      }
    />
  </View>
);

// Tab Bar Component
export const TabBar: React.FC<TabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBarContainer}>
      {/* Tab bar içeriği */}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
              ? options.title
              : route.name;

        const isFocused = state.index === index;

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

        // 2 element gösterilecek, HomeTab ve ProfileTab
        if (index === 0 || index === 1) {
          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused
                    ? COLORS.tabBarActiveTint
                    : COLORS.tabBarInactiveTint,
                  size: 24,
                })}
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.activeTabLabel : null,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }
        return null;
      })}

      {/* Orta + butonu */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log("Film veya dizi ekle butonuna tıklandı")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

// Tab bar için hazır ikonlar
export { HomeIcon, ProfileIcon };
