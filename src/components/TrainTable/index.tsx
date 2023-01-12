import { getJourneyTime, getSbbTime } from '../../components/Helpers';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material//KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface ExpandableTableRowTypes {
  children: any;
  expandComponent: any;
}

const ExpandableTableRow = ({
  children,
  expandComponent,
  ...otherProps
}: ExpandableTableRowTypes): JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

interface TrainTableProps {
  connectionDepartures: any;
}

const getTrains = (trains: any): JSX.Element => {
  return <div className='flex items-center justify-center flex-row'>{ trains.map((train: any, index: number) => <p className='pr-2 pt-2' key={`train-${train}-${index}`}>{train}</p>)}</div>; // eslint-disable-line
};

const TrainTable = ({ connectionDepartures }: TrainTableProps): JSX.Element => {
  return (
    <Paper style={{ width: '100%', overflowX: 'auto' }}>
      <Table
        style={{
          minWidth: 650,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>Zeit</TableCell>
            <TableCell align="left">Reise</TableCell>
            <TableCell align="left">Platform</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {connectionDepartures.map((connection: any) => (
            <ExpandableTableRow
              key={connection.from.departure}
              expandComponent={
                <TableCell colSpan={5}>
                  {getSbbTime(connection.from.departure)}
                </TableCell>
              }
            >
              <TableCell component="th" scope="row">
                <div className="flex items-start justify-start flex-col">
                  <p>{getSbbTime(connection.from.departure)}</p>
                  <p className="pt-2"> {getSbbTime(connection.to.arrival)}</p>
                </div>
              </TableCell>
              <TableCell align="right">
                <div className="flex items-start justify-start flex-col">
                  {getJourneyTime(connection.duration)}
                  {getTrains(connection.products)}
                </div>
              </TableCell>
              <TableCell align="right">{connection?.from?.platform}</TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TrainTable;