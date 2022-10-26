import { SubmitHandler, useForm } from "react-hook-form";
import { TDepositBase } from "services/api/deposits";
import { SubmitButton } from "../SubmitButton";

interface DepositFormParams {
  initialData?: TDepositBase;
  submitButtonText: string;
  isLoading: boolean;
  onSubmit: (deposit: TDepositBase) => void;
}

export const DepositForm = ({
  initialData,
  submitButtonText,
  isLoading,
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
      <div className="my-3 flex flex-col">
        <label>
          * Amount:
          {errors.amount && (
            <span className="ml-3 text-red-400">This field is required</span>
          )}
        </label>
        <input
          className="text-input"
          type="number"
          {...register("amount", { required: true })}
        />
      </div>
      <div className="my-3 flex flex-col">
        <label>
          * Date:
          {errors.date && (
            <span className="ml-3 text-red-400">This field is required</span>
          )}
        </label>
        <input
          className="text-input"
          type="date"
          {...register("date", { required: true })}
        />
      </div>
      <div className="my-3 flex flex-col">
        <label>
          Description:
          {errors.description && (
            <span className="ml-3 text-red-400">Enter a valid description</span>
          )}
        </label>
        <input
          className="text-input"
          type="text"
          {...register("description")}
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton isLoading={isLoading} text={submitButtonText} />
      </div>
    </form>
  );
};
