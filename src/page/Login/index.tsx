import { CreateUserForm } from "../../components/CreateUserForm";
import { LoginForm } from "../../components/LoginForm";

export const Login = () => {
  return (
    <div className="flex flex-col items-center">
      <CreateUserForm />
      <LoginForm />
    </div>
  );
};
