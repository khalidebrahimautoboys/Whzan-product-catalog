const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export function SortSelect({ value, onChange }) {
  // Combine sort + order into single string for select value
  const currentValue = value.sort ? `${value.sort}-${value.order}` : '';

  const handleChange = (e) => {
    const val = e.target.value;
    if (!val) {
      onChange('', 'asc');
    } else {
      const [sort, order] = val.split('-');
      onChange(sort, order);
    }
  };

  return (
    <div>
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
        Sort by
      </label>
      <select
        id="sort"
        value={currentValue}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white
                   text-gray-900 text-sm focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
