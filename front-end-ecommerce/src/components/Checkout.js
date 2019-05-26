import React, { Component } from 'react';
import CartCard from './CartCard';
import orderService from '../services/orderService';

class Checkout extends Component {
  state = {
    emailValid: true,
    email: ''
  };

  validateEmail = value => {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onClickBuy = async e => {
    e.preventDefault();

    if (this.validateEmail(this.state.email)) {
      await this.props.completeBuyingProcess(this.state.email);
      this.props.history.push('/');
    } else {
      this.setState(
        {
          emailValid: false
        },
        () => {
          setTimeout(() => {
            this.setState({
              emailValid: true
            });
          }, 1000);
        }
      );
    }
  };

  getTotalCost = () => {
    return this.props.itemsInCart.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.quantity;
    }, 0);
  };

  renderFooter = () => {
    const sum = this.getTotalCost();
    return (
      <div>
        <div style={totalStyle}>Total: ${sum}</div>

        <form style={formStyle}>
          <div>Buy and send receipt</div>
          <div />
          <label htmlFor="email">Email Address</label>
          {!this.state.emailValid && (
            <div style={validateEmailStyle}>
              Please type the correct email address
            </div>
          )}
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={this.handleEmailChange}
          />
          <button
            type="submit"
            onClick={this.onClickBuy}
            className="btn btn-primary"
          >
            Buy
          </button>
        </form>
      </div>
    );
  };

  renderItemsList = () => {
    return this.props.itemsInCart.map(item => {
      return (
        <CartCard
          key={item.id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          currentQty={item.quantity}
          inventory={item.inventory}
          description={item.description}
          itemId={item.id}
          transactionInProcess={this.props.transactionInProcess}
          icrementCartQuantityHandler={this.props.icrementCartQuantityHandler}
          decrementCartQuantityHandler={this.props.decrementCartQuantityHandler}
        />
      );
    });
  };

  render() {
    if (this.props.itemsInCart.length === 0) return <div>No Items in Cart</div>;

    return (
      <div>
        <div className="container">
          {this.renderItemsList()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default Checkout;

const validateEmailStyle = {
  fontWeight: 'bold',
  color: 'red'
};

const totalStyle = {
  position: 'absolute',
  right: '40%'
};

const formStyle = {
  position: 'relative',
  top: '50px'
};
