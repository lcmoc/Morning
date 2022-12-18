import {
  Card,
  CardActionArea,
  CardProps,
  Typography,
  styled,
} from '@mui/material';

import React from 'react';

interface CurrentTemperatureCardProps {
  sunrise: string;
  sunset: string;
}

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  cursor: 'default',
}));

const CurrentSunriseCard = ({
  sunrise,
  sunset,
}: CurrentTemperatureCardProps): JSX.Element => {
  return (
    <Card sx={{ maxWidth: 800, minWidth: 300 }}>
      <CardActionArea>
        <StyledCard>
          <Typography variant="h6" color="text.secondary">
            Sonnen auf und Untergang
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${sunrise} - ${sunset}`}
          </Typography>
        </StyledCard>
      </CardActionArea>
    </Card>
  );
};

export default CurrentSunriseCard;
