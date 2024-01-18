import Navbar from './Navbar'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { useState } from 'react'
import { useEffect } from 'react'

const Wishlist = () => {

  const { likeProducts, setLikeProducts,setSearchQuery } = useContext(MyContext)

  const handleUnlike = (product) => {
    setLikeProducts(likeProducts.filter((shoe) => shoe !== product))
  }


  const [originalWishlistProducts, setOriginalWishlistProducts] = useState(likeProducts);

  useEffect(() => {
    setLikeProducts(originalWishlistProducts);
  }, [originalWishlistProducts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredWishlistResults = originalWishlistProducts.filter((product) => {
      const { title, company, category } = product
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          category.toLowerCase().includes(query.toLowerCase())
      )
    })
    setLikeProducts(filteredWishlistResults)

  };








  return (
    <>
      <Navbar onSearch={handleSearch}/>


      <div className="container">

        {likeProducts.length === 0 ? (
          <p style={{width:"100%",height:"70vh",justifyContent:"center",display:"flex",alignItems:"center"}} >Your wishlist is empty</p>
        ) : (


          likeProducts.map((shoe, index) => (

            <li key={index}>

              <div className="wrapper">
                <img src={shoe.img} alt="img" />
                <div className="text">
                  <p>{shoe.title}</p>
                  <p>{shoe.company}</p>
                  <p>{shoe.category}</p>
                  <p>{shoe.newPrice}</p>
                </div>
                <button onClick={() => handleUnlike(shoe)}>Unlike</button>

              </div>

            </li>
          )))}
      </div>


    </>
  )

}

export default Wishlist