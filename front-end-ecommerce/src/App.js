import React, { Component } from 'react';
import Products from './components/Products';
import Checkout from './components/Checkout';
import itemsService from './services/itemsService';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    cart: {},
    items: {},
    mainApplicationError: false,
    transactionInProcess: false
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

  addProductToCartClickHandler = async id => {
    console.log(id);
  };

  incrementCartClickHandler = async id => {
    console.log(id);
  };

  decrementCartClickHandler = async id => {
    console.log(id);
  };

  componentDidMount() {
    this._getAllItems();
    this._restoreCartFromLocalStorageIfExists();
  }

  render() {
    if (this.state.mainApplicationError) return <div>Error Occured</div>;

    let itemsInCart = [];
    Object.values(this.state.items).forEach(item => {
      if (
        this.state.cart &&
        this.state.cart.itemsQuantities &&
        this.state.cart.itemsQuantities[item._id]
      ) {
        itemsInCart.push({
          id: item._id,
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl,
          quantity: this.state.cart.itemsQuantities[item._id],
          inventory: item.inventory,
          description: item.description
        });
      }
    });

    return (
      <BrowserRouter>
        <Navbar itemsInCart={itemsInCart} />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Products
                {...routeProps}
                itemsList={Object.values(this.state.items)}
                transactionInProcess={this.state.transactionInProcess}
                addProductToCartClickHandler={this.addProductToCartClickHandler}
              />
            )}
          />

          <Route
            exact
            path="/checkout"
            render={routeProps => (
              <Checkout
                icrementCartQuantityHandler={this.incrementCartClickHandler}
                decrementCartQuantityHandler={this.decrementCartClickHandler}
                {...routeProps}
                itemsInCart={itemsInCart}
                transactionInProcess={this.state.transactionInProcess}
                addProductToCartClickHandler={this.addProductToCartClickHandler}
                message="Dunia"
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
