import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Simple from "./Simple";

describe("Simple Component", () => {
  it("should renders properly", () => {
    const { getByTestId } = render(<Simple />);

    expect(getByTestId("simple")).toBeTruthy();
  });
});
