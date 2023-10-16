import React, { useState } from "react";
import tableStyles from "./SortableTable.module.scss";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
  const [sortColumn, setSortColumn] = useState(""); // Current sorting column
  const [sortDirection, setSortDirection] = useState("asc"); // Sorting direction: "asc" or "desc"

  const toggleSort = (columnKey: string) => {
    if (columnKey === sortColumn) {
      // If the same column is clicked again, reverse the sorting direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set it as the new sorting column with "asc" direction
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = data.slice().sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      if (aValue < bValue) {
        return -1;
      } else if (aValue > bValue) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (bValue < aValue) {
        return -1;
      } else if (bValue > aValue) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  return (
    <table className={tableStyles.table}>
      <thead>
        <tr className={tableStyles.headings}>
          {headers.map((header) => (
            <th
              className={tableStyles.th}
              key={header.key}
              onClick={() => toggleSort(header.key)}
              style={{ cursor: "pointer" }}
            >
              {header.label}{" "}
              {header.key === sortColumn && sortDirection === "asc" ? "↑" : "↓"}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            {headers.map((header) => (
              <td className={tableStyles.td} key={header.key}>
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
