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
  alt: string;
}

const HomeCard = ({
  name,
  txt,
  imgSrc,
  path,
  alt,
}: HomeCardProps): JSX.Element => {
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 800 }}>
        <CardActionArea>
          <CardContent>
            <CardMedia
              component="img"
              height="60"
              image={imgSrc}
              alt={alt}
              style={{ width: '40%' }}
            />
          </CardContent>
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
