import { render } from "@testing-library/react";
import { Sample } from "@/components/Sample";

describe("Sampleコンポーネント", () => {
  test("should first", () => {
    const { getByText } = render(<Sample />);
    expect(getByText("Nextjs+Jestのサンプルサプリ")).toBeTruthy();
    expect(getByText("設定がすごく楽になりました。")).toBeTruthy();
  });
});
