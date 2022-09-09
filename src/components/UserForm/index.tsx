import { ChangeEventHandler, useState } from "react";
import { TUserCreate } from "../../services/api";

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

  const hanldeSubmit = () => {
    onSubmit(user);
    setUser(USER_INITIAL);
  };

  return (
    <div className="border-slate-400 border-2 rounded-lg w-max m-3 p-5 bg-slate-100">
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
          type="text"
          value={user.password}
          onChange={onPasswordChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-white m-3 p-1 px-5 rounded-lg border-cyan-500 border-2"
          onClick={hanldeSubmit}
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
};