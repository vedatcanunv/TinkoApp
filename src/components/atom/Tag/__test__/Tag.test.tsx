import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Tag } from "../Tag.component";

describe("Tag Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Tag label="Test Tag" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with different variants", () => {
    const { toJSON: primary } = render(
      <Tag label="Primary" variant="primary" />
    );
    const { toJSON: secondary } = render(
      <Tag label="Secondary" variant="secondary" />
    );
    const { toJSON: outline } = render(
      <Tag label="Outline" variant="outline" />
    );

    expect(primary()).toMatchSnapshot("primary variant");
    expect(secondary()).toMatchSnapshot("secondary variant");
    expect(outline()).toMatchSnapshot("outline variant");
  });

  it("renders with different sizes", () => {
    const { toJSON: small } = render(<Tag label="Small" size="small" />);
    const { toJSON: medium } = render(<Tag label="Medium" size="medium" />);
    const { toJSON: large } = render(<Tag label="Large" size="large" />);

    expect(small()).toMatchSnapshot("small size");
    expect(medium()).toMatchSnapshot("medium size");
    expect(large()).toMatchSnapshot("large size");
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Tag label="Clickable Tag" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Clickable Tag"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders with selected state", () => {
    const { toJSON } = render(<Tag label="Selected Tag" isSelected={true} />);
    expect(toJSON()).toMatchSnapshot("selected tag");
  });

  it("renders with custom style", () => {
    const customStyle = { marginLeft: 10, borderWidth: 2 };
    const { toJSON } = render(<Tag label="Styled Tag" style={customStyle} />);
    expect(toJSON()).toMatchSnapshot("with custom style");
  });
});
