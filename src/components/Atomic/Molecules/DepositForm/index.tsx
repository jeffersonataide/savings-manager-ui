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
      <div className="my-3 flex items-center">
        <label>* Amount:</label>
        {errors.amount && <span>This field is required</span>}
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="number"
          {...register("amount", { required: true })}
        />
      </div>
      <div className="my-3 flex items-center">
        <label>* Date:</label>
        {errors.date && <span>This field is required</span>}
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="date"
          {...register("date", { required: true })}
        />
      </div>
      <div className="my-3 flex items-center">
        <label>Description:</label>
        {errors.description && <span>Enter a valid description</span>}
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
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
