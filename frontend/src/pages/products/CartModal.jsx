import { useDispatch } from "react-redux";
import OrderSummary from "./OrderSummary";
import {
  removeCartProduct,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";

const CartModal = ({ products, isCartOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };
  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeCartProduct({ id }));
  };
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${
        isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-white overflow-y-auto transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94",
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              onClick={() => onClose()}
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="ri-close-large-fill p-1 text-white bg-black"></i>
            </button>
          </div>
          {/* Cart details */}
          <div className="cart-items">
            {products.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flow-root md:items-center md:justify-between shadow-lg p-2 md:p-5 mb-4"
                >
                  <div className="flex items-center">
                    {/* Number of product - 01, 02 */}
                    <span className="mr-4 px-1 bg-primary text-white rounded-md">
                      0{index + 1}
                    </span>
                    {/* Product image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-12 object-cover mr-4"
                    />
                    {/* Product price */}
                    <div>
                      <h5 className="text-lg font-medium">{item.name}</h5>
                      <p className="text-gray-600 text-sm">
                        ${Number(item.price.toFixed(2))}
                      </p>
                    </div>
                    {/* Product quantity - incr or decr */}
                    <div className="flex justify-end md:justify-start items-center mt-2">
                      {/* Decrease quantity */}
                      <button
                        onClick={() => handleQuantity("decrement", item._id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8"
                      >
                        -
                      </button>
                      {/* Quantity value */}
                      <span className="px-2 text-center mx-1">
                        {item.quantity}
                      </span>
                      {/* Increase quantity */}
                      <button
                        onClick={() => handleQuantity("increment", item._id)}
                        className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                      >
                        +
                      </button>
                      {/* Remove product */}
                      <div className="ml-5">
                        <button onClick={(e) => handleRemove(e, item._id)}>
                          <i className="ri-delete-bin-line ri-xl hover:text-primary"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Total amount */}
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};
export default CartModal;
