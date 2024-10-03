import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";

const ProductCard = ({ products }) => {
  // console.log(products)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
      {products.map((product) => (
        <div key={product._id} className="product__card">
          <div className="relative">
            {/* product image */}
            <Link to={`/products/${product._id}`}>
              <img src={product.image} alt={product.name} className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300" />
            </Link>
            {/* cart icon */}
            <div className="hover:block absolute top-3 right-3">
              <button>
                <i className="ri-shopping-cart-2-line bg-primary/70 p-1.5 text-white rounded-full hover:bg-primary-dark"></i>
              </button>
            </div>
            {/* description */}
            <div className="product__card__content">
              <h4>{product.name}</h4>
              <p>${product.price} {product?.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>
              <RatingStars rating={product.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductCard;
