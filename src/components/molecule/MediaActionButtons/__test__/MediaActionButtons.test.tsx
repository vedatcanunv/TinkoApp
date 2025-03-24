import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MediaActionButtons } from "../MediaActionButtons.component";

describe("MediaActionButtons Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
      <MediaActionButtons
        onAddToWatchlist={jest.fn()}
        onMarkAsWatched={jest.fn()}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onAddToWatchlist when watch list button is pressed", () => {
    const onAddToWatchlistMock = jest.fn();
    const { getByTestId } = render(
      <MediaActionButtons
        onAddToWatchlist={onAddToWatchlistMock}
        onMarkAsWatched={jest.fn()}
      />
    );

    fireEvent.press(getByTestId("watchlist-button"));
    expect(onAddToWatchlistMock).toHaveBeenCalledTimes(1);
  });

  it("calls onMarkAsWatched when watched button is pressed", () => {
    const onMarkAsWatchedMock = jest.fn();
    const { getByTestId } = render(
      <MediaActionButtons
        onAddToWatchlist={jest.fn()}
        onMarkAsWatched={onMarkAsWatchedMock}
      />
    );

    fireEvent.press(getByTestId("watched-button"));
    expect(onMarkAsWatchedMock).toHaveBeenCalledTimes(1);
  });

  it("renders with custom bottomInset", () => {
    const { toJSON } = render(
      <MediaActionButtons
        onAddToWatchlist={jest.fn()}
        onMarkAsWatched={jest.fn()}
        bottomInset={20}
      />
    );
    expect(toJSON()).toMatchSnapshot("with bottom inset");
  });
});
