import { screen } from "@testing-library/react";
import { renderWithRouter } from "tests";
import { Layout } from ".";

test("renders content inside Layout", () => {
  renderWithRouter(
    <Layout>
      <p>Main content</p>
    </Layout>
  );

  const mainContent = screen.getByText(/Main content/i);
  expect(mainContent).toBeInTheDocument();
});
