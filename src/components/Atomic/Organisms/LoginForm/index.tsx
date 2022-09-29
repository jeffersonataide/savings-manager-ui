import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login, TUserLogin } from "services/api/login";
import { UserForm } from "components/Atomic/Molecules/UserForm";
import { useUserStore } from "store/userStore";

export const LoginForm = () => {
  const mutation = useMutation(login);
  const navigate = useNavigate();
  const handleLogin = useUserStore((state) => state.handleLogin);

  const handleSubmit = (user: TUserLogin) => {
    mutation.mutate(user, {
      onSuccess: (result) => {
        handleLogin(result.access_token);
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
