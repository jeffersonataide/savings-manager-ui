import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Nav = () => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Assets", url: "/assets" },
    { label: "Portfolio", url: "/portfolio" },
  ];

  return (
    <div>
      <div>
        {links.map((link) => (
          <Link to={link.url} key={uuidv4()}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
