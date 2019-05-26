import React from 'react';
import { Card, CardBody, Label, CardImg } from 'reactstrap';
import Button from 'reactstrap-button-loader';

const ProductCard = ({
  title,
  imageUrl,
  price,
  id,
  addProductToCartClickHandler,
  transactionInProcess,
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
    return !transactionInProcess ? { cursor: 'pointer' } : {};
  };

  return (
    <Card style={{ ...styles.productCard }}>
      <CardImg
        top
        width="100%"
        src={imageUrl}
        alt="Product Picture"
        onClick={!transactionInProcess ? popUpOnClick : () => {}}
        style={cardImageStyle()}
      />
      <CardBody>
        <Label
          style={labelStyle()}
          onClick={!transactionInProcess ? popUpOnClick : () => {}}
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
    maxWidth: '200px'
  }
};

export default ProductCard;
