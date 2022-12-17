import './styles.css';

import React, { useEffect, useState } from 'react';

import Content from '../../components/Content';
import MenuLinks from './components/MenuLinks';
import classNames from 'classnames';

const Menu = (): JSX.Element => {
  const [active, setActive] = useState(false);

  const handleClick = (): any => {
    active ? setActive(false) : setActive(true);
  };

  useEffect(() => {
    window.addEventListener(
      'keydown',
      (pressedKey) => pressedKey.keyCode === 27 && handleClick(),
    );
  }, []);

  return (
    <div className={active ? 'ContentContainer active' : 'ContentContainer'}>
      <div
        className={classNames('main-container', {
          'overflow-hidden filter blur-sm': active,
        })}
      >
        <div
          className={classNames(
            'main relative origin-left z-10 transition duration-500',
            {
              'cursor-pointer ': active,
            },
          )}
          onClick={() => {
            if (active) {
              handleClick();
            }
          }}
        >
          <div className="relative w-full min-h-screen">
            <div
              className={classNames('absolute w-full h-auto bg-white', {
                'rounded-xl': active,
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
            hidden: !active,
          },
        )}
      >
        <MenuLinks />
      </div>
    </div>
  );
};

export default Menu;
