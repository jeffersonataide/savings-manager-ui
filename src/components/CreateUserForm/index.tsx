import { useMutation, useQueryClient } from "react-query";
import { createUser, TUserCreate } from "../../services/api";
import { UserForm } from "../UserForm";

export const CreateUserForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(createUser);

  const handleSubmit = (user: TUserCreate) => {
    mutation.mutate(user, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
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
