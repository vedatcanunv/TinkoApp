import React from 'react';
import {render} from '@testing-library/react-native';
import {StatisticsList} from '../StatisticsList.component';

const mockStats = {
  totalWatchedMovies: 10,
  totalWatchedSeries: 5,
  totalWatchlistMovies: 15,
  totalWatchlistSeries: 8,
};

describe('StatisticsList', () => {
  it('renders correctly with stats', () => {
    const {toJSON} = render(<StatisticsList stats={mockStats} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with custom style', () => {
    const customStyle = {backgroundColor: 'red'};
    const {toJSON} = render(<StatisticsList stats={mockStats} style={customStyle} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('displays correct statistics values', () => {
    const {getByText} = render(<StatisticsList stats={mockStats} />);

    expect(getByText('10')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('15')).toBeTruthy();
    expect(getByText('8')).toBeTruthy();
  });

  it('displays correct statistics titles', () => {
    const {getByText} = render(<StatisticsList stats={mockStats} />);

    expect(getByText('İzlenen Film')).toBeTruthy();
    expect(getByText('İzlenen Dizi')).toBeTruthy();
    expect(getByText('İzlenecek Film')).toBeTruthy();
    expect(getByText('İzlenecek Dizi')).toBeTruthy();
  });
});
