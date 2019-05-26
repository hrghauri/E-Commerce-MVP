import api from '../api/api';

export default {
  createOrder: (cartId, customerEmail, clientTime) => {
    const body = JSON.stringify({
      cartId,
      customerEmail,
      clientTime
    });
    return fetch(api + 'orders', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  }
};
