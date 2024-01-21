import Navbar from './Navbar'
import Footer from './Footer'
import { useContext, useEffect } from 'react'
import { MyContext } from '../Context'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LikeBtn from "./LikeBtn"
import AddToCartBtn from "./AddToCartBtn"

const Kids = () => {



  const { allShoes,setSearchQuery} = useContext(MyContext)

  const filteredKidsProduct = allShoes.filter((products) => products.gender.toLowerCase() === "male")


  const [filteredKidsProducts, setFilteredKidsProducts] = useState(filteredKidsProduct)


  const nav = useNavigate()


  const [originalFilteredKidsProducts, setOriginalFilteredKidsProducts] = useState(filteredKidsProduct);

  useEffect(() => {
    setFilteredKidsProducts(originalFilteredKidsProducts);
  }, [originalFilteredKidsProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredKidsResults = originalFilteredKidsProducts.filter((product) => {
      const { title, company, category } = product
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setFilteredKidsProducts(filteredKidsResults)

  };



  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="container">
        {filteredKidsProducts.map((shoe, index) => (

          <li key={index}>
            

              <div className="wrapper">
              <Link to={`/kids/${shoe.id}`} style={{ textDecoration: "none", color: "black" }}>
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

export default Kids