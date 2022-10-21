import { useForm } from "react-hook-form";
import { SubmitButton } from "../SubmitButton";

interface DeleteItemFormParams {
  itemName: string;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export const DeleteItemForm: React.FC<DeleteItemFormParams> = ({
  itemName,
  onCancel,
  isLoading,
  onSubmit,
}) => {
  const { handleSubmit: FormsHooksHandleSubmit } = useForm();

  return (
    <div>
      <h2>Are you sure you want to delete the {itemName}?</h2>

      <form
        onSubmit={FormsHooksHandleSubmit(onSubmit)}
        className="flex justify-end space-x-4 mt-3"
      >
        <button
          className="bg-gray-50 my-3 p-1 px-5 rounded-lg border-gray-300 border-2 h-12"
          onClick={onCancel}
        >
          Cancel
        </button>
        <SubmitButton isLoading={isLoading} text="Confirm" />
      </form>
    </div>
  );
};
