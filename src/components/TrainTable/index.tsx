import React, { useId } from 'react';
import { getJourneyTime, getSbbTime } from '../../components/Helpers';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material//KeyboardArrowUp';
import Paper from '@mui/material/Paper';
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
      <p className="pr-2 pt-2">Verbindungen:</p>
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

const DEPARTURE: string = 'Abfahrt:';
const ARRIVAL: string = 'Ankunft:';

const TrainTable = ({ connectionDepartures }: TrainTableProps): JSX.Element => {
  return (
    <Paper
      className="Tablesbb"
      sx={{ Width: { lg: '100%' } }}
      style={{ width: '100%', overflowX: 'auto' }}
    >
      <Table
        className="Tablesbb"
        style={{
          minWidth: '100%',
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
              key={`${
                connection.sections[index]?.from?.departureTimestamp as string
              }-${useId()}`}
              expandComponent={
                <>
                  <TableCell align="left">
                    {connection?.sections.map((section: any) => {
                      const departureTime: string = getSbbTime(
                        section?.departure?.departure || '',
                      );

                      const arrivalTime: string = getSbbTime(
                        section?.arrival?.arrival || '',
                      );

                      const haveToWalk: boolean = section?.walk;
                      const walkTime: number =
                        haveToWalk && section.walk.duration;
                      const minutes = Math.floor(walkTime / 60);

                      return (
                        <div
                          key={`times-departure-${departureTime}-${useId()}`}
                        >
                          <p className="pt-2">
                            {`${!haveToWalk ? DEPARTURE : 'Laufen'} ${
                              !haveToWalk ? departureTime : `${minutes} min`
                            }`}
                          </p>
                          <p>
                            {ARRIVAL} {arrivalTime}
                          </p>
                        </div>
                      );
                    })}
                  </TableCell>

                  <TableCell align="left">
                    {connection?.sections.map((section: any) => {
                      const departureStation: string =
                        section?.departure?.station?.name || '';

                      const arrivalStation: string =
                        section?.arrival?.station?.name || '';

                      return (
                        <div
                          key={`stations-departure-${departureStation}-${useId()}`}
                        >
                          <p className="pt-2">{departureStation}</p>
                          <p>{arrivalStation}</p>
                        </div>
                      );
                    })}
                  </TableCell>

                  <TableCell align="left">
                    {connection?.sections.map((section: any) => {
                      const departurePlatform: string =
                        section?.departure?.platform || '1';

                      const arrivalPlatform: string =
                        section?.arrival?.platform || '1';

                      return (
                        <div key={`${departurePlatform}-${useId()}`}>
                          <p className="pt-2">Gleis {departurePlatform}</p>
                          <p>Gleis {arrivalPlatform}</p>
                        </div>
                      );
                    })}
                  </TableCell>
                </>
              }
            >
              <TableCell component="th" scope="row">
                <div className="flex items-start justify-start flex-col">
                  <p>
                    {DEPARTURE} {getSbbTime(connection?.from?.departure)}
                  </p>
                  <p className="pt-2">
                    {ARRIVAL} {getSbbTime(connection?.to?.arrival)}
                  </p>
                </div>
              </TableCell>
              <TableCell align="right">
                <div className="flex items-start justify-start flex-col">
                  Dauer: {getJourneyTime(connection?.duration)} h
                  {getTrains(connection?.products, connection?.from?.departure)}
                </div>
              </TableCell>
              <TableCell align="left">
                Gleis {connection?.from?.platform || '1'}
              </TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TrainTable;
