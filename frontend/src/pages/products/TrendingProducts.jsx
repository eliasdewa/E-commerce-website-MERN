import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../../data/data";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const handleShowMore = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };
  return (
    <section className="product__container mt-4 sm:mt-8">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident quae
        impedit soluta ducimus enim! Doloremque consequuntur ad id explicabo
        soluta.
      </p>
      {/* Product Cards */}
      <ProductCard products={products.slice(0, visibleProducts)} />
      {/* Show More Button */}
      <div className="text-center">
        {visibleProducts < products.length && (
          <button onClick={handleShowMore} className="btn mt-4">
            Show More
          </button>
        )}
      </div>
    </section>
  );
};
export default TrendingProducts;
