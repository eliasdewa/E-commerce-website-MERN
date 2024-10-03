import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/data";
import ProductCard from "../products/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // console.log(categoryName);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    // Fetch products based on category
    const filteredProducts = products.filter(product => product.category === categoryName.toLowerCase());
    // Set filteredProducts state with filtered products
    setFilteredProducts(filteredProducts);
  }, [categoryName]);
  // To load from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="bg-primary-light p-8 mt-8 mb-12">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, ipsam!</p>
      </section>
      {/* Render filtered products */}
      <div className="section__container">
        <ProductCard products={filteredProducts}/>
      </div>
    </>
  )
}
export default CategoryPage