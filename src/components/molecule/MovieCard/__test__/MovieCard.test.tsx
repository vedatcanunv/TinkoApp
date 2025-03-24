import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MovieCard } from "../MovieCard.component";
import { Movie } from "../MovieCard.type";

describe("MovieCard Component", () => {
  const mockMovie: Movie = {
    id: "1",
    title: "Test Film",
    year: "2023",
    genres: [
      { id: "1", name: "Aksiyon" },
      { id: "2", name: "Macera" },
    ],
    posterUrl: "https://example.com/poster.jpg",
    rating: 8.5,
  };

  it("renders correctly", () => {
    const { toJSON } = render(<MovieCard movie={mockMovie} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <MovieCard movie={mockMovie} onPress={onPressMock} />
    );

    fireEvent.press(getByText("Test Film"));
    expect(onPressMock).toHaveBeenCalledWith(mockMovie);
  });

  it("renders with different sizes", () => {
    const { toJSON: small } = render(
      <MovieCard movie={mockMovie} size="small" />
    );
    const { toJSON: medium } = render(
      <MovieCard movie={mockMovie} size="medium" />
    );
    const { toJSON: large } = render(
      <MovieCard movie={mockMovie} size="large" />
    );

    expect(small()).toMatchSnapshot("small size");
    expect(medium()).toMatchSnapshot("medium size");
    expect(large()).toMatchSnapshot("large size");
  });

  it("renders movie title correctly", () => {
    const { getByText } = render(<MovieCard movie={mockMovie} />);
    expect(getByText("Test Film")).toBeTruthy();
  });

  it("renders movie year correctly", () => {
    const { getByText } = render(<MovieCard movie={mockMovie} />);
    expect(getByText("2023")).toBeTruthy();
  });

  it("handles movie without poster", () => {
    const movieWithoutPoster = {
      ...mockMovie,
      posterUrl: undefined,
    };

    const { toJSON } = render(
      <MovieCard
        movie={movieWithoutPoster}
        placeholderText="Film Posteri Yok"
      />
    );
    expect(toJSON()).toMatchSnapshot("without poster");
  });

  it("displays rating when available", () => {
    const { getByText } = render(<MovieCard movie={mockMovie} />);
    // Rating gösterimi component implementasyonuna göre bu test güncellenmeli
    // Örnek: "8.5" veya "8.5/10" şeklinde gösterilebilir
  });

  it("renders with custom styles", () => {
    const { toJSON } = render(
      <MovieCard movie={mockMovie} style={{ margin: 10, borderRadius: 8 }} />
    );
    expect(toJSON()).toMatchSnapshot("with custom style");
  });
});
