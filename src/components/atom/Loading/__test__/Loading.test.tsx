import React from "react";
import { render } from "@testing-library/react-native";
import { Loading } from "../Loading.component";

describe("Loading Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Loading />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with custom size", () => {
    const { toJSON: small } = render(<Loading size="small" />);
    const { toJSON: medium } = render(<Loading size="medium" />);
    const { toJSON: large } = render(<Loading size="large" />);

    expect(small()).toMatchSnapshot("small size");
    expect(medium()).toMatchSnapshot("medium size");
    expect(large()).toMatchSnapshot("large size");
  });

  it("renders with text when provided", () => {
    const loadingText = "Yükleniyor...";
    const { getByText } = render(<Loading text={loadingText} />);
    expect(getByText(loadingText)).toBeTruthy();
  });

  it("renders with color when provided", () => {
    const { toJSON: primary } = render(<Loading color="primary" />);
    const { toJSON: secondary } = render(<Loading color="secondary" />);
    const { toJSON: white } = render(<Loading color="white" />);

    expect(primary()).toMatchSnapshot("primary color");
    expect(secondary()).toMatchSnapshot("secondary color");
    expect(white()).toMatchSnapshot("white color");
  });

  it("renders with text color when provided", () => {
    const { toJSON } = render(
      <Loading text="Yükleniyor..." textColor="primary" />
    );
    expect(toJSON()).toMatchSnapshot("with text color");
  });
});
