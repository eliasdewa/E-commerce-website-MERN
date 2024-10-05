import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../../redux/features/cart/cartSlice";

const OrderSummary = () => {
  const products = useSelector((store) => store.cart.products);

  const { selectedItems, totalPrice, tax, taxRate, grandTotalPrice } = useSelector(store => store.cart);
  // handle clear Cart
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  }
  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p className="text-text-dark mt-2">Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>Tax ({taxRate * 100}%): ${tax.toFixed(2)}</p>
        <h3 className="font-bold">Grand Total Price: ${grandTotalPrice.toFixed(2)}</h3>
        <div className="flex justify-between mb-6">
          {/* Proceed button */}
          <button className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md">Proceed To Checkout </button>
          {/* Clear Cart button */}
          <button onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }} className="bg-red-600 px-3 py-1.5 text-white mt-2 rounded-md">Clear Cart</button>
        </div>
      </div>
    </div>
  )
}
export default OrderSummary