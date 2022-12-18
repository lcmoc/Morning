import './styles.css';

import React, { useEffect } from 'react';

import Content from '../Content';
import MenuLinks from './components/MenuLinks';
import classNames from 'classnames';
import { useDoc } from '@syncstate/react';

const Menu = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useDoc('/isMenuOpen');

  const handleClick = (): any => {
    setIsMenuOpen(!isMenuOpen); // eslint-disable-line
  };

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (pressedKey) => pressedKey.keyCode === 27 && handleClick(),
    );
  }, []);

  return (
    <div
      className={
        (isMenuOpen as boolean) ? 'ContentContainer active' : 'ContentContainer'
      }
    >
      <div
        className={classNames('main-container', {
          'overflow-hidden filter blur-sm': isMenuOpen,
        })}
      >
        <div
          className={classNames(
            'main relative origin-left z-10 transition duration-500',
            {
              'cursor-pointer ': isMenuOpen,
            },
          )}
          onClick={() => {
            if (isMenuOpen as boolean) {
              handleClick();
            }
          }}
        >
          <div className="relative w-full min-h-screen">
            <div
              className={classNames('absolute w-full h-auto bg-white', {
                'rounded-xl': isMenuOpen,
              })}
            >
              <Content />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="shadow two absolute w-full h-screen top-0 left-0 rounded-xl bg-blue-900"></div>
          <div className="shadow one absolute w-full h-screen top-0 left-0 rounded-xl bg-blue-800"></div>
        </div>
      </div>
      <div
        className={classNames(
          'fixed bottom-5 w-full z-20 flex items-center justify-center',
          {
            hidden: !isMenuOpen, //eslint-disable-line
          },
        )}
      >
        <MenuLinks />
      </div>
    </div>
  );
};

export default Menu;
