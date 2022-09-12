import { Link } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";

export const Login = () => {
  return (
    <div className="flex flex-col items-center">
      <LoginForm />
      Don't have an account yet?
      <Link className="hover:text-blue-500" to="/create-account">
        Create an account
      </Link>
    </div>
  );
};
