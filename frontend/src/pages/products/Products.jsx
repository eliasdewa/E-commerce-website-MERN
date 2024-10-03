import { useEffect, useState } from "react";
import { products } from "../../data/data";
import ProductCard from "./ProductCard";
import ProductsFiltering from "./ProductsFiltering";

const filters = {
  categories: ["all", "accessories", "dress", "jewellers", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50-$100", min: 50, max: 100 },
    { label: "$100-$200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};
const Products = () => {
  const [productsData, setProductsData] = useState(products);
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });
  // Apply filter function
  const applyFilter = () => {
    let filteredProducts = products;
    // Apply category filter
    if (filterState.category && filterState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        product => product.category === filterState.category
      );
    }
    // Apply color filter
    if (filterState.color && filterState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        product => product.color === filterState.color
      );
    }
    // Apply price range filter
    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter((product) =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }
    setProductsData(filteredProducts);
  };

  useEffect(() => {
    applyFilter();
  }, [filterState]);
  // Clear filters
  const clearFilters = () => {
    setFilterState({
      category: "all",
      colors: "all",
      pricesRange: "all",
    });
  };

  return (
    <>
      <section className="bg-primary-light p-8 mt-8 mb-12">
        <h2 className="section__header capitalize">Products</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae,
          ipsam!
        </p>
      </section>
      <section>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left side - Filtering option */}
          <ProductsFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFilters}
          />
          {/* Right side - Products display */}
          <div>
            <h3 className="text-xl font-medium mb-4">
              Available Products: {productsData.length}
            </h3>
            <ProductCard products={productsData} />
          </div>
        </div>
      </section>
    </>
  );
};
export default Products;
