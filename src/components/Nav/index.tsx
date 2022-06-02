import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Nav = () => {
  const links = [
    { label: "Home", url: "/" },
    { label: "Assets", url: "/assets" },
    { label: "Portfolio", url: "/portfolio" },
  ];

  return (
    <div className="bg-slate-100 text-slate-700 font-mono h-14 flex items-center justify-between px-5">
      <Link to="/" className="flex items-center font-mono">
        <span className="hidden sm:block">Savings Manager</span>
      </Link>

      <div className="flex justify-between">
        {links.map((link) => (
          <Link className="mx-2 sm:mx-5" to={link.url} key={uuidv4()}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
