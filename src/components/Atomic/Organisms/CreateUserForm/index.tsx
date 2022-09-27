import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createUser, TUserCreate } from "services/api/users";
import { UserForm } from "components/Atomic/Molecules/UserForm";

export const CreateUserForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createUser);
  const navigate = useNavigate();

  const handleSubmit = (user: TUserCreate) => {
    mutation.mutate(user, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        navigate("/login");
      },
    });
  };

  return (
    <UserForm
      title={"Create User"}
      submitButtonText={"Create"}
      onSubmit={handleSubmit}
    />
  );
};
