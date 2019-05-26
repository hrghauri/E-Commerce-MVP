import React from 'react';
import { Card, CardBody, Label } from 'reactstrap';
import Button from 'reactstrap-button-loader';

const ProductCard = ({
  title,
  imageUrl,
  price,
  id,
  addProductToCartClickHandler,
  transactionInProgress,
  inventory
}) => {
  const addToCartOnClick = () => {
    addProductToCartClickHandler(id);
  };

  const popUpOnClick = () => {
    console.log(id);
  };

  const buttonRendering = () => {
    if (!inventory) {
      return (
        <Button disabled color="secondary" onClick={addToCartOnClick}>
          Out of stock
        </Button>
      );
    }

    if (transactionInProgress) {
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

  return (
    <Card style={{ ...styles.productCard }}>
      <CardBody>
        <Label onClick={popUpOnClick}>{title}</Label>
        <p>Price: ${price}</p>
        {buttonRendering()}
      </CardBody>
    </Card>
  );
};

const styles = {
  productCard: {
    display: 'inline-block',
    maxWidth: '200px'
  }
};

export default ProductCard;
