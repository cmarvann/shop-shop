import { useReducer } from 'react';

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

  
  export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
       ...state,
       cartOpen: true,
       cart: [...state.cart, action.product]
      };

      // Second test ot pass b
      case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

         // 6th tes to pass 
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map(product => {
            if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
        }
         return product;
      })
      };
         
      // 5th test to pass  b
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
          return product._id !== action._id;
        });
  
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };

      // 7th test to pass  
      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };
      
      // 8th test to pass  
      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
      };

       // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories]
        };
  
        // add 3rd test case 
        case UPDATE_CURRENT_CATEGORY:
        return {
         ...state,
         currentCategory: action.currentCategory
        };

      // if it's none of these actions, do not update state at all and keep things the same!
      default:
        return state;
    }
  };
  
  export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }
  