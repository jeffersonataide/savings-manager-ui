import { Footer } from "../../Organisms/Footer";
import { Nav } from "../../Organisms/Nav";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};