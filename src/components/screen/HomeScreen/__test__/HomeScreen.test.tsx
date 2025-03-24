import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { HomeScreen } from "../HomeScreen.component";
import { MediaContent } from "../../../molecule/MediaCard/MediaCard.type";

// API çağrılarını mock etmek için
jest.mock("../../../../services/tmdb.service", () => ({
  tmdbService: {
    getPopularInTurkey: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: "Test Film",
        posterUrl: "https://example.com/poster.jpg",
        year: "2023",
        genres: [{ id: "1", name: "Aksiyon" }],
        type: "movie",
        rating: 8.5,
      },
      {
        id: 2,
        title: "Test Dizi",
        posterUrl: "https://example.com/series.jpg",
        year: "2023",
        genres: [{ id: "2", name: "Dram" }],
        type: "tv",
        rating: 9.0,
      },
    ]),
  },
}));

describe("HomeScreen Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { toJSON } = await act(async () =>
      render(<HomeScreen onMoviePress={jest.fn()} onAddPress={jest.fn()} />)
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders loading state initially", async () => {
    const { getByText } = render(
      <HomeScreen onMoviePress={jest.fn()} onAddPress={jest.fn()} />
    );
    expect(getByText("İçerik yükleniyor...")).toBeTruthy();
  });

  it("renders media cards after loading", async () => {
    const { findByText } = await act(async () =>
      render(<HomeScreen onMoviePress={jest.fn()} onAddPress={jest.fn()} />)
    );

    // API çağrısı tamamlandıktan sonra medya kartlarının gösterilmesini bekle
    const mediaTitle = await findByText("Test Film");
    expect(mediaTitle).toBeTruthy();
  });

  it("calls onMoviePress when media card is pressed", async () => {
    const onMoviePressMock = jest.fn();
    const { findByText } = await act(async () =>
      render(
        <HomeScreen onMoviePress={onMoviePressMock} onAddPress={jest.fn()} />
      )
    );

    // API çağrısı tamamlandıktan sonra medya kartının tıklanabilir olmasını bekle
    const mediaCard = await findByText("Test Film");
    fireEvent.press(mediaCard);

    // onMoviePress'in çağrıldığını kontrol et
    expect(onMoviePressMock).toHaveBeenCalledWith(1);
  });

  it("handles refresh action", async () => {
    const { getByTestId } = await act(async () =>
      render(<HomeScreen onMoviePress={jest.fn()} onAddPress={jest.fn()} />)
    );

    // RefreshControl'ü bulmak ve simüle etmek için
    // Not: Bileşen implementasyonuna göre testID eklenebilir
    const refreshControl = getByTestId("refresh-control");
    await act(async () => {
      fireEvent(refreshControl, "refresh");
    });

    // tmdbService.getPopularInTurkey'in tekrar çağrıldığını kontrol et
    const mockGetPopular = jest.requireMock("../../../../services/tmdb.service")
      .tmdbService.getPopularInTurkey;
    expect(mockGetPopular).toHaveBeenCalledTimes(2); // İlk render ve refresh ile
  });

  it("handles error state", async () => {
    // API hata fırlatacak şekilde mock'u değiştir
    const mockGetPopular = jest.requireMock("../../../../services/tmdb.service")
      .tmdbService.getPopularInTurkey;
    mockGetPopular.mockRejectedValueOnce(new Error("API error"));

    const { findByText } = await act(async () =>
      render(<HomeScreen onMoviePress={jest.fn()} onAddPress={jest.fn()} />)
    );

    // Hata mesajının gösterilmesini bekle
    const errorMessage = await findByText(
      "İçerik yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
    );
    expect(errorMessage).toBeTruthy();
  });

  it("calls onAddPress when add button is pressed", async () => {
    const onAddPressMock = jest.fn();
    const { getByTestId } = await act(async () =>
      render(
        <HomeScreen onMoviePress={jest.fn()} onAddPress={onAddPressMock} />
      )
    );

    // Ekle butonunu bul ve tıkla
    const addButton = getByTestId("add-button");
    fireEvent.press(addButton);

    expect(onAddPressMock).toHaveBeenCalled();
  });

  it("shows media detail card when a media is selected", async () => {
    const { findByText, getByTestId } = await act(async () =>
      render(<HomeScreen onMoviePress={jest.fn()} onAddPress={jest.fn()} />)
    );

    // Medya kartına tıkla
    const mediaCard = await findByText("Test Film");
    fireEvent.press(mediaCard);

    // Detay kartının görünür olduğunu kontrol et
    const detailCard = getByTestId("media-detail-card");
    expect(detailCard).toBeTruthy();
  });
});
