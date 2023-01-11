import { SubmitHandler, useForm } from "react-hook-form";
import { TAssetBase } from "@/services/api/assets";
import { SubmitButton } from "../SubmitButton";

interface AssetFormParams {
  initialData?: TAssetBase;
  submitButtonText: string;
  isLoading: boolean;
  onSubmit: (asset: TAssetBase) => void;
}

export const AssetForm = ({
  initialData,
  submitButtonText,
  isLoading,
  onSubmit,
}: AssetFormParams) => {
  const {
    register,
    handleSubmit: FormsHooksHandleSubmit,
    formState: { errors },
  } = useForm<TAssetBase>({ defaultValues: initialData });

  const handleSubmit: SubmitHandler<TAssetBase> = (asset) => {
    onSubmit(asset);
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
