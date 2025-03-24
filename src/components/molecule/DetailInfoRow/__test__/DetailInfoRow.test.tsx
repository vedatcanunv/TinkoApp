import React from "react";
import { render } from "@testing-library/react-native";
import { DetailInfoRow } from "../DetailInfoRow.component";

describe("DetailInfoRow Component", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
      <DetailInfoRow label="Yönetmen" value="Christopher Nolan" />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays label and value correctly", () => {
    const { getByText } = render(
      <DetailInfoRow label="Tür" value="Bilim Kurgu" />
    );

    expect(getByText("Tür")).toBeTruthy();
    expect(getByText("Bilim Kurgu")).toBeTruthy();
  });

  it("renders with long label and value", () => {
    const { toJSON, getByText } = render(
      <DetailInfoRow
        label="Çok Uzun Bir Etiket Metni"
        value="Çok çok uzun bir değer metni ve detaylandırılmış bilgi"
      />
    );

    expect(getByText("Çok Uzun Bir Etiket Metni")).toBeTruthy();
    expect(
      getByText("Çok çok uzun bir değer metni ve detaylandırılmış bilgi")
    ).toBeTruthy();
    expect(toJSON()).toMatchSnapshot("long content");
  });

  it("renders with empty value", () => {
    const { toJSON, getByText, queryByText } = render(
      <DetailInfoRow label="Açıklama" value="" />
    );

    expect(getByText("Açıklama")).toBeTruthy();
    expect(queryByText("")).toBeNull(); // Boş değer render edilmemeli
    expect(toJSON()).toMatchSnapshot("empty value");
  });

  it("handles long values properly", () => {
    const longValue =
      "Bu çok uzun bir değer metnidir ve birden fazla satıra yayılması beklenmektedir";
    const { toJSON } = render(<DetailInfoRow label="Özet" value={longValue} />);

    expect(toJSON()).toMatchSnapshot("long value");
  });

  it("handles empty value correctly", () => {
    const { getByText } = render(<DetailInfoRow label="Bilgi" value="" />);

    expect(getByText("Bilgi:")).toBeTruthy();
    // Boş değer için yapılacak test (gerekirse)
  });
});
