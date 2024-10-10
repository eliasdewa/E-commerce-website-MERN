import { useEffect, useState } from "react";
// import { products } from "../../data/data";
import ProductCard from "./ProductCard";
import ProductsFiltering from "./ProductsFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { current } from "@reduxjs/toolkit";

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
  const { data, error, isLoading } = useFetchAllProductsQuery();
  // console.log(data);
  const products = data?.products || [];

  const [productsData, setProductsData] = useState(products);
  // console.log(productsData)
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // Apply filter function
  const applyFilter = () => {
    let filteredProducts = products;
    // Apply category filter
    if (filterState.category && filterState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filterState.category
      );
    }
    // Apply color filter
    if (filterState.color && filterState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filterState.color
      );
    }
    // Apply price range filter
    if (filterState.priceRange) {
      const [minPrice, maxPrice] = filterState.priceRange
        .split("-")
        .map(Number);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
    setProductsData(filteredProducts);
    setCurrentPage(1);
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

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination functionality
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

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
              Showing: {currentItems.length} out of {products.length} products
            </h3>
            <ProductCard products={currentItems} />
            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              {/* Previous */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>
              {/* number */}
              {Array.from({
                length: Math.ceil(productsData.length / itemsPerPage),
              }).map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => paginate(idx + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === idx + 1
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {/* Next */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === currentItems.length}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Products;
