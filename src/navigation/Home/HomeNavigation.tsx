import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {HomeScreen} from '../../components/screen/HomeScreen/HomeScreen.component';
import {styles} from './HomeNavigation.style';
import {HomeTabParamList} from './HomeNavigation.type';

const Stack = createStackNavigator<HomeTabParamList>();

// Screen wrapper'lar
const HomeScreenWrapper = ({navigation}: any) => {
  const handleMoviePress = (movieId: number) => {
    // Film detay sayfasına yönlendir
    console.log(`Film ID: ${movieId}`);
    // Gelecekte: navigation.navigate("MovieDetail", { movieId });
  };

  const handleAddPress = () => {
    // Film ekle butonuna tıklandığında
    console.log('Film ekle butonuna tıklandı');
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
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreenWrapper} />
      {/* Gelecekte eklenecek diğer ekranlar */}
      {/* <Stack.Screen name="MovieDetail" component={MovieDetailScreenWrapper} /> */}
    </Stack.Navigator>
  );
};
