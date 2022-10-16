import { Link } from "react-router-dom";
import { CreateUserForm } from "components/Atomic/Organisms/CreateUserForm";

export const CreateAccount = () => {
  return (
    <div className="flex flex-col items-center">
      <CreateUserForm />
      Already have an account?
      <Link className="text-blue-600 hover:text-blue-300" to="/login">
        Login
      </Link>
    </div>
  );
};
