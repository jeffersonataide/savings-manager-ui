import { render, screen } from "@testing-library/react";
import { Footer } from "./";

test("renders Footer", () => {
  render(<Footer />);

  const footerText = screen.getByText(/©/i);
  expect(footerText).toBeInTheDocument();
});
