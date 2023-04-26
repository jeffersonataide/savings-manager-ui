import clsx from "clsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface TableColumn {
  className?: string;
  content: React.ReactElement | string | number;
}

export interface TableRow {
  columns: TableColumn[];
  details?: React.ReactElement | string | number | null;
}

interface TableListProps {
  headers: (string | React.ReactElement | number)[];
  rows: TableRow[];
}

export const TableList: React.FC<TableListProps> = ({ headers, rows }) => {
  const bodyContent = rows.map((row) => {
    return (
      <React.Fragment key={uuidv4()}>
        <tr className="bg-slate-600 text-white">
          {row.columns.map((column) => {
            return (
              <td className={clsx("p-3", column.className)} key={uuidv4()}>
                {column.content}
              </td>
            );
          })}
        </tr>
        <tr className={`${row.details ? "" : "hidden"}`}>
          <td colSpan={row.columns.length}>
            <div className="bg-slate-500 rounded-2xl p-5 m-5 mt-0 mb-11">
              {row.details}
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <table className="border-separate border-spacing-y-2 text-xl w-full">
      <thead>
        <tr className="bg-emerald-300 text-white">
          {headers.map((header) => (
            <th className="p-3 uppercase text-left" key={uuidv4()}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{bodyContent}</tbody>
    </table>
  );
};
