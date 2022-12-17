import HomePng from '../../../../assets/home.png';
import React from 'react';
import SbbPng from '../../../../assets/u-bahn.png';
import WeatherPng from '../../../../assets/weather.png';

interface MenuLinksProps {
  link: string;
  src: string;
  alt: string;
  txt: string;
}

const MenuLinks = (): JSX.Element => {
  const Icon = ({ link, src, alt, txt }: MenuLinksProps): JSX.Element => (
    <a
      href={link}
      className="w-32 p-4 flex flex-col items-center justify-center hover:text-blue-300 text-lg cursor-pointer"
    >
      <img className="h-10 w-auto self-center" src={src} alt={alt} />
      {txt}
    </a>
  );

  return (
    <div className="flex items-center justify-center bg-blue-900 rounded-3xl bg-opacity-80 text-white w-auto">
      <Icon link="/sbb" src={SbbPng} alt="sbb icon" txt="Sbb" />
      <Icon link="/" src={HomePng} alt="home" txt="Home" />
      <Icon link="/weather" src={WeatherPng} alt="weather icon" txt="Weather" />
    </div>
  );
};

export default MenuLinks;
