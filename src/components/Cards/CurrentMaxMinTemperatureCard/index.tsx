import {
  Card,
  CardActionArea,
  CardProps,
  Typography,
  styled,
} from '@mui/material';

import React from 'react';

interface CurrentTemperatureCardProps {
  minTemp: number;
  maxTemp: number;
  measure: string;
}

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  cursor: 'default',
}));

const CurrentMaxMinTemperatureCard = ({
  minTemp,
  maxTemp,
  measure,
}: CurrentTemperatureCardProps): JSX.Element => {
  return (
    <Card sx={{ maxWidth: 800, minWidth: 300 }}>
      <CardActionArea>
        <StyledCard>
          <Typography variant="h6" color="text.secondary">
            Min - Max Temp
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${minTemp} - ${maxTemp} ${measure}`}
          </Typography>
        </StyledCard>
      </CardActionArea>
    </Card>
  );
};

export default CurrentMaxMinTemperatureCard;
