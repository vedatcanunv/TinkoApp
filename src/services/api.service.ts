import axios from 'axios';

// TMDB API için temel URL ve API anahtarı
// Not: Gerçek bir uygulamada API anahtarı .env dosyasında saklanmalıdır
const API_KEY = 'YOUR_TMDB_API_KEY'; // TMDB'den alınan API anahtarı buraya eklenmelidir
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'tr-TR';

// API istekleri için axios instance'ı
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: LANGUAGE,
  },
});

// Film ve dizi API servisleri
export const movieService = {
  // Popüler filmleri getir
  getPopularMovies: (page = 1) => {
    return api.get('/movie/popular', {
      params: {page},
    });
  },

  // Film detaylarını getir
  getMovieDetails: (movieId: number) => {
    return api.get(`/movie/${movieId}`);
  },

  // Film arama
  searchMovies: (query: string, page = 1) => {
    return api.get('/search/movie', {
      params: {query, page},
    });
  },
};

export const tvService = {
  // Popüler dizileri getir
  getPopularTVShows: (page = 1) => {
    return api.get('/tv/popular', {
      params: {page},
    });
  },

  // Dizi detaylarını getir
  getTVShowDetails: (tvId: number) => {
    return api.get(`/tv/${tvId}`);
  },

  // Dizi arama
  searchTVShows: (query: string, page = 1) => {
    return api.get('/search/tv', {
      params: {query, page},
    });
  },
};

/**
 * API Servisi
 * Gerçek API istekleri için kullanılacak servis
 */

// API URL'leri
const API_BASE_URL = 'https://api.example.com';

// API Servisi
export const apiService = {
  // Kullanıcı girişi
  login: async (email: string, password: string) => {
    try {
      // Gerçek uygulamada burada API isteği yapılır
      // Şimdilik mock veri dönüyoruz
      return {
        success: true,
        data: {
          token: 'dummy-token',
          user: {
            id: 1,
            name: 'Test Kullanıcı',
            email: email,
          },
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Kullanıcı kaydı
  register: async (name: string, email: string, password: string) => {
    try {
      // Gerçek uygulamada burada API isteği yapılır
      // Şimdilik mock veri dönüyoruz
      return {
        success: true,
        data: {
          token: 'dummy-token',
          user: {
            id: 1,
            name: name,
            email: email,
          },
        },
      };
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Kullanıcı bilgilerini getir
  getUserProfile: async () => {
    try {
      // Gerçek uygulamada burada API isteği yapılır
      // Şimdilik mock veri dönüyoruz
      return {
        success: true,
        data: {
          user: {
            id: 1,
            name: 'Test Kullanıcı',
            email: 'test@example.com',
            avatar: null,
          },
        },
      };
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },
};
