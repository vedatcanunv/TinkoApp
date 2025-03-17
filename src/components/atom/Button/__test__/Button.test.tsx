import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../Button.component";

describe("Button Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
      <Button title="Test Button" onPress={jest.fn()} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("applies different styles based on variant prop", () => {
    const { toJSON: primary } = render(
      <Button title="Primary" onPress={jest.fn()} variant="primary" />
    );
    const { toJSON: secondary } = render(
      <Button title="Secondary" onPress={jest.fn()} variant="secondary" />
    );
    const { toJSON: outline } = render(
      <Button title="Outline" onPress={jest.fn()} variant="outline" />
    );

    expect(primary()).toMatchSnapshot("primary");
    expect(secondary()).toMatchSnapshot("secondary");
    expect(outline()).toMatchSnapshot("outline");
  });

  it("applies different styles based on size prop", () => {
    const { toJSON: small } = render(
      <Button title="Small" onPress={jest.fn()} size="small" />
    );
    const { toJSON: medium } = render(
      <Button title="Medium" onPress={jest.fn()} size="medium" />
    );
    const { toJSON: large } = render(
      <Button title="Large" onPress={jest.fn()} size="large" />
    );

    expect(small()).toMatchSnapshot("small");
    expect(medium()).toMatchSnapshot("medium");
    expect(large()).toMatchSnapshot("large");
  });
});
