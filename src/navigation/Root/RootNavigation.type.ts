import { NavigatorScreenParams } from "@react-navigation/native";
import { MainTabParamList } from "../Main/MainNavigation.type";

// Root Stack için tip tanımlamaları
export type RootStackParamList = {
  Splash: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
};
