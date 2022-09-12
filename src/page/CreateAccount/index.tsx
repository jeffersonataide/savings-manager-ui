import { Link } from "react-router-dom";
import { CreateUserForm } from "../../components/CreateUserForm";

export const CreateAccount = () => {
  return (
    <div className="flex flex-col items-center">
      <CreateUserForm />
      Already have an account?
      <Link className="hover:text-blue-500" to="/login">
        Login
      </Link>
    </div>
  );
};
