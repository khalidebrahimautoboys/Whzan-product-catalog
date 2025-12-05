import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { SearchBar, FilterPanel, SortSelect, ProductGrid, LoadingSkeleton } from '../components';

/**
 * Custom hook to sync filter state with URL params
 */
function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current values from URL
  const filters = {
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    inStock: searchParams.get('inStock') || '',
    sort: searchParams.get('_sort') || '',
    order: searchParams.get('_order') || 'asc',
    page: parseInt(searchParams.get('_page') || '1', 10),
  };

  // Update URL when filters change
  const setFilters = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      // Map our keys to URL param names
      const paramKey = key === 'search' ? 'q' : 
                       key === 'sort' ? '_sort' :
                       key === 'order' ? '_order' :
                       key === 'page' ? '_page' : key;
      
      if (value === '' || value === null || value === undefined) {
        newParams.delete(paramKey);
      } else {
        newParams.set(paramKey, String(value));
      }
    });
    
    setSearchParams(newParams, { replace: true });
  };

  return [filters, setFilters];
}

export default function CatalogPage() {
  const [filters, setFilters] = useUrlFilters();
  const debouncedSearch = useDebounce(filters.search, 300);

  const { products, total, totalPages, loading, error } = useProducts({
    search: debouncedSearch,
    category: filters.category,
    inStock: filters.inStock,
    sort: filters.sort,
    order: filters.order,
    page: filters.page,
    limit: 12,
  });

  // Update handlers - reset to page 1 when filters change
  const setSearch = (value) => setFilters({ search: value, page: 1 });
  const setCategory = (value) => setFilters({ category: value, page: 1 });
  const setInStock = (value) => setFilters({ inStock: value, page: 1 });
  const setSort = (sort, order) => setFilters({ sort, order, page: 1 });
  const setPage = (page) => setFilters({ page });

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Catalog</h1>

      {/* Filters */}
      <section aria-label="Filters" className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1 max-w-md">
            <SearchBar value={filters.search} onChange={setSearch} />
          </div>
          <FilterPanel 
            category={filters.category}
            inStock={filters.inStock}
            onCategoryChange={setCategory}
            onStockChange={setInStock}
          />
          <SortSelect 
            value={{ sort: filters.sort, order: filters.order }} 
            onChange={setSort} 
          />
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" aria-busy={loading}>
        {loading && <LoadingSkeleton count={12} />}
        
        {error && (
          <div className="text-center py-12 text-red-600" role="alert">
            {error}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <ProductGrid products={products} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-600">
                  Page {filters.page} of {totalPages} ({total} products)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(filters.page - 1)}
                    disabled={filters.page <= 1}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg 
                             hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(filters.page + 1)}
                    disabled={filters.page >= totalPages}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg 
                             hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}
