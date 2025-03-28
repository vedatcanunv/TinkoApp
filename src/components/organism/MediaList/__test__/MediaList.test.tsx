import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {MediaList} from '../MediaList.component';
import {MediaContent} from '../../../molecule/MediaCard/MediaCard.type';

describe('MediaList Component', () => {
  const mockData: MediaContent[] = [
    {
      id: 1,
      title: 'Test Film 1',
      type: 'movie',
      posterUrl: 'https://example.com/poster1.jpg',
      year: 2021,
      genres: [{id: 1, name: 'Aksiyon'}],
    },
    {
      id: 2,
      title: 'Test Dizi 1',
      type: 'tv',
      posterUrl: 'https://example.com/poster2.jpg',
      year: 2022,
      genres: [{id: 2, name: 'Komedi'}],
    },
  ];

  it('renders correctly', () => {
    const {toJSON} = render(<MediaList data={mockData} onPress={jest.fn()} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress with correct media item when pressed', () => {
    const onPressMock = jest.fn();
    const {getAllByTestId} = render(<MediaList data={mockData} onPress={onPressMock} />);

    // Not: MediaCard bileşenine testID="media-card" eklenmesi gerekiyor
    const mediaCards = getAllByTestId('media-card');
    fireEvent.press(mediaCards[0]);

    expect(onPressMock).toHaveBeenCalledWith(mockData[0]);
  });

  it('renders loading footer when loadingMore is true', () => {
    const {getByText} = render(
      <MediaList data={mockData} onPress={jest.fn()} loadingMore={true} />
    );

    expect(getByText('Daha fazla içerik yükleniyor...')).toBeTruthy();
  });

  it('calls onLoadMore when end reached', () => {
    const onLoadMoreMock = jest.fn();
    const {getByTestId} = render(
      <MediaList data={mockData} onPress={jest.fn()} onLoadMore={onLoadMoreMock} />
    );

    // Not: FlatList'e testID="media-list" eklenmesi gerekiyor
    const flatList = getByTestId('media-list');

    // FlatList'in onEndReached fonksiyonunu manuel olarak çağırıyoruz
    if (flatList.props.onEndReached) {
      flatList.props.onEndReached();
    }

    expect(onLoadMoreMock).toHaveBeenCalled();
  });

  it('renders empty list correctly', () => {
    const {toJSON} = render(<MediaList data={[]} onPress={jest.fn()} />);

    expect(toJSON()).toMatchSnapshot('empty list');
  });
});
