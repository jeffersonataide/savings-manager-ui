import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "store/userStore";
import { openRoutes, protectedRoutes } from "components/Router";

const openLinks = ["Home"];
const closedLinks = ["Portfolios"];

export const Nav = () => {
  const { isLogged, handleLogout } = useUserStore((state) => ({
    isLogged: state.isLogged,
    handleLogout: state.handleLogout,
  }));

  const links = [
    ...openLinks.map((link) => openRoutes.find((route) => route.name === link)),
    ...(isLogged
      ? closedLinks.map((link) =>
          protectedRoutes.find((route) => route.name === link)
        )
      : []),
  ];

  return (
    <div className="bg-slate-100 text-slate-700 font-mono h-14 flex items-center justify-between px-5">
      <Link to="/" className="flex items-center font-mono">
        <span className="hidden sm:block">Savings Manager</span>
      </Link>

      <div className="flex justify-between">
        {links.map((link) =>
          link ? (
            <Link className="mx-2 sm:mx-5" to={link.path} key={uuidv4()}>
              {link.name}
            </Link>
          ) : null
        )}

        {isLogged ? (
          <button className="mx-2 sm:mx-5" onClick={handleLogout}>
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
