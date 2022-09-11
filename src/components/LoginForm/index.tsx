import { useMutation } from "react-query";
import { useUser } from "../../contexts/userContext";
import { login, TUserLogin } from "../../services/api/login";
import { UserForm } from "../UserForm";

export const LoginForm = () => {
  const mutation = useMutation(login);
  const userContext = useUser();

  const handleSubmit = (user: TUserLogin) => {
    mutation.mutate(user, {
      onSuccess: (result) => {
        userContext?.onLogin(result.access_token);
      },
    });
  };

  return (
    <UserForm
      title={"Login"}
      submitButtonText={"Login"}
      onSubmit={handleSubmit}
    />
  );
};
