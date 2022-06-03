import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../tests";
import { Router } from "./";

test("renders assets page", () => {
  renderWithRouter(<Router />, {
    route: "/assets",
  });

  const assetsPageTest = screen.getByText(/assets page/i);
  expect(assetsPageTest).toBeInTheDocument();
});
