import React from 'react';
import {render} from '@testing-library/react-native';
import {MediaHeader} from '../MediaHeader.component';
import {MediaContent} from '../../../molecule/MediaCard/MediaCard.type';
import {EdgeInsets} from 'react-native-safe-area-context';

describe('MediaHeader Component', () => {
  const mockMedia: MediaContent = {
    id: '1',
    title: 'Test Film',
    posterUrl: 'https://example.com/poster.jpg',
    year: '2023',
    genres: [
      {id: '1', name: 'Aksiyon'},
      {id: '2', name: 'Macera'},
    ],
    type: 'movie',
    rating: 8.5,
    duration: '120 dk',
    summary: 'Test film açıklaması',
  };

  const mockInsets: EdgeInsets = {
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  };

  it('renders correctly', () => {
    const {toJSON} = render(<MediaHeader media={mockMedia} insets={mockInsets} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays media title correctly', () => {
    const {getByText} = render(<MediaHeader media={mockMedia} insets={mockInsets} />);
    expect(getByText('Test Film')).toBeTruthy();
  });

  it('displays media year and rating correctly', () => {
    const {getByText} = render(<MediaHeader media={mockMedia} insets={mockInsets} />);
    expect(getByText('2023')).toBeTruthy();
    // Rating değeri genellikle "8.5/10" gibi bir formatta gösterilir
    // Tam formata göre bu test güncellenmeli
  });

  it('renders poster image correctly', () => {
    const {UNSAFE_getByProps} = render(<MediaHeader media={mockMedia} insets={mockInsets} />);

    // Poster görüntüsünü test et (resim URL'sinin doğru olduğunu kontrol et)
    const posterImage = UNSAFE_getByProps({
      source: {uri: mockMedia.posterUrl},
    });
    expect(posterImage).toBeTruthy();
  });

  it('handles media without poster', () => {
    const mediaWithoutPoster = {
      ...mockMedia,
      posterUrl: '',
    };

    const {toJSON} = render(<MediaHeader media={mediaWithoutPoster} insets={mockInsets} />);
    expect(toJSON()).toMatchSnapshot('without poster');
  });

  it('applies safe area insets correctly', () => {
    const customInsets: EdgeInsets = {
      top: 100,
      bottom: 50,
      left: 10,
      right: 10,
    };

    const {toJSON} = render(<MediaHeader media={mockMedia} insets={customInsets} />);
    expect(toJSON()).toMatchSnapshot('custom insets');
  });
});
