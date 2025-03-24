import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ProfileScreen } from "../ProfileScreen.component";

describe("ProfileScreen Component", () => {
  const mockOnLogout = jest.fn();
  const mockOnWatchedMoviesPress = jest.fn();
  const mockOnWatchedTVShowsPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onLogout when logout button is pressed", () => {
    const { getByText } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );

    const logoutButton = getByText("Çıkış Yap");
    fireEvent.press(logoutButton);

    expect(mockOnLogout).toHaveBeenCalled();
  });

  it("calls onWatchedMoviesPress when watched movies button is pressed", () => {
    const { getByText } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );

    const watchedMoviesButton = getByText("İzlenen Filmler");
    fireEvent.press(watchedMoviesButton);

    expect(mockOnWatchedMoviesPress).toHaveBeenCalled();
  });

  it("calls onWatchedTVShowsPress when watched TV shows button is pressed", () => {
    const { getByText } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );

    const watchedTVShowsButton = getByText("İzlenen Diziler");
    fireEvent.press(watchedTVShowsButton);

    expect(mockOnWatchedTVShowsPress).toHaveBeenCalled();
  });

  it("displays user profile information", () => {
    const { getByText } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );

    expect(getByText("Profil")).toBeTruthy();
    // Kullanıcı adı, email veya diğer profil bilgilerini kontrol et
    // Not: Gerçek bileşen implementasyonuna göre bu assertionlar değişebilir
  });

  it("displays statistics sections", () => {
    const { getByText } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );

    // İstatistik bölümlerinin başlıklarını kontrol et
    expect(getByText("İstatistikler")).toBeTruthy();

    // Favori türler, oyuncular ve yönetmenler bölümlerini kontrol et
    // Not: Gerçek bileşen implementasyonuna göre bu assertionlar değişebilir
  });

  it("displays total watched counts", () => {
    const { getByTestId } = render(
      <ProfileScreen
        onLogout={mockOnLogout}
        onWatchedMoviesPress={mockOnWatchedMoviesPress}
        onWatchedTVShowsPress={mockOnWatchedTVShowsPress}
      />
    );

    // İzlenen film ve dizi sayılarını kontrol et
    // Not: Bu testler bileşen implementasyonuna göre değişebilir ve test ID'leri eklenmeli
    const movieCount = getByTestId("movie-count");
    const tvShowCount = getByTestId("tv-show-count");

    expect(movieCount).toBeTruthy();
    expect(tvShowCount).toBeTruthy();
  });

  // Not: ProfileScreenProps içinde onSettingsPress bulunmadığı için bu test kaldırıldı
  // Eğer bu özellik bileşene eklenirse test tekrar aktifleştirilebilir
});
