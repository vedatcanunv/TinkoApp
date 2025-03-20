import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
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
