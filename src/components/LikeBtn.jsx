import { useContext } from "react"
import { MyContext } from "../Context"
import { useNavigate } from 'react-router-dom'
import './LikeBtn.css'
import { useLocation } from "react-router-dom"


const LikeBtn = ({ shoe }) => {

    const { pathname } = useLocation();

    const { likeProducts, setLikeProducts, isAdmin, isUser } = useContext(MyContext)

    const nav = useNavigate()

    const handleLike = (products) => {
        if (isAdmin || isUser) {
            if (likeProducts.includes(products)) {
                setLikeProducts(likeProducts.filter((shoe) => shoe !== products))
            } else {
                setLikeProducts([...likeProducts, products])
            }
        }
        else {
            alert("Your are not logged in! Please Login to continue")
            nav("/signin")
        }
    }


    const handleUnlike = (product) => {
        setLikeProducts(likeProducts.filter((shoe) => shoe !== product))
    }



    return (
        <div className="likeBtn">

            {pathname !== '/wishlist' ?

                (<button onClick={() => handleLike(shoe)}>
                    {
                        likeProducts.includes(shoe) ? <img src="/like.png" alt="" /> : <img src="/unlike.png" alt="" />
                    }
                </button>) : (
                    <div className="remove">
                        <button onClick={() => handleUnlike(shoe)}>Remove</button>
                    </div>

                )
            }
        </div>

    )
}

export default LikeBtn