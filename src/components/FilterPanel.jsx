const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

export function FilterPanel({ category, inStock, onCategoryChange, onStockChange }) {
  return (
    <div className="flex flex-wrap gap-4">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white
                     text-gray-900 text-sm focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
          Availability
        </label>
        <select
          id="stock"
          value={inStock}
          onChange={(e) => onStockChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white
                     text-gray-900 text-sm focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>
    </div>
  );
}
