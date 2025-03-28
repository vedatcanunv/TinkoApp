import React from 'react';
import {render} from '@testing-library/react-native';
import {StateView} from '../StateView.component';

describe('StateView Component', () => {
  it('renders loading state correctly', () => {
    const {toJSON, getByText} = render(<StateView loading loadingText="Yükleniyor..." />);
    expect(getByText('Yükleniyor...')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot('loading state');
  });

  it('renders error state correctly', () => {
    const {toJSON, getByText} = render(<StateView error="Bir hata oluştu!" errorText="Hata:" />);
    expect(getByText('Hata:')).toBeTruthy();
    expect(getByText('Bir hata oluştu!')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot('error state');
  });

  it('renders empty state correctly', () => {
    const {toJSON, getByText} = render(<StateView empty emptyText="Veri bulunamadı." />);
    expect(getByText('Veri bulunamadı.')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot('empty state');
  });

  it('prioritizes loading state over error and empty', () => {
    const {toJSON, getByText, queryByText} = render(
      <StateView loading loadingText="Yükleniyor..." error="Hata!" empty emptyText="Boş" />
    );
    expect(getByText('Yükleniyor...')).toBeTruthy();
    expect(queryByText('Hata!')).toBeNull();
    expect(queryByText('Boş')).toBeNull();
    expect(toJSON()).toMatchSnapshot('prioritized loading');
  });

  it('prioritizes error state over empty', () => {
    const {toJSON, getByText, queryByText} = render(
      <StateView error="Hata!" errorText="Hata Mesajı:" empty emptyText="Boş" />
    );
    expect(getByText('Hata Mesajı:')).toBeTruthy();
    expect(getByText('Hata!')).toBeTruthy();
    expect(queryByText('Boş')).toBeNull();
    expect(toJSON()).toMatchSnapshot('prioritized error');
  });

  it('renders nothing when no state is provided', () => {
    const {toJSON} = render(<StateView />);
    expect(toJSON()).toMatchSnapshot('no state');
  });

  it('uses default texts when not provided', () => {
    const {toJSON, getByText} = render(<StateView loading />);
    expect(getByText('Yükleniyor')).toBeTruthy(); // Veya bileşenin varsayılan metni
    expect(toJSON()).toMatchSnapshot('default loading text');
  });
});
