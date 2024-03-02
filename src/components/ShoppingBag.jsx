import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../Context';
import Navbar from './Navbar';
import './ShoppingBag.css';
import { Link } from 'react-router-dom'
import AddToCartBtn from './AddToCartBtn';

const ShoppingBag = () => {
  const { addToCart, setAddToCart, setSearchQuery } = useContext(MyContext);

  const [originalCartProducts, setOriginalCartProducts] = useState(addToCart);

  useEffect(() => {
    setAddToCart(originalCartProducts);
  }, [originalCartProducts]);


  const handleQuantityChange = (shoe, newQuantity) => {
    const updatedCart = addToCart.map((item) => {
      if (item === shoe) {
        item.quantity = newQuantity;
      }
      return item;
    });
  
    setAddToCart(updatedCart);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredCartResults = originalCartProducts.filter((product) => {
      const { title, company, category } = product;
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      );
    });
    setAddToCart(filteredCartResults);
  };



  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="shoppingbag">
        <div className="container2">
          {addToCart.length === 0 ? (
            <p style={{ width: '100%', height: '70vh', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
              Your shopping bag is empty
            </p>
          ) : (
            addToCart.map((shoe, index) => (
              <li key={index} style={{ listStyle: 'none' }}>
                <div className="wrapper2">
                  <Link to={`/shoppingbag/${shoe.id}`} style={{ textDecoration: "none", color: "black" }}>
                    <div className="wrapper-img">
                      <img src={shoe.img} alt="img" />
                    </div>
                    <div className="text">
                      <p>{shoe.title}</p>
                      <p>{shoe.company}</p>
                      <p>{shoe.category}</p>
                      <p>{shoe.newPrice}</p>
                    </div>
                  </Link>
                  <div className="quantity">
                    <h4>Quantity :</h4>
                    <button onClick={() => handleQuantityChange(shoe, Math.max((shoe.quantity || 1) - 1, 1))}>-</button>
                    <span>{shoe.quantity || 1}</span>
                    <button onClick={() => handleQuantityChange(shoe, (shoe.quantity || 1) + 1)}>+</button>
                  </div>
                  <div className="removBtn">
                    <AddToCartBtn shoe={shoe} />
                  </div>
                </div>
              </li>
            ))
          )}
        </div>

        {addToCart.length !== 0 && <div className="sidebar">
          <div className="cartinfo">
            <h2>Cart Details</h2>
            <div className="cartitems">
              <ol>
                <table>
                  {addToCart.map((shoe) => (
                    <tbody key={shoe.title}>
                      <tr>
                        <td>
                          <li>{shoe.title}</li>
                        </td>
                        <td>
                          <div>x {shoe.quantity || 1}</div>
                        </td>
                        <td>
                          <div>₹. {shoe.newPrice * (shoe.quantity || 1)}</div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </ol>
            </div>
            <div className="totalprice">
              <h1>Total: ₹{addToCart.reduce((prev, current) => prev + current.newPrice * (current.quantity || 1), 0)}</h1>
              <button>CheckOut</button>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
};

export default ShoppingBag;
