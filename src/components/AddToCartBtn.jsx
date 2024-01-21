import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { MyContext } from "../Context"
import './AddToCart.css'
import {useLocation} from "react-router-dom"

const AddToCartBtn = ({ shoe }) => {

  const {pathname} =  useLocation();

  const { addToCart, setAddToCart, isAdmin, isUser } = useContext(MyContext)


  const nav = useNavigate()

  const handleCart = (product) => {
    if (isAdmin || isUser) {
      if (addToCart.includes(product)) {
      }
      else {
        setAddToCart([...addToCart, product])
      }
    }
    else {
      alert("Your are not logged in! Please Login to continue")
      nav("/signin")
    }

  }



  const handleRemove = (product) => {
    setAddToCart(addToCart.filter((shoe) => shoe !== product));
  };

  

  return (
    <div className="unlikeBtn">
      {
        pathname !== '/shoppingbag' ? (
      <button onClick={() => handleCart(shoe)}>
        {
          addToCart.includes(shoe) ? "Added to Cart" : "Add to Cart"
        }
      </button>
        ):(
          <button onClick={() => handleRemove(shoe)}>Remove</button>
        )
}
    </div>

  )
}

export default AddToCartBtn