import React from 'react';
import { Card, CardImg, Label } from 'reactstrap';
import Img from 'react-image';

export default function CartCard({
  currentQty,
  inventory,
  price,
  itemId,
  title,
  description,
  imageUrl,
  icrementCartQuantityHandler,
  decrementCartQuantityHandler,
  transactionInProcess
}) {
  const renderButtons = () => {
    console.log(inventory);

    let incrementDisabled;
    let decrementDisabled;
    if (transactionInProcess) {
      incrementDisabled = 'disabled';
      decrementDisabled = 'disabled';
    } else {
      incrementDisabled = inventory === 0;
    }

    return (
      <div style={childStyle}>
        <button
          onClick={() => icrementCartQuantityHandler(itemId)}
          className="btn btn-secondary btn-sm"
          disabled={incrementDisabled}
        >
          +
        </button>
        <button
          onClick={() => decrementCartQuantityHandler(itemId)}
          className="btn btn-secondary btn-sm m-2"
          disabled={decrementDisabled}
        >
          -
        </button>
      </div>
    );
  };

  return (
    <div style={parentStyle}>
      <img style={imageStyle} src={imageUrl} />
      <div style={{ ...childStyle, ...contentStyle }}>
        <div style={titleStyle}>{title} </div>
        <div>{description}</div>
      </div>
      {renderButtons()}
      <div style={childStyle}>{currentQty}</div>
      <div style={childStyle}>
        x ${price} = ${price * currentQty}
      </div>
    </div>
  );
}

const titleStyle = {
  fontWeight: 'bold'
};

const imageStyle = {
  maxWidth: '180px'
};

const contentStyle = {
  minWidth: '280px'
};

const parentStyle = {};

const childStyle = {
  display: 'inline-block',
  marginLeft: '10px'
};
