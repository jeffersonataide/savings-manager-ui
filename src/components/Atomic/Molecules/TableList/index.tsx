import clsx from "clsx";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface TableColumn {
  className?: string;
  content: React.ReactElement | string;
}

export type TableRow = TableColumn[];

interface TableListProps {
  headers: string[];
  rows: TableRow[];
}

export const TableList: React.FC<TableListProps> = ({ headers, rows }) => {
  return (
    <table className="border-separate border-spacing-y-2 text-2xl w-full">
      <thead>
        <tr className="bg-emerald-300 text-white">
          {headers.map((header) => (
            <th className="p-3 uppercase text-left" key={uuidv4()}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => {
          return (
            <tr className="bg-slate-600 text-white" key={uuidv4()}>
              {row.map((column) => {
                return (
                  <td className={clsx("p-3", column.className)} key={uuidv4()}>
                    {column.content}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
