import {MediaContent} from '../components/molecule/MediaCard/MediaCard.type';

interface GenreStat {
  id: number;
  name: string;
  percentage: number;
}

interface PersonStat {
  id: string;
  name: string;
  contentCount: number;
}

/**
 * İzlenen film türlerinin istatistiklerini hesaplar
 * @param movies İzlenen filmler listesi
 * @returns Tür istatistikleri
 */
export const calculateMovieGenreStats = (movies: MediaContent[]): GenreStat[] => {
  const genreCounts: {[key: string]: number} = {};
  let totalMovies = 0;

  movies.forEach(movie => {
    movie.genres.forEach(genre => {
      genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
      totalMovies++;
    });
  });

  return Object.entries(genreCounts)
    .map(([name, count], index) => ({
      id: index,
      name,
      percentage: Math.round((count / totalMovies) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);
};

/**
 * İzlenen dizi türlerinin istatistiklerini hesaplar
 * @param series İzlenen diziler listesi
 * @returns Tür istatistikleri
 */
export const calculateSeriesGenreStats = (series: MediaContent[]): GenreStat[] => {
  const genreCounts: {[key: string]: number} = {};
  let totalSeries = 0;

  series.forEach(series => {
    series.genres.forEach(genre => {
      genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
      totalSeries++;
    });
  });

  return Object.entries(genreCounts)
    .map(([name, count], index) => ({
      id: index,
      name,
      percentage: Math.round((count / totalSeries) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);
};

/**
 * En çok izlenen yönetmenlerin istatistiklerini hesaplar
 * @param mediaList İzlenen medya listesi (film ve diziler)
 * @param limit Maksimum yönetmen sayısı (varsayılan: 5)
 * @returns Yönetmen istatistikleri
 */
export const calculateDirectorStats = (
  mediaList: MediaContent[],
  limit: number = 5
): PersonStat[] => {
  const directorCounts: {[key: string]: number} = {};

  mediaList.forEach(media => {
    if (media.director) {
      // Virgülle ayrılmış yönetmen isimlerini ayır
      const directors = media.director.split(', ');
      directors.forEach(director => {
        if (director && director.trim()) {
          directorCounts[director.trim()] = (directorCounts[director.trim()] || 0) + 1;
        }
      });
    }
  });

  return Object.entries(directorCounts)
    .map(([name, count], index) => ({
      id: index.toString(),
      name,
      contentCount: count,
    }))
    .sort((a, b) => b.contentCount - a.contentCount)
    .slice(0, limit);
};

/**
 * En çok izlenen oyuncuların istatistiklerini hesaplar
 * @param mediaList İzlenen medya listesi (film ve diziler)
 * @param limit Maksimum oyuncu sayısı (varsayılan: 5)
 * @returns Oyuncu istatistikleri
 */
export const calculateActorStats = (mediaList: MediaContent[], limit: number = 5): PersonStat[] => {
  const actorCounts: {[key: string]: number} = {};

  mediaList.forEach(media => {
    if (media.cast && media.cast.length > 0) {
      media.cast.forEach(actor => {
        if (actor && actor.trim()) {
          actorCounts[actor.trim()] = (actorCounts[actor.trim()] || 0) + 1;
        }
      });
    }
  });

  return Object.entries(actorCounts)
    .map(([name, count], index) => ({
      id: index.toString(),
      name,
      contentCount: count,
    }))
    .sort((a, b) => b.contentCount - a.contentCount)
    .slice(0, limit);
};
