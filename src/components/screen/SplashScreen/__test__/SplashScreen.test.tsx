import React from 'react';
import {render, act} from '@testing-library/react-native';
import {SplashScreen} from '../SplashScreen.component';

// Jest için zamanlayıcıları mockla
jest.useFakeTimers();

describe('SplashScreen Component', () => {
  const mockOnFinish = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {toJSON} = render(<SplashScreen onFinish={mockOnFinish} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onFinish after the default duration (3000ms)', () => {
    render(<SplashScreen onFinish={mockOnFinish} />);

    // onFinish henüz çağrılmamış olmalı
    expect(mockOnFinish).not.toHaveBeenCalled();

    // 3000ms'nin biraz altında ilerlet
    act(() => {
      jest.advanceTimersByTime(2999);
    });

    // Hala çağrılmamış olmalı
    expect(mockOnFinish).not.toHaveBeenCalled();

    // 3000ms'yi tamamla
    act(() => {
      jest.advanceTimersByTime(1);
    });

    // Şimdi çağrılmış olmalı
    expect(mockOnFinish).toHaveBeenCalled();
    expect(mockOnFinish).toHaveBeenCalledTimes(1);
  });

  it('calls onFinish after the specified duration', () => {
    const customDuration = 5000;
    render(<SplashScreen onFinish={mockOnFinish} duration={customDuration} />);

    // onFinish henüz çağrılmamış olmalı
    expect(mockOnFinish).not.toHaveBeenCalled();

    // 5000ms'nin biraz altında ilerlet
    act(() => {
      jest.advanceTimersByTime(4999);
    });

    // Hala çağrılmamış olmalı
    expect(mockOnFinish).not.toHaveBeenCalled();

    // 5000ms'yi tamamla
    act(() => {
      jest.advanceTimersByTime(1);
    });

    // Şimdi çağrılmış olmalı
    expect(mockOnFinish).toHaveBeenCalled();
    expect(mockOnFinish).toHaveBeenCalledTimes(1);
  });

  it('displays the app logo', () => {
    const {getByTestId} = render(<SplashScreen onFinish={mockOnFinish} />);

    // Logo elementini kontrol et
    // Not: Gerçek bileşen implementasyonuna göre bu testId değişebilir
    const logo = getByTestId('app-logo');
    expect(logo).toBeTruthy();
  });

  it('displays animation elements', () => {
    const {getByTestId} = render(<SplashScreen onFinish={mockOnFinish} />);

    // Animasyon elementlerini kontrol et
    // Not: Gerçek bileşen implementasyonuna göre bu testId'ler değişebilir
    const cameraIcon = getByTestId('camera-icon');
    const directorChairIcon = getByTestId('director-chair-icon');
    const clapperIcon = getByTestId('clapper-icon');

    expect(cameraIcon).toBeTruthy();
    expect(directorChairIcon).toBeTruthy();
    expect(clapperIcon).toBeTruthy();
  });

  it('cleans up timers on unmount', () => {
    const {unmount} = render(<SplashScreen onFinish={mockOnFinish} />);

    // clearTimeout'un çağrılıp çağrılmadığını kontrol etmek için spy oluştur
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    // Bileşeni unmount et
    unmount();

    // clearTimeout'un çağrıldığını kontrol et
    expect(clearTimeoutSpy).toHaveBeenCalled();

    // Spy'ı temizle
    clearTimeoutSpy.mockRestore();
  });
});
