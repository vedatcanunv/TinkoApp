import {StyleProp, ViewStyle} from 'react-native';

export interface UserStats {
  totalWatchedMovies: number;
  totalWatchedSeries: number;
  totalWatchlistMovies: number;
  totalWatchlistSeries: number;
}

export interface StatisticsListProps {
  stats: UserStats;
  style?: StyleProp<ViewStyle>;
}
