import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import TrainSharpIcon from '@mui/icons-material/TrainSharp';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';

interface MenuLinksProps {
  link: string;
  alt: string;
  txt: string;
  children?: JSX.Element;
}

const MenuLinks = (): JSX.Element => {
  const MenuLink = ({ link, txt, children }: MenuLinksProps): JSX.Element => (
    <a
      href={link}
      className="w-32 p-4 flex flex-col items-center justify-center hover:text-blue-300 text-lg cursor-pointer"
    >
      {children}
      {txt}
    </a>
  );

  return (
    <div className="flex items-center justify-center bg-blue-900 rounded-3xl bg-opacity-80 text-white w-auto">
      <MenuLink link="/sbb" alt="sbb icon" txt="Sbb">
        <TrainSharpIcon fontSize="large" />
      </MenuLink>
      <MenuLink link="/" alt="home" txt="Home">
        <HomeIcon fontSize="large" />
      </MenuLink>
      <MenuLink link="/weather" alt="weather icon" txt="Weather">
        <WbSunnySharpIcon fontSize="large" />
      </MenuLink>
    </div>
  );
};

export default MenuLinks;
