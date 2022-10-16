interface DeleteItemFormParams {
  itemName: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export const DeleteItemForm: React.FC<DeleteItemFormParams> = ({
  itemName,
  onSubmit,
  onCancel,
}) => {
  return (
    <div>
      <h2>Are you sure you want to delete the {itemName}?</h2>

      <div className="flex justify-end space-x-4 mt-3">
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          onClick={onSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
