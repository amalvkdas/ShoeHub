import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { PopularBrandsShoes } from "./db/PopularBrandsShoes"
import { useState } from "react"
import { MyContext } from "./Context"
import { AllShoes as AllShoesInitial} from "./db/data"
import { Users } from "./db/Users"
import { Admins } from "./db/Admins"




import Home from "./components/Home"
import Women from "./components/Women"
import Men from "./components/Men"
import Kids from "./components/Kids"
import Signin from "./components/Signin"
import Wishlist from "./components/Wishlist"
import ShoppingBag from "./components/ShoppingBag"
import All from "./components/All"
import Register from './components/Register'
import AdminPanel from "./components/AdminPanel"
import Logout from "./components/Logout"
import ManageUsers from "./components/ManageUsers"
import ShoeProductPage from "./components/ShoeProductPage"
import ScrollToTop from "./components/ScrollToTop"
import UserProfile from "./components/UserProfile"
import AdminProfile from "./components/AdminProfile"


function App() {


  const [searchQuery, setSearchQuery] = useState('');
  const [user,setUser] = useState(Users)
  const [admin,setAdmin] = useState(Admins)
  const [isAdmin,setIsAdmin] = useState(false)
  const [isUser,setIsUser] = useState(false)

  const [allShoes, setAllShoes] = useState(AllShoesInitial);

  const [currentAccount,setCurrentAccount] = useState([])
  


  const [likeProducts,setLikeProducts] = useState([])
  const [addToCart,setAddToCart] = useState([])

  const [popularBrandsShoes, setPopularBrandsShoes] = useState(PopularBrandsShoes)



  const values = { popularBrandsShoes,setPopularBrandsShoes,allShoes,setAllShoes,likeProducts,setLikeProducts,addToCart,setAddToCart,searchQuery,setSearchQuery,user,setUser,admin,setAdmin,isAdmin,setIsAdmin,isUser,setIsUser,currentAccount,setCurrentAccount}


  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <ScrollToTop/>
        <Routes>
        <Route path="/product/:productId" element={<ShoeProductPage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/women" element={<Women />}></Route>
          <Route path="/men" element={<Men />}></Route>
          <Route path="/all" element={<All />}></Route>
          <Route path="/kids" element={<Kids />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/shoppingbag" element={<ShoppingBag />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/adminpanel" element={<AdminPanel/>}></Route>
          <Route path="/logout" element={<Logout/>}></Route>
          <Route path="/manageusers" element={<ManageUsers/>}></Route>
          <Route path="/product" element={<ShoeProductPage/>}></Route>
          <Route path="/userprofile" element={<UserProfile/>}></Route>
          <Route path="/adminprofile" element={<AdminProfile/>}></Route>
        </Routes>
        </MyContext.Provider>
    </BrowserRouter >
    </>
  )
}

export default App
