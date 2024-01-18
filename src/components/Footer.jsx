import "./Footer.css"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="foot1">
                    <div className="shopname">
                        <span>S</span>
                        <span>H</span>
                        <span>O</span>
                        <span>E</span>
                        <span>H</span>
                        <span>U</span>
                        <span>B</span>
                    </div>
                    <div className="shopdetails">
                        <div className="contactnum">+91 7558084519</div>
                        <div className="contactemail">amalvkdas@gmail.com</div>
                        <div className="chatinfo">Chat between 09-17 h</div>
                        <div className="storeloc">Store Location</div>
                    </div>
                </div>


                <div className="foot2">
                    <div className="shop">
                        <h3>SHOP</h3>
                        <Link to="/women">Women</Link>
                        <Link to="/men">Men</Link>
                        <Link to="/teen">Teen</Link>
                        <Link to="/kids">Kids</Link>
                    </div>
                    <div className="shop">
                        <h3>SUPPORT</h3>
                        <Link to="/women">Contact</Link>
                        <Link to="/men">FAQ</Link>
                        <Link to="/teen">Delivery</Link>
                        <Link to="/kids">Returns</Link>
                        <Link to="/kids">Payments</Link>
                        <Link to="/kids">Product Care</Link>
                    </div>
                    <div className="shop">
                        <h3>ABOUT US</h3>
                        <Link to="/women">About ShopHub</Link>
                        <Link to="/men">Production</Link>
                        <Link to="/teen">Careers</Link>
                        <Link to="/kids">Sustainability</Link>
                    </div>
                </div>


                <div className="foot3">
                    <center>ShopHub 2023 © All rights reserved</center>
                </div>
            </div>
        </>
    )
}

export default Footer