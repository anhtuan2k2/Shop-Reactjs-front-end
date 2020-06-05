import React, { useState } from 'react';

import { Drawer, Button } from 'antd';
import RightMenu from './Rightmenu/Rightmenu';
import './Navbar.scss';

const NavBar = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawerr = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='navigation'>
      <div className='menu__logo'>
        <a href='/'>Logo</a>
      </div>
      <div className='menu__container'>
        <div className='menu_rigth'>
          <RightMenu mode='horizontal' />
        </div>
        <Button
          className='menu__mobile-button'
          type='primary'
          onClick={showDrawerr}
        >
          =-=
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='right'
          className='menu_drawer'
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode='inline' />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
