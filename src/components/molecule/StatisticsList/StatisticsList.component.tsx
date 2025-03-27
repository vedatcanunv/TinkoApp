import React from "react";
import { View } from "react-native";
import { StatisticCard } from "../../atom/StatisticCard";
import { styles } from "./StatisticsList.style";
import { StatisticsListProps } from "./StatisticsList.type";

export const StatisticsList: React.FC<StatisticsListProps> = ({
  stats,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <StatisticCard
        title="İzlediğim Filmler"
        value={stats.totalWatchedMovies}
        style={styles.card}
      />
      <StatisticCard
        title="İzlediğim Diziler"
        value={stats.totalWatchedSeries}
        style={styles.card}
      />
      <StatisticCard
        title="İzleme Listemdeki Filmler"
        value={stats.totalWatchlistMovies}
        style={styles.card}
      />
      <StatisticCard
        title="İzleme Listemdeki Diziler"
        value={stats.totalWatchlistSeries}
        style={styles.card}
      />
    </View>
  );
};
