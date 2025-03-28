import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MediaDetailCard} from '../MediaDetailCard.component';
import {MediaContent} from '../../../molecule/MediaCard/MediaCard.type';

describe('MediaDetailCard Component', () => {
  const mockMedia: MediaContent = {
    id: '1',
    title: 'Test Film',
    posterUrl: 'https://example.com/poster.jpg',
    year: '2023',
    genres: [
      {id: '1', name: 'Aksiyon'},
      {id: '2', name: 'Macera'},
      {id: '3', name: 'Bilim Kurgu'},
    ],
    type: 'movie',
    rating: 8.5,
    duration: '120 dk',
    summary: 'Test film açıklaması uzun ve detaylı.',
    director: 'Test Yönetmen',
    cast: ['Oyuncu 1', 'Oyuncu 2', 'Oyuncu 3'],
  };

  const mockProps = {
    media: mockMedia,
    visible: true,
    onClose: jest.fn(),
    onMarkAsWatched: jest.fn(),
    onAddToWatchlist: jest.fn(),
  };

  it('renders correctly when visible', () => {
    const {toJSON} = render(<MediaDetailCard {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('does not render when not visible', () => {
    const {toJSON} = render(<MediaDetailCard {...mockProps} visible={false} />);
    expect(toJSON()).toMatchSnapshot('not visible');
  });

  it('calls onClose when close button is pressed', () => {
    const {getByTestId} = render(<MediaDetailCard {...mockProps} />);
    fireEvent.press(getByTestId('close-button'));
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMarkAsWatched when watched button is pressed', () => {
    const {getByTestId} = render(<MediaDetailCard {...mockProps} />);
    fireEvent.press(getByTestId('watched-button'));
    expect(mockProps.onMarkAsWatched).toHaveBeenCalledTimes(1);
  });

  it('calls onAddToWatchlist when watchlist button is pressed', () => {
    const {getByTestId} = render(<MediaDetailCard {...mockProps} />);
    fireEvent.press(getByTestId('watchlist-button'));
    expect(mockProps.onAddToWatchlist).toHaveBeenCalledTimes(1);
  });

  it('renders with loading state', () => {
    const {toJSON} = render(<MediaDetailCard {...mockProps} loading={true} />);
    expect(toJSON()).toMatchSnapshot('loading state');
  });

  it('renders TV series with season info', () => {
    const tvSeries: MediaContent = {
      ...mockMedia,
      id: '2',
      title: 'Test Dizi',
      type: 'tv',
      numberOfSeasons: 3,
      numberOfEpisodes: 24,
    };

    const {toJSON} = render(<MediaDetailCard {...mockProps} media={tvSeries} />);
    expect(toJSON()).toMatchSnapshot('tv series');
  });

  it('handles null media prop', () => {
    const {toJSON} = render(<MediaDetailCard {...mockProps} media={null} />);
    expect(toJSON()).toMatchSnapshot('null media');
  });

  it('calls onContentChange when media changes', () => {
    const onContentChangeMock = jest.fn();
    const {rerender} = render(
      <MediaDetailCard {...mockProps} onContentChange={onContentChangeMock} />
    );

    // Simulate media change
    rerender(<MediaDetailCard {...mockProps} media={null} onContentChange={onContentChangeMock} />);

    expect(onContentChangeMock).toHaveBeenCalled();
  });
});
