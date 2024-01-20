import Navbar from './Navbar'
import { useContext, useEffect } from 'react'
import { MyContext } from '../Context'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Men = () => {



  const { allShoes, likeProducts, addToCart, setLikeProducts, setAddToCart, setSearchQuery,isAdmin,isUser } = useContext(MyContext)

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
        {filteredMaleProducts.map((shoe, index) => (

          <li key={index}>
            

              <div className="wrapper">
              <Link to={`/men/${shoe.id}`} style={{ textDecoration: "none", color: "black" }}>
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


      <Footer />
    </>
  )
}

export default Men