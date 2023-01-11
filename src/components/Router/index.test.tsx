import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/tests";
import { Router } from "./";

test("renders assets page", () => {
  renderWithRouter(<Router />, {
    route: "/",
  });

  const portfoliosPageTest = screen.getByText(/create an account/i);
  expect(portfoliosPageTest).toBeInTheDocument();
});
