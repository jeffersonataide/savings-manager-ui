import { TUserCreate } from "@/services/api/users";
import { Box } from "@/components/Atomic/Atoms/Box";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "../SubmitButton";

interface UserFormParams {
  title: string;
  submitButtonText: string;
  isLoading: boolean;
  onSubmit: (user: TUserCreate) => Promise<void>;
}

export const UserForm = ({
  title,
  submitButtonText,
  isLoading,
  onSubmit,
}: UserFormParams) => {
  const {
    register,
    handleSubmit: FormsHooksHandleSubmit,
    formState: { errors },
    setError,
  } = useForm<TUserCreate>();

  const handleSubmit: SubmitHandler<TUserCreate> = async (user) => {
    try {
      await onSubmit(user);
    } catch (error) {
      setError("username", {
        type: "userExists",
      });
    }
  };

  return (
    <Box>
      <form onSubmit={FormsHooksHandleSubmit(handleSubmit)}>
        <h2 className="font-bold text-center">{title}</h2>
        <div className="my-3 flex flex-col">
          <label>
            * Username:
            {errors.username && (
              <span className="ml-3 text-red-400">
                {errors.username.type === "invalidUsername"
                  ? "Only letters and numbers allowed"
                  : errors.username.type === "userExists"
                  ? "Username already exists"
                  : "This field is required"}
              </span>
            )}
          </label>
          <input
            className="text-input"
            type="text"
            {...register("username", {
              required: true,
              validate: {
                invalidUsername: (v) => /^([a-z]+)([a-z0-9].)$/.test(v),
              },
            })}
          />
        </div>
        <div className="my-3 flex flex-col">
          <label>
            * Password:
            {errors.password && (
              <span className="ml-3 text-red-400">This field is required</span>
            )}
          </label>
          <input
            className="text-input"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton isLoading={isLoading} text={submitButtonText} />
        </div>
      </form>
    </Box>
  );
};
