import { TableCell, TableRow } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { uid } from 'react-uid';

type Props = {
  row: string[];
};

export const CustomTableRow: FunctionComponent<Props> = ({ row }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {row.map((column, index) => (
        <TableCell align='center' key={uid(column, index)}>
          {column}
        </TableCell>
      ))}
    </TableRow>
  );
};
