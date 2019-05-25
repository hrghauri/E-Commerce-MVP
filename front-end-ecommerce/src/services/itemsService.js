import api from '../api/api';

export default {
  getAllItems: () => fetch(api + 'items').then(response => response.json())
};
