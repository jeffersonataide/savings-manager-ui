import { useMutation } from "react-query";
import { login, TUserLogin } from "../../services/api/login";
import { UserForm } from "../UserForm";

export const LoginForm = () => {
  const mutation = useMutation(login);

  const handleSubmit = (user: TUserLogin) => {
    mutation.mutate(user, {
      onSuccess: (result) => {
        localStorage.setItem("jwt", result.access_token);
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
