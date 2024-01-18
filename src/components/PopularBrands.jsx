import './PopularBrands.css'
import { useContext } from 'react'
import { MyContext } from '../Context'
import { Link } from 'react-router-dom'


const PopularBrands = () => {


    const { popularBrandsShoes } = useContext(MyContext)


    return (
        <>
            <div className="title">
                <h1>ALL POPULAR BRANDS</h1>
                <div className="line"></div>
            </div>




            <div className="container1">
                {popularBrandsShoes.map((shoe, index) => (
                    <li key={index}>

                        <div className="wrapper1">
                                <img src={shoe.image} alt="img" />
                                <div className="text">
                                    <p className='brandName'>{shoe.brand.toUpperCase()}</p>
                                    <p className='brandDescription'>{shoe.description}</p>
                                </div>
                                <button><Link to={`/all?brand=${shoe.brand.toLowerCase()}`} style={{ textDecoration: "none", color: "white" }}>View all</Link></button>
                            </div>
                    </li>
                ))}
            </div>







        </>

    )
}

export default PopularBrands