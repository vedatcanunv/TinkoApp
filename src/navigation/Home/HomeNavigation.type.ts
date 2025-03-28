import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

// Home Tab için tip tanımlamaları
export type HomeTabParamList = {
  Home: undefined;
  // Gelecekte eklenecek diğer Home alt ekranlar
  // MovieDetail: { movieId: number };
  // SearchMovie: undefined;
};

// Screen props için tip tanımlamaları
export type HomeScreenProps = BottomTabScreenProps<HomeTabParamList, 'Home'>;
