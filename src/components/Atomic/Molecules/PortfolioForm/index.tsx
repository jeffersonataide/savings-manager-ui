import { SubmitHandler, useForm } from "react-hook-form";
import { TPortfolioBase } from "services/api/portfolios";

interface PortfolioFormParams {
  initialData?: TPortfolioBase;
  submitButtonText: string;
  onSubmit: (portfolio: TPortfolioBase) => void;
}

export const PortfolioForm = ({
  initialData,
  submitButtonText,
  onSubmit,
}: PortfolioFormParams) => {
  const {
    register,
    handleSubmit: FormsHooksHandleSubmit,
    formState: { errors },
  } = useForm<TPortfolioBase>({ defaultValues: initialData });

  const handleSubmit: SubmitHandler<TPortfolioBase> = (portfolio) => {
    onSubmit(portfolio);
  };

  return (
    <form onSubmit={FormsHooksHandleSubmit(handleSubmit)}>
      <div className="my-3 flex items-center">
        <label>* Name:</label>
        {errors.name && <span>This field is required</span>}
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="text"
          {...register("name", { required: true })}
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
