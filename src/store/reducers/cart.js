import * as actionTypes from '../actions/actionTypes';
// import { updateObject } from '../../shared/utility';

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
  //   shipping: {},
  //   payment: {},
};

// const addtocart = (state, action) => {
//   return updateObject(state, { error: null, loading: false });
// };
// const removefromcart = (state, action) => {
//   return updateObject(state, { error: null, loading: false });
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case actionTypes.REMOVE_FROM_CART:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
