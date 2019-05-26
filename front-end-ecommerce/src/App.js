import React, { Component } from 'react';
import Products from './components/Products';
import Checkout from './components/Checkout';
import itemsService from './services/itemsService';
import cartService from './services/cartService';
import orderService from './services/orderService';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

class App extends Component {
  state = {
    cart: {},
    items: {},
    mainApplicationError: false,
    transactionInProcess: false
  };

  _restoreCartFromLocalStorageIfExists = async () => {
    let cartId = localStorage.getItem('cartId');

    try {
      if (cartId) {
        const result = await cartService.getCartById(cartId);
        const cart = result.cart;

        this.setState({
          cart
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        mainApplicationError: true
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

  addProductToCartClickHandler = itemId => {
    let cartId = localStorage.getItem('cartId');
    this.setState(
      {
        transactionInProcess: true
      },
      async () => {
        try {
          let result;
          if (cartId) result = await cartService.addToCart(cartId, itemId);
          else result = await cartService.createCart(itemId);
          const cart = result.cart;
          localStorage.setItem('cartId', cart._id);
          this.setState({
            cart,
            transactionInProcess: false
          });
        } catch (error) {
          console.log(error);
          this.setState({
            transactionInProcess: false
          });
        }
      }
    );
  };

  removeProductFromCartClickHandler = itemId => {
    let cartId = localStorage.getItem('cartId');
    this.setState(
      {
        transactionInProcess: true
      },
      async () => {
        try {
          const result = await cartService.removeProductFromCart(
            cartId,
            itemId
          );
          const cart = result.cart;
          localStorage.setItem('cartId', cart._id);
          this.setState({
            cart,
            transactionInProcess: false
          });
        } catch (error) {
          console.log(error);
          this.setState({
            transactionInProcess: false
          });
        }
      }
    );
  };

  completeBuyingProcess = async email => {
    try {
      await orderService.createOrder(
        localStorage.getItem('cartId'),
        email,
        Date()
      );
      localStorage.clear();
      this._getAllItems();
      this.setState({ cart: {} });
    } catch (error) {
      console.log(error);
    }
  };

  incrementCartClickHandler = itemId => {
    this.addProductToCartClickHandler(itemId);
  };

  decrementCartClickHandler = itemId => {
    this.removeProductFromCartClickHandler(itemId);
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
                completeBuyingProcess={this.completeBuyingProcess}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
