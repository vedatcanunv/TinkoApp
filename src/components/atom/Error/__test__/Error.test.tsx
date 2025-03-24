import React from "react";
import { render } from "@testing-library/react-native";
import { Error } from "../Error.component";

describe("Error Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(<Error message="Test error message" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays error message correctly", () => {
    const errorMessage = "Bir hata oluştu";
    const { getByText } = render(<Error message={errorMessage} />);
    expect(getByText(errorMessage)).toBeTruthy();
  });
});
