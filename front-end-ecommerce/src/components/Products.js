import React from 'react';
import ProductCart from './ProductCard';

const Products = ({
  itemsList,
  addProductToCartClickHandler,
  transactionInProcess,
  popUpOnClick
}) => {
  const renderItemsList = () => {
    return itemsList.map(item => {
      return (
        <ProductCart
          key={item._id}
          title={item.title}
          price={item.price}
          imageUrl={item.imageUrl}
          id={item._id}
          inventory={item.inventory}
          addProductToCartClickHandler={addProductToCartClickHandler}
          transactionInProcess={transactionInProcess}
          popUpOnClick={popUpOnClick}
        />
      );
    });
  };

  return <div className="container">{renderItemsList()}</div>;
};

export default Products;
