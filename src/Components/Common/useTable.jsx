import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";

export default function useTable(records, headCells) {
  const tblContainer = (props) => <Table>{props.children}</Table>;

  const tblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return {
    tblContainer,
    tblHead,
  };
}
