import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "contexts/userContext";
import { login, TUserLogin } from "services/api/login";
import { UserForm } from "../../Molecules/UserForm";

export const LoginForm = () => {
  const mutation = useMutation(login);
  const userContext = useUser();
  const navigate = useNavigate();

  const handleSubmit = (user: TUserLogin) => {
    mutation.mutate(user, {
      onSuccess: (result) => {
        userContext?.onLogin(result.access_token);
        navigate("/");
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
