import * as React from 'react';

import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export interface HomeCardProps {
  name: string;
  txt: string;
  imgSrc: string;
  path: string;
}

const HomeCard = ({ name, txt, imgSrc, path }: HomeCardProps): JSX.Element => {
  return (
    <Link href={path}>
      <Card sx={{ maxWidth: 800 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imgSrc}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {txt}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default HomeCard;
