import DeliveryBar from './DeliveryBar'
import Navbar from './Navbar'
import Hero from './Hero'
import PopularBrands from './PopularBrands'
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs'


const Home = () => {

  return (
    <>
      <DeliveryBar />
      <Navbar />
      <Breadcrumbs/>
      <Hero />
      <PopularBrands />
      <Footer />
    </>
  )
}

export default Home