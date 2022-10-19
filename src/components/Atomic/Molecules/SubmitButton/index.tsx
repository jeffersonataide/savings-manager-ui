import { Spinner } from "components/Atomic/Atoms/Spinner";

interface SubmitButttonProps {
  isLoading: boolean;
  text: string;
}

export const SubmitButton: React.FC<SubmitButttonProps> = ({
  isLoading,
  text,
}) => {
  if (isLoading) {
    return (
      <button className="bg-gray-50 m-3 p-1 px-5 rounded-lg border-gray-300 border-2 h-12">
        <div className="h-full p-1">
          <Spinner />
        </div>
      </button>
    );
  }
  return (
    <button
      className="bg-white m-3 p-1 px-5 rounded-lg border-cyan-500 border-2 h-12"
      type="submit"
    >
      {text}
    </button>
  );
};
