import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'
import { MyContext } from '../Context'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import LikeBtn from "./LikeBtn"
import AddToCartBtn from "./AddToCartBtn"

const Women = () => {



  const { allShoes, setSearchQuery } = useContext(MyContext)

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


  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="container">
        {filteredFemaleProducts.map((shoe, index) => (

          <li key={index}>


            <div className="wrapper">
              <Link to={`/women/${shoe.id}`} style={{ textDecoration: "none", color: "black" }}>
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
              <div className="btns">
                <LikeBtn shoe={shoe} />
                <AddToCartBtn shoe={shoe} />
              </div>
            </div>


          </li>
        ))}
      </div>


      <Footer />
    </>
  )
}

export default Women