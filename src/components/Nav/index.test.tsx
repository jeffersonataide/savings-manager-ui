import { screen } from "@testing-library/react";
import { renderWithRouter } from "../../tests";
import { Nav } from "./";

test("renders link in the navigation bar", () => {
  renderWithRouter(<Nav />);

  const navLink = screen.getByText(/home/i);
  expect(navLink).toBeInTheDocument();
});
