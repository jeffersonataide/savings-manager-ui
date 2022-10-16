import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "store/userStore";
import { LoginForm } from "components/Atomic/Organisms/LoginForm";

export const Login = () => {
  const navigate = useNavigate();
  const isLogged = useUserStore((state) => state.isLogged);

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <div className="flex flex-col items-center">
      <LoginForm />
      Don't have an account yet?
      <Link className="text-blue-600 hover:text-blue-300" to="/create-account">
        Create an account
      </Link>
    </div>
  );
};
