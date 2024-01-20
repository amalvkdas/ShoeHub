import React, { useState } from 'react'
import Navbar from './Navbar'
import './ShoeProductPage.css'
import Footer from './Footer'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const ShoeProductPage = () => {
  const { category,productId } = useParams();
  const nav = useNavigate()



  const { allShoes, likeProducts, addToCart, setLikeProducts, setAddToCart,isAdmin,isUser } = useContext(MyContext)



const clickedProduct = [...allShoes.filter((shoe) => shoe.id === productId)]


  const handleLike = (products) => {
    if(isAdmin || isUser){
    if (likeProducts.includes(products)) {
      setLikeProducts(likeProducts.filter((shoe) => shoe !== products))
    } else {
      setLikeProducts([...likeProducts, products])
    }
  }
  else{
    alert("Your are not logged in! Please Login to continue")
    nav("/signin")
  }
  }

  const handleCart = (product) => {
    if(isAdmin || isUser){
    if (addToCart.includes(product)) {
    }
    else {
      setAddToCart([...addToCart, product])
    }
  }
  else{
    alert("Your are not logged in! Please Login to continue")
    nav("/signin")
  }

  }


  return (
    <>
      <Navbar />
      {clickedProduct.map((shoe, index) =>
        <div className="productPage" key={index}>
          <div className="productImg" >
            <img src={shoe.img} alt="" />
          </div>
          <div className="productDetails">
            <h1>{shoe.title}</h1>
            <div className="toflex" style={{ display: "flex" }}>
              <h2>{`M.R.P ₹${shoe.newPrice}`}</h2>
              <p style={{ marginLeft: "10px" }}>inclusive of all Taxes</p>
            </div>
            <h4>{shoe.category}</h4>
            <div className="productDetailsBtns">
              <button onClick={() => handleLike(shoe)} className="btn1">
                {
                  likeProducts.includes(shoe) ? "unlike" : "like"
                }
              </button>
              <button onClick={() => handleCart(shoe)} className="btn2">
                {
                  addToCart.includes(shoe) ? "Added to Cart" : "Add to Cart"
                }
              </button>
              <div className="buynow">
                <button>Buy Now</button>
              </div>
            </div>



          </div>

        </div>
      )}



      <Footer />
    </>

  )
}

export default ShoeProductPage