import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Profile Tab için tip tanımlamaları
export type ProfileTabParamList = {
  Profile: undefined;
  // Gelecekte eklenecek diğer Profile alt ekranlar
  // WatchedMovies: undefined;
  // WatchedTVShows: undefined;
  // Settings: undefined;
};

// Screen props için tip tanımlamaları
export type ProfileScreenProps = BottomTabScreenProps<
  ProfileTabParamList,
  "Profile"
>;
