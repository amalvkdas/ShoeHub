import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../Context';
import Navbar from './Navbar';
import './Logout.css'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const { setIsAdmin,setIsUser,setAddToCart,setLikeProducts} = useContext(MyContext);

    const nav = useNavigate()

    const handleLogout = () => {
        setIsAdmin(false);
        setIsUser(false);
        setAddToCart('')
        setLikeProducts('')
        nav("/")
        alert("You have successfully logged out")
    };

    return (
        <div>
            <Navbar />
            <div className="logoutWrapper">
                <div className="logoutContainer">
                    <p>Are you sure you want to logout?</p>
                    <div className="logoutBtns">
                        <button onClick={handleLogout}>Logout</button>
                        <Link to="/"><img src="home.png" alt="" /></Link>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default Logout;