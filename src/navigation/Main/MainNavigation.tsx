import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View } from "react-native";
import {
  HomeIcon,
  ProfileIcon,
  TabBar,
} from "../../components/organism/TabBar";
import { HomeNavigation } from "../Home/HomeNavigation";
import { ProfileNavigation } from "../Profile/ProfileNavigation";
import { styles } from "./MainNavigation.style";
import { MainTabParamList } from "./MainNavigation.type";

const Tab = createBottomTabNavigator<MainTabParamList>();

// Main Tab Navigator
export const MainNavigation: React.FC = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeNavigation}
          options={{
            tabBarLabel: "Ana Sayfa",
            tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          }}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileNavigation}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};
