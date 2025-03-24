import React from "react";
import { render } from "@testing-library/react-native";
import { Icon } from "../Icon.component";

describe("Icon Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Icon name="home" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with different sizes", () => {
    const { toJSON: small } = render(<Icon name="home" size="small" />);
    const { toJSON: medium } = render(<Icon name="home" size="medium" />);
    const { toJSON: large } = render(<Icon name="home" size="large" />);

    expect(small()).toMatchSnapshot("small size");
    expect(medium()).toMatchSnapshot("medium size");
    expect(large()).toMatchSnapshot("large size");
  });

  it("renders with different colors", () => {
    const { toJSON: primary } = render(<Icon name="home" color="primary" />);
    const { toJSON: secondary } = render(
      <Icon name="home" color="secondary" />
    );
    const { toJSON: white } = render(<Icon name="home" color="white" />);

    expect(primary()).toMatchSnapshot("primary color");
    expect(secondary()).toMatchSnapshot("secondary color");
    expect(white()).toMatchSnapshot("white color");
  });

  it("renders with custom style", () => {
    const customStyle = { margin: 10 };
    const { toJSON } = render(<Icon name="home" style={customStyle} />);
    expect(toJSON()).toMatchSnapshot("with custom style");
  });
});
