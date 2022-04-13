import React, { FunctionComponent } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CustomTableRow } from './CustomTableRow';
import Paper from '@mui/material/Paper';
// import { uid } from 'react-uid';
import uuid from 'react-uuid';
import { RowCommand } from './TableRowOptions';

type Props = {
  tableHead: string[];
  tableRows: (string | Element)[][];
  onRowCommand: (command: RowCommand, row: string[]) => void;
};

export const CustomTable: FunctionComponent<Props> = ({
  tableHead,
  tableRows,
  onRowCommand,
}) => {
  return (
    <TableContainer component={Paper} sx={{ height: '100%' }}>
      <Table sx={{ minWidth: 650, height: '100%' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableHead.map((column, index) => (
              <TableCell align='center' key={uuid()}>
                <b>{column}</b>
              </TableCell>
            ))}
            {/* <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, index) => (
            <CustomTableRow row={row} key={index} onRowCommand={onRowCommand} />
            // <TableRow
            //   key={index}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            //   {row.map((column, index) => (
            //     <TableCell align='center' key={uid(column, index)}>
            //       {column}
            //     </TableCell>
            //   ))}
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
