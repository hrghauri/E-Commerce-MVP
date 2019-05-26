import api from '../api/api';

export default {
  createCart: async itemId => {
    const body = JSON.stringify({
      itemId
    });
    return fetch(api + 'carts', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  },
  getCartById: cartId =>
    fetch(api + 'carts/' + cartId).then(response => response.json()),
  addToCart: async (cartId, itemId) => {
    const body = JSON.stringify({
      itemId
    });
    console.log(body);

    return await fetch(api + 'carts/' + cartId, {
      method: 'PATCH',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }
};
