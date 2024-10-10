import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // console.log(categoryName);

  const { data, error, isLoading } = useFetchAllProductsQuery();
  // console.log(data);
  const products = data?.products || [];

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    // Fetch products based on category
    const filteredProducts = products.filter(product => product.category === categoryName.toLowerCase());
    // Set filteredProducts state with filtered products
    setFilteredProducts(filteredProducts);
  }, [categoryName]);
  
  if (error) return <p>Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

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