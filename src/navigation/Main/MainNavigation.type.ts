import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeTabParamList } from "../Home/HomeNavigation.type";
import { ProfileTabParamList } from "../Profile/ProfileNavigation.type";
import { RootStackParamList } from "../Root/RootNavigation.type";

// Main Tab için tip tanımlamaları
export type MainTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

// Screen props için tip tanımlamaları
export type MainScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    StackScreenProps<RootStackParamList>
  >;
