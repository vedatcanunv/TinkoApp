import React from 'react';
import {render} from '@testing-library/react-native';
import {GenresList} from '../GenresList.component';
import {Genre} from '../../../molecule/MediaCard/MediaCard.type';

describe('GenresList Component', () => {
  const mockGenres: Genre[] = [
    {id: '1', name: 'Aksiyon'},
    {id: '2', name: 'Macera'},
    {id: '3', name: 'Bilim Kurgu'},
  ];

  it('renders correctly with genres', () => {
    const {toJSON, getByText} = render(<GenresList genres={mockGenres} />);

    expect(getByText('Aksiyon')).toBeTruthy();
    expect(getByText('Macera')).toBeTruthy();
    expect(getByText('Bilim Kurgu')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with empty genres array', () => {
    const {toJSON} = render(<GenresList genres={[]} />);
    expect(toJSON()).toMatchSnapshot('empty genres');
  });

  it('renders correctly with single genre', () => {
    const {toJSON, getByText} = render(<GenresList genres={[{id: '1', name: 'Aksiyon'}]} />);

    expect(getByText('Aksiyon')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot('single genre');
  });

  it('renders genres with long names correctly', () => {
    const longGenres: Genre[] = [
      {id: '1', name: 'Çok Uzun Bir Tür İsmi'},
      {id: '2', name: 'Başka Bir Uzun Tür İsmi'},
    ];

    const {toJSON, getByText} = render(<GenresList genres={longGenres} />);

    expect(getByText('Çok Uzun Bir Tür İsmi')).toBeTruthy();
    expect(getByText('Başka Bir Uzun Tür İsmi')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot('long genre names');
  });
});
