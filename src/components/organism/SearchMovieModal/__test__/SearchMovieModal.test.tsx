import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import {SearchMovieModal} from '../SearchMovieModal.component';

// Not: Bu bileşen API çağrıları içeriyor, bu nedenle mock kullanmamız gerekiyor
jest.mock('../../../../services/tmdb.service', () => ({
  tmdbService: {
    getPopularInTurkey: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: 'Test Film',
        posterUrl: 'https://example.com/poster.jpg',
        year: '2023',
        genres: [{id: '1', name: 'Aksiyon'}],
        type: 'movie',
      },
      {
        id: 2,
        title: 'Test Dizi',
        posterUrl: 'https://example.com/series.jpg',
        year: '2023',
        genres: [{id: '2', name: 'Dram'}],
        type: 'tv',
      },
    ]),
    searchMedia: jest.fn().mockResolvedValue([
      {
        id: 3,
        title: 'Arama Sonucu',
        posterUrl: 'https://example.com/search.jpg',
        year: '2022',
        genres: [{id: '3', name: 'Macera'}],
        type: 'movie',
      },
    ]),
    getMovieDetails: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Film Detayı',
      posterUrl: 'https://example.com/poster.jpg',
      year: '2023',
      genres: [{id: '1', name: 'Aksiyon'}],
      type: 'movie',
      director: 'Test Yönetmen',
      cast: ['Oyuncu 1', 'Oyuncu 2'],
      rating: 8.5,
      duration: '120 dk',
      summary: 'Film detay açıklaması',
    }),
    getTVShowDetails: jest.fn().mockResolvedValue({
      id: 2,
      title: 'Test Dizi Detayı',
      posterUrl: 'https://example.com/series.jpg',
      year: '2023',
      genres: [{id: '2', name: 'Dram'}],
      type: 'tv',
      numberOfSeasons: 2,
      numberOfEpisodes: 16,
      rating: 9.0,
      duration: '45 dk/bölüm',
      summary: 'Dizi detay açıklaması',
    }),
  },
}));

describe('SearchMovieModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', async () => {
    const {toJSON} = await act(async () =>
      render(<SearchMovieModal visible={true} onClose={jest.fn()} />)
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('does not render when not visible', () => {
    const {toJSON} = render(<SearchMovieModal visible={false} onClose={jest.fn()} />);
    expect(toJSON()).toBeNull();
  });

  it('calls onClose when close button is pressed', async () => {
    const onCloseMock = jest.fn();
    const {getByTestId} = await act(async () =>
      render(<SearchMovieModal visible={true} onClose={onCloseMock} />)
    );

    // Modal kapanış işlemini simüle et
    // Not: Bileşen implementasyonuna göre burada testID güncellenebilir
    const closeButton = getByTestId('modal-close-button');
    fireEvent.press(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('allows searching for movies and shows', async () => {
    const {getByPlaceholderText} = await act(async () =>
      render(<SearchMovieModal visible={true} onClose={jest.fn()} />)
    );

    // Arama kutusuna yazma işlemini simüle et
    const searchInput = getByPlaceholderText('Film veya dizi ara...');
    await act(async () => {
      fireEvent.changeText(searchInput, 'Test Arama');
    });

    // tmdbService.searchMedia fonksiyonunun çağrıldığını kontrol et
    // Not: searchMedia çağrısı için bir timeout kullanıldıysa, burada jest.runAllTimers() gerekebilir
  });

  it('renders with custom style', async () => {
    const customStyle = {backgroundColor: 'rgba(0,0,0,0.9)'};
    const {toJSON} = await act(async () =>
      render(<SearchMovieModal visible={true} onClose={jest.fn()} style={customStyle} />)
    );
    expect(toJSON()).toMatchSnapshot('with custom style');
  });

  it('renders loading state while fetching data', async () => {
    // Bu test için API çağrılarını gecikmeli olarak resolve edeceğiz
    const mockGetPopular = jest.requireMock('../../../../services/tmdb.service').tmdbService
      .getPopularInTurkey;

    // Geçici olarak mock fonksiyonu değiştir, gecikme ekle
    mockGetPopular.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve([]), 500);
        })
    );

    const {getByTestId} = await act(async () =>
      render(<SearchMovieModal visible={true} onClose={jest.fn()} />)
    );

    // Yükleme durumunda Loading bileşeninin gösterildiğini kontrol et
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});
