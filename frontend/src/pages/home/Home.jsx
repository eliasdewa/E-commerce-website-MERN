import Blogs from "../blogs/Blogs"
import TrendingProducts from "../products/TrendingProducts"
import Banner from "./Banner"
import Category from "./Category"
import DealSection from "./DealSection"
import HeroSection from "./HeroSection"
import PromoBanner from "./PromoBanner"

const Home = () => {
  return (
    <>
      <Banner />
      <Category />
      <HeroSection />
      <TrendingProducts />
      <DealSection />
      <PromoBanner />
      <Blogs />
    </>
  )
}
export default Home