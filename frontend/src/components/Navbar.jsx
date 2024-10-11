import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CartModal from "../pages/products/CartModal";
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  // To Show number on cart
  const products = useSelector((state) => state.cart.products);
  // console.log(product)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  // show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  // dropdown menu
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  // admin dropdown menu
  const adminDropdownMenu = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Products", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-all-orders" },
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  // user dropdown menu
  const userDropdownMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];
  const dropdownMenu =
    user?.role === "admin" ? [...adminDropdownMenu] : [...userDropdownMenu];

  // handle logout
  // logout user
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();
      dispatch(logout());
      toast.success(response.message)
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.message)
    }
  };
  return (
    <header className="sticky top-0 z-30 bg-white">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">Ed-eCommerce</Link>
        </div>
        {/* Navigation Links */}
        <div>
          <ul className="nav__links">
            <li className="link">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="link">
              <NavLink to="/products">Products</NavLink>
            </li>
            <li className="link">
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li className="link">
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
        {/* nav Icon */}
        <div className="nav__icons relative">
          {/* search icon */}
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          {/* cart icon */}
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup
                className="text-sm inline-block px-1.5 text-white rounded-full
              bg-primary text-center"
              >
                {products.length}
              </sup>
            </button>
          </span>
          {/* user icon */}
          <span>
            {user && user ? (
              <>
                <img
                  src={user?.profileImage || avatarImg}
                  alt="profile image"
                  onClick={handleDropdownToggle}
                  className="size-6 object-cover rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenu.map((item, index) => (
                        <li key={index} className="link">
                          <Link
                            to={item.path}
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </span>
          {/* Toggle menu */}
          <span
            onClick={() => setShowMenu(!showMenu)}
            className="text-2xl md:hidden inline-flex items-center justify-center cursor-pointer text-[#000] hover:text-primary"
          >
            <i className="ri-menu-line"></i>
          </span>
        </div>
        {/* Toggle menu */}
        {showMenu && (
          <div className="md:hidden w-[50%] h-screen absolute top-0 -right-6 bg-slate-400 p-4">
            <div className="flex flex-col gap-8 py-4 relative">
              <ul className="flex flex-col gap-4 pt-3">
                <li className="link">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="link">
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li className="link">
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
                <li className="link">
                  <NavLink to="/about">About Us</NavLink>
                </li>
              </ul>
              <span
                onClick={() => setShowMenu(false)}
                className="absolute top-0 right-3 text-black text-2xl cursor-pointer hover:text-primary"
              >
                <i className="ri-close-line"></i>
              </span>
            </div>
          </div>
        )}
      </nav>
      {isCartOpen && (
        <CartModal
          products={products}
          isCartOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};
export default Navbar;
