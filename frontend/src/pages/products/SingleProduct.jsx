import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";

const SingleProduct = () => {
  return (
    <>
      <section className="bg-primary-light p-8 mt-8 mb-12">
        <h2 className="section__header capitalize">Single Product</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/products">products</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">product name</span>
        </div>
      </section>
      <section className="section__content mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* product image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="product image"
              className="h-auto w-full object-cover"
            />
          </div>
          {/* Product details */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Product Name</h3>
            <p className="text-xl text-primary mb-4">
              $100 <s>$150</s>
            </p>
            <p className="text-gray-400 mb-4">Product description</p>
            {/* Additional Product info */}
            <div>
              <p>
                <strong>Category:</strong> accessories
              </p>
              <p>
                <strong>Color:</strong> beige
              </p>
              <div className="flex items-center gap-1">
                <strong>Rating:</strong>
                <RatingStars rating={"5"} />
              </div>
            </div>
            {/* Add to cart button */}
            <div className="mt-2">
              <button className="bg-primary mt-6 px-6 py-3 text-white rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Product Reviews */}
      <section className="section__content">
        review
      </section>
    </>
  );
};
export default SingleProduct;
