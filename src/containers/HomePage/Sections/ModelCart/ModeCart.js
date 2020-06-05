import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useSelector } from 'react-redux';

import './ModelCart.scss';
import CartItem from './CartItem/CartItem';

const Modalcart = (props) => {
  const [visible, setVisible] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const showModal = () => {
    setVisible(true);
    console.log('cartitem', cartItems);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  const CheckoutHandler = () => {
    console.log('something will be paid');
  };

  let renderitem =
    cartItems.length === 0 ? (
      <div>Cart is empty</div>
    ) : (
      cartItems.map((item, index) => (
        <CartItem
          key={index}
          product={item.product}
          image={item.image}
          name={item.name}
          price={item.price}
          countqty={item.qty}
        />
      ))
    );

  return (
    <div className='modal-cart'>
      <Button onClick={showModal} className='btn-modalcart'>
        Your-Orders
      </Button>
      <Modal
        className='modal-cover'
        title='Your-cart '
        visible={visible}
        onCancel={handleCancel}
      >
        {renderitem}
        <div className='check-out'>
          <Button
            type='primary'
            shape='round'
            onClick={CheckoutHandler}
            className='btn-success'
          >
            Checkout
          </Button>
          <span className='total-price'>
            Total Price: ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default Modalcart;
