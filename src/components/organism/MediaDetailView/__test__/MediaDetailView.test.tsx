import React from "react";
import { render } from "@testing-library/react-native";
import { MediaDetailView } from "../MediaDetailView.component";
import { MediaContent } from "../../../molecule/MediaCard/MediaCard.type";
import { EdgeInsets } from "react-native-safe-area-context";

describe("MediaDetailView Component", () => {
  const mockMedia: MediaContent = {
    id: 1,
    title: "Test Film",
    type: "movie",
    posterUrl: "https://example.com/poster.jpg",
    year: 2022,
    rating: 8.5,
    genres: [
      { id: 1, name: "Aksiyon" },
      { id: 2, name: "Bilim Kurgu" },
    ],
    summary: "Bu bir test film özetidir.",
    director: "Test Yönetmen",
    cast: ["Oyuncu 1", "Oyuncu 2"],
    duration: "2s 15dk",
  };

  const mockInsets: EdgeInsets = {
    top: 50,
    right: 10,
    bottom: 34,
    left: 10,
  };

  it("renders correctly", () => {
    const { toJSON } = render(
      <MediaDetailView media={mockMedia} insets={mockInsets} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays media title correctly", () => {
    const { getByText } = render(
      <MediaDetailView media={mockMedia} insets={mockInsets} />
    );
    expect(getByText("Test Film")).toBeTruthy();
  });

  it("displays summary correctly", () => {
    const { getByText } = render(
      <MediaDetailView media={mockMedia} insets={mockInsets} />
    );
    expect(getByText("Bu bir test film özetidir.")).toBeTruthy();
  });

  it("displays all genres correctly", () => {
    const { getByText } = render(
      <MediaDetailView media={mockMedia} insets={mockInsets} />
    );

    mockMedia.genres.forEach((genre) => {
      expect(getByText(genre.name)).toBeTruthy();
    });
  });

  it("displays director information correctly", () => {
    const { getByText } = render(
      <MediaDetailView media={mockMedia} insets={mockInsets} />
    );
    expect(getByText(/Test Yönetmen/)).toBeTruthy();
  });
});
