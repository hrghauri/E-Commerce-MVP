import React from 'react';
import { Card, CardBody, Button, Label } from 'reactstrap';

const ProductCard = ({ title, imageUrl, price, id }) => {
  const addToCartOnClick = () => {
    console.log(id);
  };

  const popUpOnClick = () => {
    console.log(id);
  };

  return (
    <Card style={{ ...styles.productCard }}>
      <CardBody>
        <Label onClick={popUpOnClick}>{title}</Label>
        <p>{price}</p>
        <Button onClick={addToCartOnClick}>Add to Cart</Button>
      </CardBody>
    </Card>
  );
};

const styles = {
  productCard: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '180px'
  }
};

export default ProductCard;
