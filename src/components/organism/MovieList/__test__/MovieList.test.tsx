import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MovieList} from '../MovieList.component';
import {Movie} from '../../../molecule/MovieCard';

describe('MovieList Component', () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Test Film 1',
      year: 2021,
      genres: [
        {id: 1, name: 'Aksiyon'},
        {id: 2, name: 'Macera'},
      ],
      posterUrl: 'https://example.com/poster1.jpg',
      rating: 7.5,
    },
    {
      id: 2,
      title: 'Test Film 2',
      year: 2022,
      genres: [
        {id: 3, name: 'Komedi'},
        {id: 4, name: 'Dram'},
      ],
      posterUrl: 'https://example.com/poster2.jpg',
      rating: 8.0,
    },
  ];

  const mockOnMoviePress = jest.fn();
  const mockOnAddButtonPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with movies', () => {
    const {toJSON} = render(
      <MovieList movies={mockMovies} title="Test Liste" onMoviePress={mockOnMoviePress} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the title correctly', () => {
    const {getByText} = render(
      <MovieList movies={mockMovies} title="Test Liste" onMoviePress={mockOnMoviePress} />
    );

    expect(getByText('Test Liste')).toBeTruthy();
  });

  it('renders with different title colors', () => {
    const {getByText, rerender} = render(
      <MovieList
        movies={mockMovies}
        title="Test Liste"
        titleColor="default"
        onMoviePress={mockOnMoviePress}
      />
    );

    const defaultTitle = getByText('Test Liste');
    expect(defaultTitle).toBeTruthy();

    rerender(
      <MovieList
        movies={mockMovies}
        title="Test Liste"
        titleColor="primary"
        onMoviePress={mockOnMoviePress}
      />
    );

    const primaryTitle = getByText('Test Liste');
    expect(primaryTitle).toBeTruthy();

    rerender(
      <MovieList
        movies={mockMovies}
        title="Test Liste"
        titleColor="secondary"
        onMoviePress={mockOnMoviePress}
      />
    );

    const secondaryTitle = getByText('Test Liste');
    expect(secondaryTitle).toBeTruthy();
  });

  it('calls onMoviePress when a movie card is pressed', () => {
    const {getAllByTestId} = render(
      <MovieList movies={mockMovies} onMoviePress={mockOnMoviePress} />
    );

    // Film kartlarını bul
    const movieCards = getAllByTestId('movie-card');
    expect(movieCards.length).toBe(2);

    // İlk film kartına tıkla
    fireEvent.press(movieCards[0]);

    // onMoviePress fonksiyonunun doğru film ile çağrıldığını kontrol et
    expect(mockOnMoviePress).toHaveBeenCalledWith(mockMovies[0]);
  });

  it('renders empty state when no movies are provided', () => {
    const {getByText} = render(
      <MovieList movies={[]} emptyText="Film bulunamadı" onMoviePress={mockOnMoviePress} />
    );

    expect(getByText('Film bulunamadı')).toBeTruthy();
  });

  it('shows add button when showAddButton is true', () => {
    const {getByTestId} = render(
      <MovieList
        movies={mockMovies}
        showAddButton={true}
        onAddButtonPress={mockOnAddButtonPress}
        onMoviePress={mockOnMoviePress}
      />
    );

    const addButton = getByTestId('add-button');
    expect(addButton).toBeTruthy();
  });

  it('does not show add button when showAddButton is false', () => {
    const {queryByTestId} = render(
      <MovieList
        movies={mockMovies}
        showAddButton={false}
        onAddButtonPress={mockOnAddButtonPress}
        onMoviePress={mockOnMoviePress}
      />
    );

    const addButton = queryByTestId('add-button');
    expect(addButton).toBeNull();
  });

  it('calls onAddButtonPress when add button is pressed', () => {
    const {getByTestId} = render(
      <MovieList
        movies={mockMovies}
        showAddButton={true}
        onAddButtonPress={mockOnAddButtonPress}
        onMoviePress={mockOnMoviePress}
      />
    );

    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);

    expect(mockOnAddButtonPress).toHaveBeenCalled();
  });

  it('renders all movie cards based on movies array', () => {
    const {getAllByTestId} = render(
      <MovieList movies={mockMovies} onMoviePress={mockOnMoviePress} />
    );

    // Film kartlarını bul ve sayılarını kontrol et
    const movieCards = getAllByTestId('movie-card');
    expect(movieCards.length).toBe(mockMovies.length);
  });
});
