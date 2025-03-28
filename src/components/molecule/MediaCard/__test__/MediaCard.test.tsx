import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MediaCard} from '../MediaCard.component';
import {MediaContent} from '../MediaCard.type';

describe('MediaCard Component', () => {
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
    summary: 'Test film açıklaması',
  };

  it('renders correctly with required props', () => {
    const {toJSON} = render(<MediaCard media={mockMedia} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when card is pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<MediaCard media={mockMedia} onPress={onPressMock} />);

    fireEvent.press(getByText('Test Film'));
    expect(onPressMock).toHaveBeenCalledWith(mockMedia);
  });

  it('renders with different sizes', () => {
    const {toJSON: small} = render(<MediaCard media={mockMedia} size="small" />);
    const {toJSON: medium} = render(<MediaCard media={mockMedia} size="medium" />);
    const {toJSON: large} = render(<MediaCard media={mockMedia} size="large" />);

    expect(small()).toMatchSnapshot('small size');
    expect(medium()).toMatchSnapshot('medium size');
    expect(large()).toMatchSnapshot('large size');
  });

  it('renders with custom style', () => {
    const {toJSON} = render(<MediaCard media={mockMedia} style={{margin: 10, borderRadius: 15}} />);
    expect(toJSON()).toMatchSnapshot('custom style');
  });

  it('respects maxGenreTags prop', () => {
    const {toJSON: default3} = render(<MediaCard media={mockMedia} />);
    const {toJSON: max2} = render(<MediaCard media={mockMedia} maxGenreTags={2} />);
    const {toJSON: max1} = render(<MediaCard media={mockMedia} maxGenreTags={1} />);

    expect(default3()).toMatchSnapshot('default max 3 genre tags');
    expect(max2()).toMatchSnapshot('max 2 genre tags');
    expect(max1()).toMatchSnapshot('max 1 genre tag');
  });

  it('renders without type label when showType is false', () => {
    const {toJSON: withType} = render(<MediaCard media={mockMedia} />);
    const {toJSON: withoutType} = render(<MediaCard media={mockMedia} showType={false} />);

    expect(withType()).toMatchSnapshot('with type label');
    expect(withoutType()).toMatchSnapshot('without type label');
  });

  it('renders TV series properly', () => {
    const tvSeries: MediaContent = {
      ...mockMedia,
      id: '2',
      title: 'Test Dizi',
      type: 'tv',
      numberOfSeasons: 3,
      numberOfEpisodes: 24,
    };

    const {toJSON} = render(<MediaCard media={tvSeries} />);
    expect(toJSON()).toMatchSnapshot('tv series');
  });
});
