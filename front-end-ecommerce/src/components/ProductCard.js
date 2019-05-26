import React from 'react';
import { Card, CardBody, Label } from 'reactstrap';
import Button from 'reactstrap-button-loader';

const ProductCard = ({
  title,
  imageUrl,
  price,
  id,
  addProductToCartClickHandler,
  transactionInProcess,
  inventory,
  popUpOnClick
}) => {
  const addToCartOnClick = () => {
    addProductToCartClickHandler(id);
  };

  const popUpOnClickLocal = () => {
    popUpOnClick(id);
  };

  const buttonRendering = () => {
    if (!inventory) {
      return (
        <Button disabled color="secondary" onClick={addToCartOnClick}>
          Out of stock
        </Button>
      );
    }

    if (transactionInProcess) {
      return (
        <Button loading={true} color="primary" onClick={addToCartOnClick}>
          Add to Cart
        </Button>
      );
    }
    return (
      <Button color="primary" onClick={addToCartOnClick}>
        Add to Cart
      </Button>
    );
  };

  const labelStyle = () => {
    return !transactionInProcess
      ? { fontWeight: 'bold', cursor: 'pointer' }
      : { fontWeight: 'bold' };
  };

  const cardImageStyle = () => {
    return !transactionInProcess
      ? { cursor: 'pointer', ...styles.productImage }
      : { ...styles.productImage };
  };

  return (
    <Card style={{ ...styles.productCard }}>
      <img
        src={imageUrl}
        alt="Product Picture"
        onClick={!transactionInProcess ? popUpOnClickLocal : () => {}}
        style={cardImageStyle()}
      />
      <CardBody>
        <Label
          style={labelStyle()}
          onClick={!transactionInProcess ? popUpOnClickLocal : () => {}}
        >
          {title}
        </Label>
        <p>Price: ${price}</p>
        {buttonRendering()}
      </CardBody>
    </Card>
  );
};

const styles = {
  productCard: {
    display: 'inline-block',
    width: '185px'
  },
  productImage: {
    width: '185px',
    height: '230px',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center'
  }
};

export default ProductCard;
