import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders home page", () => {
  render(<App />);
  const mainText = screen.getByText(/savings manager/i);
  expect(mainText).toBeInTheDocument();
});
