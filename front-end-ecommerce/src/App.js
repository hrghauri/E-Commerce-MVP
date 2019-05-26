import React, { Component } from 'react';
import Products from './components/Products';
import Checkout from './components/Checkout';
import itemsService from './services/itemsService';
import cartService from './services/cartService';
import orderService from './services/orderService';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
  state = {
    cart: {},
    items: {},
    mainApplicationError: false,
    transactionInProcess: false,
    modal: false,
    modalItemId: ''
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState
    }));
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
    console.log('m called');

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
          let items = this.state.items;
          items[itemId].inventory--;
          this.setState({
            items,
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
          let items = this.state.items;
          items[itemId].inventory++;
          this.setState({
            items,
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
    const setStateAsync = updater =>
      new Promise(resolve => this.setState(updater, resolve));

    try {
      await setStateAsync({ transactionInProcess: true });
      await orderService.createOrder(
        localStorage.getItem('cartId'),
        email,
        Date()
      );
      localStorage.clear();
      this._getAllItems();
      await setStateAsync({ transactionInProcess: false, cart: {} });
    } catch (error) {
      await setStateAsync({ transactionInProcess: false });
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

  popUpOnClick = itemId => {
    this.setState({
      modal: true,
      modalItemId: itemId
    });
  };

  modalAddToCartClick = () => {
    this.toggleModal();
    this.addProductToCartClickHandler(this.state.modalItemId);
  };

  renderModal = () => {
    if (!this.state.items[this.state.modalItemId]) return <div />;

    const item = this.state.items[this.state.modalItemId];

    const productImageStyle = {
      width: '185px',
      height: '230px',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      justifyContent: 'center'
    };

    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggleModal}
            cssModule={{ 'modal-title': 'w-100 text-center' }}
          >
            {item.title}
          </ModalHeader>
          <img
            src={item.imageUrl}
            style={productImageStyle}
            alt="Product Picture"
          />
          <ModalBody>{item.description}</ModalBody>
          <ModalFooter>
            <p style={{ position: 'relative', right: '200px' }}>
              Price: ${item.price}
            </p>
            {item.inventory > 0 && (
              <Button color="primary" onClick={this.modalAddToCartClick}>
                Add To Cart
              </Button>
            )}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

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
        {this.renderModal()}
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
                popUpOnClick={this.popUpOnClick}
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
