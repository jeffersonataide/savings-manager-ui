import { SubmitHandler, useForm } from "react-hook-form";
import { TDepositBase } from "services/api/deposits";

interface DepositFormParams {
  initialData?: TDepositBase;
  submitButtonText: string;
  onSubmit: (deposit: TDepositBase) => void;
}

export const DepositForm = ({
  initialData,
  submitButtonText,
  onSubmit,
}: DepositFormParams) => {
  const {
    register,
    handleSubmit: FormsHooksHandleSubmit,
    formState: { errors },
  } = useForm<TDepositBase>({ defaultValues: initialData });

  const handleSubmit: SubmitHandler<TDepositBase> = (deposit) => {
    onSubmit(deposit);
  };

  return (
    <form onSubmit={FormsHooksHandleSubmit(handleSubmit)}>
      <div className="m-3 flex flex-col">
        <label>
          * Amount:
          {errors.amount && (
            <span className="ml-3 text-red-400">This field is required</span>
          )}
        </label>
        <input
          className="rounded-lg p-2 my-2 flex-grow border-slate-400 border-2"
          type="number"
          {...register("amount", { required: true })}
        />
      </div>
      <div className="m-3 flex flex-col">
        <label>
          * Date:
          {errors.date && (
            <span className="ml-3 text-red-400">This field is required</span>
          )}
        </label>
        <input
          className="rounded-lg p-2 my-2 flex-grow border-slate-400 border-2"
          type="date"
          {...register("date", { required: true })}
        />
      </div>
      <div className="m-3 flex flex-col">
        <label>
          Description:
          {errors.description && (
            <span className="ml-3 text-red-400">Enter a valid description</span>
          )}
        </label>
        <input
          className="rounded-lg p-2 my-2 flex-grow border-slate-400 border-2"
          type="text"
          {...register("description")}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          type="submit"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};
