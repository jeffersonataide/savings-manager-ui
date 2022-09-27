import { render, screen } from "@testing-library/react";
import { PortfoliosList } from "./";

test.skip("renders PortfoliosList", () => {
  render(<PortfoliosList />);

  const portfoliosListTitle = screen.getByText(/portfoliosList/i);
  expect(portfoliosListTitle).toBeInTheDocument();
});
