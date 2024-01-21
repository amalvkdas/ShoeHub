import Navbar from "./Navbar"
import { useContext } from "react"
import { useState } from "react"
import { MyContext } from "../Context"
import './All.css'
import Footer from "./Footer"
import { useEffect } from "react"
import './AdminPanel.css'
import { Link } from "react-router-dom"


const All = () => {

  const { allShoes, setAllShoes, setSearchQuery } = useContext(MyContext)

  const [filteredProducts, setFilteredProducts] = useState(allShoes)

  const [selectedBrand, setSelectedBrand] = useState("");



  const [newShoe, setNewShoe] = useState({
    img: "",
    title: "",
    gender: "",
    prevPrice: "",
    newPrice: "",
    company: "",
    color: "",
    category: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShoe((prevShoe) => ({
      ...prevShoe,
      [name]: value,
    }));
  };


  useEffect(() => {
    setFilteredProducts(allShoes);
  }, [allShoes]);




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




  const handleRemoveShoe = (index) => {
    const updatedShoes = allShoes.filter((_, shoeIndex) => shoeIndex !== index);
    setAllShoes(updatedShoes);
  };

  const handleEditShoe = (index) => {
    setEditIndex(index);
    setNewShoe(allShoes[index]);
  };

  const handleAddShoe = () => {
    if (Object.values(newShoe).every((value) => value !== "")) {
      if (editIndex !== null) {
        const updatedShoes = allShoes.map((shoe, index) =>
          index === editIndex ? newShoe : shoe
        );
        setAllShoes(updatedShoes);
        setEditIndex(null);
      } else {
        const newId = allShoes.length > 0 ? Number(allShoes[allShoes.length - 1].id) + 1 : 1;
        const shoeWithId = { ...newShoe, id: newId };
        setAllShoes((prevShoes) => [...prevShoes, shoeWithId]);
      }
      setNewShoe({
        img: "",
        title: "",
        gender: "",
        prevPrice: "",
        newPrice: "",
        company: "",
        color: "",
        category: "",
      });
    } else {
      alert("Please fill in all fields before adding or editing a shoe.");
    }
  };



  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="addProduct">
        <div className="addproductTitle">
          <h1>Add/Edit Products:</h1>
          <Link to="/manageusers">Manage Users</Link>
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <label>
                  Image URL:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="img"
                  value={newShoe.img}
                  onChange={handleInputChange}
                />
              </td>
              <th>
                <label>
                  Title:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="title"
                  value={newShoe.title}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>
                  Gender:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="gender"
                  value={newShoe.gender}
                  onChange={handleInputChange}
                />
              </td>

              <th>
                <label>
                  Previous Price:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="prevPrice"
                  value={newShoe.prevPrice}
                  onChange={handleInputChange}
                />
              </td>


            </tr>

            <tr>
              <th>
                <label>
                  New Price:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="newPrice"
                  value={newShoe.newPrice}
                  onChange={handleInputChange}
                />
              </td>
              <th>
                <label>
                  Company:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="company"
                  value={newShoe.company}
                  onChange={handleInputChange}
                />
              </td>



            </tr>
            <tr>
              <th>
                <label>
                  Color:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="color"
                  value={newShoe.color}
                  onChange={handleInputChange}
                />
              </td>

              <th>
                <label>
                  Category:
                </label>
              </th>
              <td>
                <input
                  type="text"
                  name="category"
                  value={newShoe.category}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
          </tbody>

        </table>
        <div className="addProductBtn">
          <button type="button" onClick={handleAddShoe}>
            {editIndex !== null ? "Edit Shoe" : "Add New Shoe"}
          </button>
        </div>
      </div>



      <div className="filter-section">
        <div className="recommended">
          <h2>Recommended</h2>
          <br />

          <button onClick={() => setFilteredProducts(allShoes)}>All Products</button>

          {distinctBrands.map((brand, i) =>
            <button value={brand} key={i} onClick={handleBrands}>{brand}</button>
          )}


        </div>

      </div>

      <div className="container">
        {filteredProducts.map((shoe, index) => (

          <li key={index}>

            <div className="wrapper">
              <div className="wrapper-img">
                <img src={shoe.img} alt="img" />
              </div>
              <div className="text">
                <p>{shoe.title}</p>
                <p>{shoe.company}</p>
                <p>{shoe.category}</p>
                <p>{shoe.newPrice}</p>
              </div>
              <div className="editRemovebtns">
                <button type="button" onClick={() => handleEditShoe(index)} className="btn1">
                  Edit
                </button>
                <button type="button" onClick={() => handleRemoveShoe(index)} className="btn2">
                  Remove
                </button>
              </div>

            </div>

          </li>
        ))}
      </div>

      <Footer />




    </>

  )
}

export default All