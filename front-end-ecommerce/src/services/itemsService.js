import api from '../api/api';

export default {
  getAllItems: () => fetch(api + 'items').then(response => response.json()),
  getAnItem: id => fetch(api + 'items/' + id).then(response => response.json())
};
