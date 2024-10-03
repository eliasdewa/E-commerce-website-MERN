import { Link } from 'react-router-dom'
import bannerImage from '../../assets/header.png';
const Banner = () => {
  return (
    <div className='header__container'>
      {/* Content */}
      <div className='header__content z-30'>
        <h4>UP TO 20% DISCOUNT ON</h4>
        <h1>Girl's Fashion</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, eveniet accusantium laboriosam blanditiis repellat numquam libero nostrum. In, ad nulla.</p>
        <button className='btn'><Link to='/products'>Explore Now!</Link></button>
      </div>
      {/* Image */}
      <div className='header__image'>
        <img src={bannerImage} alt="banner image" />
      </div>
    </div>
  )
}
export default Banner