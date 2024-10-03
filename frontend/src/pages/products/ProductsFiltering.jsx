const ProductsFiltering = ({
  filters,
  filterState,
  setFilterState,
  clearFilters,
}) => {
  return (
  <div className="space-y-5 flex-shrink-0">
    <h3>Filters</h3>
    {/* Category */}
    <div className="flex flex-col space-y-2">
      <h4 className="font-medium text-lg">Category</h4>
      <hr />
      {
        filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              checked={filterState.category === category}
              onChange={(e) => setFilterState({...filterState, category: e.target.value})}
              value={category}
            />
            <span className="ml-1">{category}</span>
          </label>
        ))
      }
    </div>
    {/* Colors */}
    <div className="flex flex-col space-y-2">
      <h4 className="font-medium text-lg">Colors</h4>
      <hr />
      {
        filters.colors.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              id="color"
              checked={filterState.color === color}
              onChange={(e) => setFilterState({...filterState, color: e.target.value})}
              value={color}
            />
            <span className="ml-1">{color}</span>
          </label>
        ))
      }
    </div>
    {/* Pricing */}
    <div className="flex flex-col space-y-2">
      <h4 className="font-medium text-lg">Price Ranges</h4>
      <hr />
      {
        filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filterState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) => setFilterState({...filterState, priceRange: e.target.value})}
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))
      }
    </div>
    {/* Clear Filters */}
    <div>
      <button onClick={clearFilters} className="w-full bg-primary text-white py-1 px-4">
        Clear Filters
      </button>
    </div>
  </div>
)};
export default ProductsFiltering;
