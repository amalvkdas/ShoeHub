import Navbar from './Navbar'
import './ShoeProductPage.css'
import Footer from './Footer'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import LikeBtn from "./LikeBtn"
import AddToCartBtn from "./AddToCartBtn"

const ShoeProductPage = () => {
  const { productId } = useParams();
  const nav = useNavigate()



  const { allShoes } = useContext(MyContext)



  const clickedProduct = [...allShoes.filter((shoe) => shoe.id === productId)]


  return (
    <>
      <Navbar />
      {clickedProduct.map((shoe, index) =>
        <div className="productPage" key={index}>
          <div className="productImg" >
            <div className="wrapper-img">
              <img src={shoe.img} alt="img" />
            </div>
          </div>
          <div className="productDetails">
            <h1>{shoe.title}</h1>
            <div className="toflex" style={{ display: "flex" }}>
              <h2>{`M.R.P ₹${shoe.newPrice}`}</h2>
              <p style={{ marginLeft: "10px" }}>inclusive of all Taxes</p>
            </div>
            <h4>{shoe.category}</h4>
            <div className="productDetailsBtns">
              <div className="btns1">
                <LikeBtn shoe={shoe} />
                <AddToCartBtn shoe={shoe} />
              </div>
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