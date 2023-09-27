import React from "react";
import tableStyles from "./SortableTable.module.scss";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
  <table className={tableStyles.table}>
    <thead>
      <tr className={tableStyles.headings}>
        {headers.map((header) => (
          <th className={tableStyles.th} key={header.key}>{header.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {headers.map((header) => (
            <td className={tableStyles.td} key={header.key}>{row[header.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default SortableTable;
