import React from 'react';
import {} from 'reactstrap';

const Products = itemsList => {
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
  products: {
    display: 'flex',
    flexDirection: 'row'
  }
};

export default ProductCard;
