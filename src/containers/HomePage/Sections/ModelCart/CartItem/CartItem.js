import React, { useState } from 'react';
import './CartItem.scss';
import { Button } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart } from '../../../../../store/actions/cart';

import * as actions from '../../../../../store/actions/index';
import { connect } from 'react-redux';

const CartItem = (props) => {
  // const dispatch = useDispatch();
  // let initial = props.countqty;
  const [countqty, setCountqty] = useState(props.countqty);

  //this is all i need do in

  return (
    <div>
      <div className='cart-item'>
        <div className='cart-counter--qty'>
          <Button
            className='btn-success'
            type='primary'
            shape='circle'
            onClick={() => setCountqty(countqty - 1)}
          >
            --
          </Button>
          <Button type='primary' className='btn-success' shape='round'>
            {countqty}
          </Button>
          <Button
            className='btn-success'
            type='primary'
            shape='circle'
            onClick={() => setCountqty(countqty + 1)}
          >
            ++
          </Button>
        </div>
        <div className='image-product'>
          <b>{props.name}</b>
          <img src={props.image} alt={props.name} />
        </div>
        <div className='cart-counter-price'>
          <span>
            {props.id}Price: {props.price}$
          </span>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovepro: (productId) => dispatch(actions.removeFromCart(productId)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
