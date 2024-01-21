import Navbar from './Navbar'
import { useContext, useEffect } from 'react'
import { MyContext } from '../Context'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import LikeBtn from "./LikeBtn"
import AddToCartBtn from "./AddToCartBtn"

const Men = () => {



  const { allShoes, setSearchQuery } = useContext(MyContext)

  const filteredMaleProduct = allShoes.filter((products) => products.gender.toLowerCase() === "male")


  const [filteredMaleProducts, setFilteredMaleProducts] = useState(filteredMaleProduct)



  const nav = useNavigate()

  const [originalFilteredMaleProducts, setOriginalFilteredMaleProducts] = useState(filteredMaleProduct);

  useEffect(() => {
    setFilteredMaleProducts(originalFilteredMaleProducts);
  }, [originalFilteredMaleProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredMaleResults = originalFilteredMaleProducts.filter((product) => {
      const { title, company, category } = product
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setFilteredMaleProducts(filteredMaleResults)

  };


  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="container">
        {filteredMaleProducts.map((shoe, index) => (

          <li key={index}>


            <div className="wrapper">
              <Link to={`/men/${shoe.id}`} style={{ textDecoration: "none", color: "black" }}>
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

export default Men