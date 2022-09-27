import { ChangeEventHandler, useState } from "react";
import { TAssetBase } from "../../../../services/api/assets";

interface AssetFormParams {
  initialData?: TAssetBase;
  submitButtonText: string;
  onSubmit: (asset: TAssetBase) => void;
}

const ASSET_INITIAL = { name: "" };

export const AssetForm = ({
  initialData = ASSET_INITIAL,
  submitButtonText,
  onSubmit,
}: AssetFormParams) => {
  const [asset, setAsset] = useState<TAssetBase>(initialData);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAsset({ ...asset, name: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(asset);
    setAsset(initialData);
  };

  return (
    <div>
      <div className="my-3 flex items-center">
        <label>Name:</label>
        <input
          className="rounded-lg ml-3 p-2 flex-grow border-slate-400 border-2"
          type="text"
          value={asset.name}
          onChange={onNameChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-slate-100 my-3 p-1 px-5 rounded-2xl border-slate-500 border-2"
          onClick={handleSubmit}
        >
          {submitButtonText}
        </button>
      </div>
    </div>
  );
};
