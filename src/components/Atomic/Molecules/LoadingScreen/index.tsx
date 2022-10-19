import { Spinner } from "components/Atomic/Atoms/Spinner";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center content-center">
      <div className="h-1/5 mb-24">
        <Spinner />
      </div>
    </div>
  );
};
