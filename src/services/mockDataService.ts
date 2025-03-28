/**
 * Mock veri servisi
 * Gerçek API istekleri yerine kullanılacak mock veriler
 */

// Kullanıcının izlediği filmler için mock veri
const watchedMovies = {
  data: {
    results: [
      {
        id: 1,
        title: 'Inception',
        poster_path: '/inception.jpg',
        release_date: '2010-07-16',
        vote_average: 8.8,
        genres: [
          {id: 28, name: 'Aksiyon'},
          {id: 878, name: 'Bilim Kurgu'},
          {id: 53, name: 'Gerilim'},
        ],
        liked: true,
      },
      {
        id: 2,
        title: 'The Shawshank Redemption',
        poster_path: '/shawshank.jpg',
        release_date: '1994-09-23',
        vote_average: 9.3,
        genres: [
          {id: 18, name: 'Drama'},
          {id: 80, name: 'Suç'},
        ],
        liked: true,
      },
      {
        id: 3,
        title: 'The Dark Knight',
        poster_path: '/darkknight.jpg',
        release_date: '2008-07-18',
        vote_average: 9.0,
        genres: [
          {id: 28, name: 'Aksiyon'},
          {id: 80, name: 'Suç'},
          {id: 18, name: 'Drama'},
        ],
        liked: true,
      },
      {
        id: 4,
        title: 'Pulp Fiction',
        poster_path: '/pulpfiction.jpg',
        release_date: '1994-10-14',
        vote_average: 8.9,
        genres: [
          {id: 80, name: 'Suç'},
          {id: 18, name: 'Drama'},
        ],
        liked: false,
      },
      {
        id: 5,
        title: 'The Matrix',
        poster_path: '/matrix.jpg',
        release_date: '1999-03-31',
        vote_average: 8.7,
        genres: [
          {id: 28, name: 'Aksiyon'},
          {id: 878, name: 'Bilim Kurgu'},
        ],
        liked: true,
      },
    ],
  },
};

// Kullanıcı istatistikleri için mock veri
const userStats = {
  data: {
    totalWatchedMovies: 42,
    totalWatchedTVShows: 15,
    favoriteGenres: [
      {id: 28, name: 'Aksiyon', percentage: 35},
      {id: 878, name: 'Bilim Kurgu', percentage: 25},
      {id: 18, name: 'Drama', percentage: 20},
      {id: 53, name: 'Gerilim', percentage: 15},
      {id: 80, name: 'Suç', percentage: 5},
    ],
    favoriteActors: [
      {id: 1, name: 'Leonardo DiCaprio', count: 5},
      {id: 2, name: 'Tom Hardy', count: 4},
      {id: 3, name: 'Christian Bale', count: 3},
      {id: 4, name: 'Robert Downey Jr.', count: 3},
    ],
    favoriteDirectors: [
      {id: 1, name: 'Christopher Nolan', count: 5},
      {id: 2, name: 'Martin Scorsese', count: 3},
      {id: 3, name: 'Quentin Tarantino', count: 3},
      {id: 4, name: 'David Fincher', count: 2},
    ],
  },
};

// Mock veri servisi fonksiyonları
export const mockDataService = {
  // İzlenen filmleri getir
  getWatchedMovies: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(watchedMovies);
      }, 1000);
    });
  },

  // Kullanıcı istatistiklerini getir
  getUserStats: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(userStats);
      }, 1500);
    });
  },
};
