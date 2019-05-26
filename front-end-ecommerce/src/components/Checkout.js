import React, { Component } from 'react';
import CartCard from './CartCard';

export default function Checkout({
  itemsInCart,
  transactionInProcess,
  icrementCartQuantityHandler,
  decrementCartQuantityHandler,
  buyHandler
}) {
  const onClickBuy = e => {
    e.preventDefault();
    console.log('hi');
  };

  const getTotalCost = () => {
    return itemsInCart.reduce((acc, currentItem) => {
      return acc + currentItem.price * currentItem.quantity;
    }, 0);
  };

  const renderFooter = () => {
    const sum = getTotalCost();
    return (
      <div>
        <div style={totalStyle}>Total: ${sum}</div>

        <form style={formStyle}>
          <div>Buy and send receipt</div>
          <label htmlFor="email">Email Address</label>
          <input type="email" className="form-control" name="email" />
          <button
            type="submit"
            onClick={onClickBuy}
            className="btn btn-primary"
          >
            Buy
          </button>
        </form>
      </div>
    );
  };

  const renderItemsList = () => {
    return itemsInCart.map(item => {
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
          transactionInProcess={transactionInProcess}
          icrementCartQuantityHandler={icrementCartQuantityHandler}
          decrementCartQuantityHandler={decrementCartQuantityHandler}
        />
      );
    });
  };

  if (itemsInCart.length == 0) return <div>No Items in Cart</div>;

  return (
    <div>
      <div className="container">
        {renderItemsList()}
        {renderFooter()}
      </div>
    </div>
  );
}

const totalStyle = {
  position: 'absolute',
  right: '40%'
};

const formStyle = {
  position: 'relative',
  top: '50px'
};
