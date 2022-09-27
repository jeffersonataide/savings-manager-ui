import { ChangeEventHandler, FormEvent, useState } from "react";
import { TUserCreate } from "services/api/users";
import { Box } from "components/Atomic/Atoms/Box";

interface UserFormParams {
  title: string;
  submitButtonText: string;
  onSubmit: (user: TUserCreate) => void;
}

const USER_INITIAL: TUserCreate = { username: "", password: "" };

export const UserForm = ({
  title,
  submitButtonText,
  onSubmit,
}: UserFormParams) => {
  const [user, setUser] = useState<TUserCreate>(USER_INITIAL);

  const onUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, username: e.target.value });
  };

  const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(user);
    setUser(USER_INITIAL);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <h2 className="font-bold text-center">{title}</h2>
        <div className="my-3">
          <label>Username:</label>
          <input
            className="rounded-lg ml-3 p-2 border-slate-400 border-2"
            type="text"
            value={user.username}
            onChange={onUsernameChange}
          />
        </div>
        <div className="my-3">
          <label>Password:</label>
          <input
            className="rounded-lg ml-3 p-2 border-slate-400 border-2"
            type="password"
            value={user.password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-white m-3 p-1 px-5 rounded-lg border-cyan-500 border-2"
            type="submit"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </Box>
  );
};
