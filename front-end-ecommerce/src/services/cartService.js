import api from '../api/api';

export default {
  createCart: itemId => {
    const body = JSON.stringify({
      itemId
    });
    return fetch(api + 'carts', {
      method: 'POST',
      body
    });
  }
};
