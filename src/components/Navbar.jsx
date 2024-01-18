import { Link } from 'react-router-dom'
import './Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { MyContext } from '../Context'
import ShoeProductPage from './ShoeProductPage'




const Navbar = ({ onSearch }) => {
    const nav = useNavigate()

    const { isAdmin, isUser } = useContext(MyContext)


    const { pathname } = useLocation();


    const handleInputChange = (e) => {
        const query = e.target.value;
        onSearch(query);
    };


    const shouldRenderSearchInput =
        pathname !== '/register' &&
        pathname !== '/signin' &&
        !pathname.startsWith('/product') &&
        pathname !== '/' &&
        pathname !== '/userprofile';


    return (
        <div className="navbar">
            <div className="links">
                <Link to="/all">All</Link>
                <Link to="/women">Women</Link>
                <Link to="/men">Men</Link>
                <Link to="/kids">Kids</Link>
                {isAdmin && pathname === '/' && <Link to="/adminpanel">AdminPanel</Link>}
            </div>
            <div className="logo" onClick={() => nav("/")}>
                SHOEHUB
            </div>
            <div className="nav-end">
                {shouldRenderSearchInput && <div className="search">
                    <input type="text" className='searchbox' placeholder='Search for a brand,a model...' onChange={handleInputChange} />
                    <img src="/search.png" alt="" />
                </div>}
                <div className="signin">
                    <Link to="/signin"><img src="/user.png" alt="" /></Link>
                </div>
                <div className="wishlist">
                    <Link to="/wishlist"><img src="/wishlist.png" alt="" /></Link>
                </div>
                <div className="cart">
                    <Link to="/shoppingbag"><img src="/shopping-bag.png" alt="" /></Link>
                </div>
                {
                    <div className="logout">
                        {(isUser) &&
                            <>
                                <div className="loginaccount">
                                    <Link to="/userprofile"><img src="/loginaccount.png" alt="" /></Link>
                                </div>
                                <Link to="/logout"><img src="/logout.png" alt="" /></Link>
                            </>


                        }
                        {(isAdmin) &&
                            <>
                                <div className="loginaccount">
                                    <Link to="/adminprofile"><img src="/loginaccount.png" alt="" /></Link>
                                </div>
                                <Link to="/logout"><img src="/logout.png" alt="" /></Link>
                            </>


                        }
                    </div>
                }

            </div>

        </div>
    )
}

export default Navbar