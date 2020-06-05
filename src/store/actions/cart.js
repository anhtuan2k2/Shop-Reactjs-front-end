import Axios from 'axios';
import * as actionTypes from './actionTypes';
import Cookie from 'js-cookie';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/api/v1/products/${productId}`
    );

    console.log(data.data.product);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        product: data.data.product._id,
        name: data.data.product.name,
        price: data.data.product.price,
        image: data.data.product.imageCover,
        qty,
      },
    });
    // moi them
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems)); //JSON.stringify(cartItems)
  } catch (error) {}
};
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};
