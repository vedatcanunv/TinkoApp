import React from "react";
import { SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../components/screen/HomeScreen/HomeScreen.component";
import { HomeTabParamList } from "./HomeNavigation.type";
import { styles } from "./HomeNavigation.style";

const Stack = createStackNavigator<HomeTabParamList>();

// Screen wrapper'lar
const HomeScreenWrapper = ({ navigation }: any) => {
  const handleMoviePress = (movieId: number) => {
    // Film detay sayfasına yönlendir
    console.log(`Film ID: ${movieId}`);
    // Gelecekte: navigation.navigate("MovieDetail", { movieId });
  };

  const handleAddPress = () => {
    // Film arama sayfasına yönlendir
    console.log("Film ekle butonuna tıklandı");
    // Gelecekte: navigation.navigate("SearchMovie");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen onMoviePress={handleMoviePress} onAddPress={handleAddPress} />
    </SafeAreaView>
  );
};

// Home Stack Navigator
export const HomeNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreenWrapper} />
      {/* Gelecekte eklenecek diğer ekranlar */}
      {/* <Stack.Screen name="MovieDetail" component={MovieDetailScreenWrapper} /> */}
      {/* <Stack.Screen name="SearchMovie" component={SearchMovieScreenWrapper} /> */}
    </Stack.Navigator>
  );
};
