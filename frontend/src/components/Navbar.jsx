import { useState } from "react"
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  // To Show number on cart
  const product = useSelector(state => state.cart.products)
  // console.log(product)

  return (
    <header>
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">
            Ed-eCommerce
          </Link>
        </div>
        {/* Navigation Links */}
        <div>
          <ul className="nav__links">
            <li className="link"><NavLink to="/">Home</NavLink></li>
            <li className="link"><NavLink to="/products">Products</NavLink></li>
            <li className="link"><NavLink to="/contact">Contact Us</NavLink></li>
            <li className="link"><NavLink to="/about">About Us</NavLink></li>
          </ul>
        </div>
        {/* nav Icon */}
        <div className="nav__icons relative">
          {/* search icon */}
          <span>
            <Link to='/search'>
              <i className="ri-search-line"></i>
            </Link>
          </span>
          {/* cart icon */}
          <span>
            <button className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full
              bg-primary text-center">{product.length}</sup>
            </button>
          </span>
          {/* user icon */}
          <span>
            <Link to='/login'>
              <i className="ri-user-line"></i>
            </Link>
          </span>
          {/* Toggle menu */}
					<span
						onClick={() => setShowMenu(!showMenu)}
						className='text-2xl md:hidden inline-flex items-center justify-center cursor-pointer text-[#000] hover:text-primary'
					>
						<i className="ri-menu-line"></i>
					</span>
        </div>
        {/* Toggle menu */}
        {showMenu && (
          <div className='md:hidden w-[50%] h-screen absolute top-0 right-0 bg-slate-400 p-4'>
            <div className='flex flex-col gap-8 py-4 relative'>
              <ul className='flex flex-col gap-4 pt-3'>
                <li className="link"><NavLink to="/">Home</NavLink></li>
                <li className="link"><NavLink to="/products">Products</NavLink></li>
                <li className="link"><NavLink to="/contact">Contact Us</NavLink></li>
                <li className="link"><NavLink to="/about">About Us</NavLink></li>
              </ul>
              <span
                onClick={() => setShowMenu(false)}
                className='absolute top-0 right-3 text-black text-2xl cursor-pointer hover:text-primary'
              >
                <i className="ri-close-line"></i>
              </span>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
export default Navbar