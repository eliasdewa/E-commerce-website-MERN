import { useState } from "react"
import { products } from "../../data/data";
import ProductCard from "../products/ProductCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const handleSearch = () => {
    const filtered = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    setFilteredProducts(filtered);
    // setSearchQuery('');
  }
  return (
    <>
      <section className="bg-primary-light p-8 my-8">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, ipsam!</p>
      </section>
      <section>
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search for products..." className="search-bar w-full max-w-4xl p-2 border rounded" />
          <button onClick={handleSearch} className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded">Search</button>
        </div>
        {/* Render filtered products */}
      <div className="section__container">
        <ProductCard products={filteredProducts}/>
      </div>
      </section>
    </>
  )
}
export default Search