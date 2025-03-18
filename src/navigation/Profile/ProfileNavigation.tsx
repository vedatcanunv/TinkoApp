import React from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../../components/screen/ProfileScreen/ProfileScreen.component";
import { ProfileTabParamList } from "./ProfileNavigation.type";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./ProfileNavigation.style";

const Stack = createStackNavigator<ProfileTabParamList>();

// Screen wrapper'lar
const ProfileScreenWrapper = ({ navigation }: any) => {
  const auth = useAuth();

  const handleLogout = async () => {
    try {
      // Kullanıcı oturumunu kapat
      await auth.signOut();
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  const handleWatchedMoviesPress = () => {
    // İzlenen filmler sayfasına yönlendir
    console.log("İzlenen filmler butonuna tıklandı");
    // Gelecekte: navigation.navigate("WatchedMovies");
  };

  const handleWatchedTVShowsPress = () => {
    // İzlenen diziler sayfasına yönlendir
    console.log("İzlenen diziler butonuna tıklandı");
    // Gelecekte: navigation.navigate("WatchedTVShows");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileScreen
        onLogout={handleLogout}
        onWatchedMoviesPress={handleWatchedMoviesPress}
        onWatchedTVShowsPress={handleWatchedTVShowsPress}
      />
    </SafeAreaView>
  );
};

// Profile Stack Navigator
export const ProfileNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
      {/* Gelecekte eklenecek diğer ekranlar */}
      {/* <Stack.Screen name="WatchedMovies" component={WatchedMoviesScreenWrapper} /> */}
      {/* <Stack.Screen name="WatchedTVShows" component={WatchedTVShowsScreenWrapper} /> */}
      {/* <Stack.Screen name="Settings" component={SettingsScreenWrapper} /> */}
    </Stack.Navigator>
  );
};
