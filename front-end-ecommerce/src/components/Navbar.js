import React from 'react';
import { Navbar, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Nav_bar({ itemsInCart }) {
  const getCartText = () => {
    const totalItems = itemsInCart.reduce((acc, currentItem) => {
      return acc + currentItem.quantity;
    }, 0);

    return <div>Cart: {totalItems}</div>;
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/">ACME Inventory</Link>
        <Nav className="ml-auto" navbar>
          <Link to="/checkout/">{getCartText()}</Link>
        </Nav>
      </Navbar>
    </div>
  );
}
