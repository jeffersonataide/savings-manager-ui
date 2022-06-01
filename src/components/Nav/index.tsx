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
          <a href="/" key={uuidv4()}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};
