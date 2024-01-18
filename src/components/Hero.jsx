import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {

  const nav =useNavigate()

  return (
    <>
    <div className="hero">
    <div className="discount-text">
      <h1>50% OFF</h1><br />
      <h1>Everything</h1>
      <div className="sale-title">
        <h4>NEWYEAR SALE</h4>
        <button onClick={()=>nav('/all')}><h3>SHOP NOW </h3></button>
      </div>

    </div>
    <img src="/hero_img.webp" alt="img" />
  </div>
</>
  )
}

export default Hero