import React from 'react';

import NavBar from './Sections/Navbar/Navbar';
import ListProduct from './Sections/ListProduct/ListProduct';
import BannerHome from './Sections/BannerHome/BannerHome';
import ModalCart from './Sections/ModelCart/ModeCart';

const HomePage = (props) => {
  return (
    <div className='Homepage'>
      <NavBar />

      <BannerHome />
      <ListProduct />
      <ModalCart key='1' />
    </div>
  );
};

export default HomePage;
