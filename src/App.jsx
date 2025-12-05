import { useState } from 'react'
import { Header, SearchBar, FilterPanel, SortSelect, ProductCard, ProductGrid } from './components'

// Mock product for testing
const MOCK_PRODUCT = {
  id: 'test_001',
  name: 'Wireless Bluetooth Headphones',
  description: 'Premium over-ear headphones with noise cancellation.',
  price: 129.99,
  currency: 'USD',
  rating: 4.6,
  reviewCount: 287,
  category: 'Electronics',
  tags: ['audio', 'wireless'],
  inStock: true,
  imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  brand: 'SoundMax',
}

const MOCK_PRODUCTS = [
  MOCK_PRODUCT,
  { ...MOCK_PRODUCT, id: 'test_002', name: 'Running Shoes Pro', inStock: false, price: 149.99, rating: 4.2 },
  { ...MOCK_PRODUCT, id: 'test_003', name: 'Organic Cotton T-Shirt', price: 29.99, rating: 4.8 },
  { ...MOCK_PRODUCT, id: 'test_004', name: 'Yoga Mat Premium', price: 45.99, rating: 4.5 },
]

/**
 * TEMPORARY: Visual test page for components
 * Delete this and replace with real routing once testing is done.
 * See notes/component-testing.md
 */
function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [inStock, setInStock] = useState('')
  const [sort, setSort] = useState({ sort: '', order: 'asc' })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Component Test Page</h2>
          <p className="text-gray-600 text-sm mb-6">
            Temporary page to visually test components. Will be replaced with real routing.
          </p>
          
          {/* Search */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">SearchBar</h3>
            <div className="max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <p className="text-xs text-gray-500 mt-1">Current value: "{search}"</p>
          </div>
          
          {/* Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">FilterPanel + SortSelect</h3>
            <div className="flex flex-wrap gap-4">
              <FilterPanel 
                category={category} 
                inStock={inStock}
                onCategoryChange={setCategory}
                onStockChange={setInStock}
              />
              <SortSelect 
                value={sort} 
                onChange={(s, o) => setSort({ sort: s, order: o })} 
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Category: "{category}" | Stock: "{inStock}" | Sort: "{sort.sort}" ({sort.order})
            </p>
          </div>
        </section>
        
        {/* Single Card */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">ProductCard (single)</h3>
          <div className="max-w-xs">
            <ProductCard product={MOCK_PRODUCT} />
          </div>
        </section>
        
        {/* Grid */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">ProductGrid (responsive - resize window)</h3>
          <ProductGrid products={MOCK_PRODUCTS} />
        </section>
      </main>
    </div>
  )
}

export default App
