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

const getTrains = (trains: any, time: string): JSX.Element => {
  return (
    <div className="flex items-center justify-center flex-row">
      {trains.map((train: string, index: number) => {
        return (
          <p className="pr-2 pt-2" key={`train-${train}-time${time}-${index}`}>
            {train}
          </p>
        );
      })}
    </div>
  );
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
          {connectionDepartures.map((connection: any, index: number) => (
            <ExpandableTableRow
              key={connection.sections[index].departure.departure}
              expandComponent={
                <>
                  <TableCell align="left">
                    {connectionDepartures.map(
                      (currentConnection: any, currentIndex: number) => {
                        const departureTime: string = getSbbTime(
                          currentConnection?.sections[currentIndex]?.departure
                            ?.departure || '',
                        );

                        const arrivalTime: string = getSbbTime(
                          currentConnection?.sections[currentIndex]?.arrival
                            ?.arrival || '',
                        );

                        return (
                          <div
                            key={`times-departure-${departureTime}-arrival-${arrivalTime}-${index}`}
                          >
                            <p className="pt-2">{departureTime}</p>
                            <p className="pt-2">{arrivalTime}</p>
                          </div>
                        );
                      },
                    )}
                  </TableCell>

                  <TableCell align="left">
                    {connectionDepartures.map(
                      (currentConnection: any, currentIndex: number) => {
                        const departureStation: string =
                          currentConnection?.sections[currentIndex]?.departure
                            ?.station?.name || '';

                        const arrivalStation: string =
                          currentConnection?.sections[currentIndex]?.arrival
                            ?.station?.name || '';

                        return (
                          <div
                            key={`stations-departure-${departureStation}-arrival-${arrivalStation}-${index}`}
                          >
                            <p className="pt-2">{departureStation}</p>
                            <p className="pt-2">{arrivalStation}</p>
                          </div>
                        );
                      },
                    )}
                  </TableCell>

                  <TableCell align="left">
                    {connectionDepartures.map(
                      (currentConnection: any, currentIndex: number) => {
                        const departurePlatform: string =
                          currentConnection?.sections[currentIndex]?.departure
                            ?.platform || '';

                        const arrivalPlatform: string =
                          currentConnection?.sections[currentIndex]?.arrival
                            ?.platform || '';

                        return (
                          <div
                            key={`${departurePlatform}-${index}-${currentIndex}`}
                          >
                            <p className="pt-2">{departurePlatform}</p>
                            <p className="pt-2">{arrivalPlatform}</p>
                          </div>
                        );
                      },
                    )}
                  </TableCell>
                </>
              }
            >
              <TableCell component="th" scope="row">
                <div className="flex items-start justify-start flex-col">
                  <p>{getSbbTime(connection?.from?.departure)}</p>
                  <p className="pt-2"> {getSbbTime(connection?.to?.arrival)}</p>
                </div>
              </TableCell>
              <TableCell align="right">
                <div className="flex items-start justify-start flex-col">
                  {getJourneyTime(connection?.duration)}
                  {getTrains(connection?.products, connection?.from?.departure)}
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
