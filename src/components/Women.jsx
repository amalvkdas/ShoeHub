import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'
import { MyContext } from '../Context'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

const Women = () => {



  const { allShoes, likeProducts, addToCart, setLikeProducts, setAddToCart, setSearchQuery,isAdmin,isUser } = useContext(MyContext)

  const filteredFemaleProduct = allShoes.filter((products) => products.gender.toLowerCase() === "female")


  const [filteredFemaleProducts, setFilteredFemaleProducts] = useState(filteredFemaleProduct)

  const nav = useNavigate()


  const [originalFilteredFemaleProducts, setOriginalFilteredFemaleProducts] = useState(filteredFemaleProduct);

  useEffect(() => {
    setFilteredFemaleProducts(originalFilteredFemaleProducts);
  }, [originalFilteredFemaleProducts]);


  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredFemaleResults = originalFilteredFemaleProducts.filter((product) => {
      const { title, company, category } = product
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setFilteredFemaleProducts(filteredFemaleResults)

  };



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
      <Navbar onSearch={handleSearch} />

      <div className="container">
        {filteredFemaleProducts.map((shoe, index) => (

          <li key={index}>
            

            <div className="wrapper">
            <Link to={`/women/${shoe.id}`} style={{textDecoration:"none",color:"black"}}>
              <img src={shoe.img} alt="img" />
              <div className="text">
                <p>{shoe.title}</p>
                <p>{shoe.company}</p>
                <p>{shoe.category}</p>
                <p>{shoe.newPrice}</p>
              </div>
              </Link>
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

            </div>
         

          </li>
        ))}
      </div>


<Footer/>
    </>
  )
}

export default Women