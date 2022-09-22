import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../contexts/userContext";

const openLinks = [{ label: "Home", url: "/" }];
const closedLinks = [{ label: "Portfolios", url: "/portfolio" }];

export const Nav = () => {
  const userContext = useUser();

  let links = openLinks;

  if (userContext?.isLogged) {
    links = [...links, ...closedLinks];
  }

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
        {userContext?.isLogged ? (
          <button className="mx-2 sm:mx-5" onClick={userContext.handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="mx-2 sm:mx-5" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
