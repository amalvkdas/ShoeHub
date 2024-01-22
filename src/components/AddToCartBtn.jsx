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
    <div className="addToCart">
      {
        pathname !== '/shoppingbag' ? (
      <button onClick={() => handleCart(shoe)}>
        {
          addToCart.includes(shoe) ? <img src="/addedToCart.png" alt="Added to Cart" /> : <img src="/addToCart.png" alt="Add to Cart" />
        }
      </button>
        ):(
          <div className="remove">
          <button onClick={() => handleRemove(shoe)}>Remove</button>
          </div>
        )
}
    </div>

  )
}

export default AddToCartBtn