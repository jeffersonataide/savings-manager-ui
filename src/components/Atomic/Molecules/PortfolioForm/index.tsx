import { SubmitHandler, useForm } from "react-hook-form";
import { TPortfolioBase } from "@/services/api/portfolios";
import { SubmitButton } from "../SubmitButton";

interface PortfolioFormParams {
  initialData?: TPortfolioBase;
  submitButtonText: string;
  isLoading: boolean;
  onSubmit: (portfolio: TPortfolioBase) => void;
}

export const PortfolioForm = ({
  initialData,
  submitButtonText,
  isLoading,
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
      <div className="my-3 flex flex-col">
        <label>
          * Name:
          {errors.name && (
            <span className="ml-3 text-red-400">This field is required</span>
          )}
        </label>
        <input
          className="text-input"
          type="text"
          {...register("name", { required: true })}
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton isLoading={isLoading} text={submitButtonText} />
      </div>
    </form>
  );
};
