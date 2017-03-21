import * as types from './mutations';

var const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
};

export default {
	addToCart: addToCart
};