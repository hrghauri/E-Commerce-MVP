import React, { Component } from 'react';
import ProductCart from './components/ProductCard';

import itemsService from './services/itemsService';

class App extends Component {
  state = {
    cart: {},
    items: {},
    mainApplicationError: false
  };

  _restoreCartFromLocalStorageIfExists = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.setState({
        cart: JSON.parse(cart)
      });
    }
  };

  _getAllItems = async () => {
    try {
      const itemsArray = (await itemsService.getAllItems()).items;
      const items = itemsArray.reduce((acc, currentItem) => {
        acc[currentItem._id] = currentItem;
        return acc;
      }, {});
      this.setState({ items });
    } catch (error) {
      console.log(error);
      this.setState({
        mainApplicationError: true
      });
    }
  };

  componentDidMount() {
    this._getAllItems();
    this._restoreCartFromLocalStorageIfExists();
  }

  renderItemsList = () => {
    const itemsList = Object.values(this.state.items);

    return itemsList.map(item => {
      return (
        <ProductCart
          key={item._id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          id={item._id}
        />
      );
    });
  };

  render() {
    if (this.state.mainApplicationError) return <div>Error Occured</div>;

    return <div>{this.renderItemsList()}</div>;
  }
}

export default App;
