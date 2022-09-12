import React from "react";

interface BoxProps {
  children: React.ReactNode;
}
export const Box: React.FC<BoxProps> = ({ children }) => {
  return (
    <div className="border-slate-400 border-2 rounded-lg w-max m-3 p-5 bg-slate-100">
      {children}
    </div>
  );
};
