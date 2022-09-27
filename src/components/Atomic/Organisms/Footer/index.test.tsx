import { render, screen } from "@testing-library/react";
import { Footer } from "./";

test("renders Footer", () => {
  render(<Footer />);

  const footerText = screen.getByText(/Footer/i);
  expect(footerText).toBeInTheDocument();
});
