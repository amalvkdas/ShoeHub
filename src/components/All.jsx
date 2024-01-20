import Navbar from "./Navbar"
import { useContext } from "react"
import { useState ,useEffect } from "react"
import { MyContext } from "../Context"
import './All.css'
import Footer from "./Footer"
import { Link ,useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom'





const All = () => {




  const { allShoes, likeProducts, setLikeProducts, addToCart, setAddToCart, setSearchQuery,isAdmin,isUser } = useContext(MyContext)

  const [filteredProducts, setFilteredProducts] = useState(allShoes)

  const [selectedBrand, setSelectedBrand] = useState("");
  const location = useLocation();

  const nav = useNavigate()

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


  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = allShoes.filter((product) => {
      const { title, company, category } = product
      return (
        (selectedBrand === "" || company.toLowerCase() === selectedBrand) &&
        (title.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          category.toLowerCase().includes(query.toLowerCase()))
      )
    })
    setFilteredProducts(filteredResults)

  };


  const handleBrands = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setFilteredProducts(allShoes.filter((shoe) => shoe.company.toLowerCase() === brand))
  };



  const distinctBrands = [...new Set(allShoes.map((item) => item.company.toLowerCase()))]







  const [sortOption, setSortOption] = useState("");

  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...filteredProducts];

    switch (option) {
      case "name":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.newPrice - a.newPrice);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };






  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brandParam = params.get('brand');
    if (brandParam) {
      setFilteredProducts(allShoes.filter((shoe) => shoe.company.toLowerCase() === brandParam));
    } else {
      setFilteredProducts(allShoes);
    }
  }, [allShoes, location.search]);




  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="filter-section">
        <div className="recommended">
          <h2>Recommended</h2>
          <br />

          <button onClick={() => setFilteredProducts(allShoes)}>All Products</button>

          {distinctBrands.map((brand, i) =>
            <button value={brand} key={i} onClick={handleBrands}>{brand}</button>
          )}


        </div>



        <div className="sortby">
          <label htmlFor="sortDropdown">Sort by:</label>
          <select
            id="sortDropdown"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>




      </div>


      <div className="container">
        {filteredProducts.map((shoe, index) => (

          <li key={index}>

            <div className="wrapper">
            <Link to={`/all/${shoe.id}`} style={{textDecoration:"none",color:"black"}}>
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

export default All