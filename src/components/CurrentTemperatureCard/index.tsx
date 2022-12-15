import {
  Card,
  CardActionArea,
  CardProps,
  Typography,
  styled,
} from '@mui/material';

import React from 'react';

interface CurrentTemperatureCardProps {
  temperature: number;
  time: string;
  measure: string;
}

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  cursor: 'default',
}));

const CurrentTemperatureCard = ({
  temperature,
  time,
  measure,
}: CurrentTemperatureCardProps): JSX.Element => {
  const currentHour = time.split('T').splice(1)[0];
  const nextHour = parseInt(currentHour) + 1;

  console.log('nextHour', nextHour); // eslint-disable-line

  return (
    <Card sx={{ maxWidth: 800, minWidth: 300 }}>
      <CardActionArea>
        <StyledCard>
          <Typography variant="h6" color="text.secondary">
            {currentHour} - {`${nextHour}:00`}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${temperature} ${measure}`}
          </Typography>
        </StyledCard>
      </CardActionArea>
    </Card>
  );
};

export default CurrentTemperatureCard;
