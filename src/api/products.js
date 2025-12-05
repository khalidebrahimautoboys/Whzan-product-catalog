const API_BASE = '/api';

/**
 * Wrapper for fetch that throws on non-OK responses
 */
async function fetchJson(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Fetch products with optional filters, sorting, and pagination
 * 
 * @param {Object} options
 * @param {string} options.search - Text search query
 * @param {string} options.category - Filter by category
 * @param {string} options.inStock - Filter by stock ('true'/'false'/'')
 * @param {string} options.sort - Sort field (price, rating, name)
 * @param {string} options.order - Sort order (asc/desc)
 * @param {number} options.page - Page number (1-indexed)
 * @param {number} options.limit - Items per page
 * @returns {Promise<{products: Array, total: number, page: number, totalPages: number}>}
 */
export async function fetchProducts({
  search = '',
  category = '',
  inStock = '',
  sort = '',
  order = 'asc',
  page = 1,
  limit = 12
} = {}) {
  const params = new URLSearchParams();
  
  // json-server uses 'q' for full-text search
  if (search) params.set('q', search);
  if (category) params.set('category', category);
  if (inStock === 'true') params.set('inStock', 'true');
  if (inStock === 'false') params.set('inStock', 'false');
  
  // json-server sorting
  if (sort) {
    params.set('_sort', sort);
    params.set('_order', order);
  }
  
  // json-server pagination
  params.set('_page', page.toString());
  params.set('_limit', limit.toString());
  
  const url = `${API_BASE}/products?${params}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }
  
  const products = await response.json();
  
  // json-server returns total count in X-Total-Count header
  const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  
  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

/**
 * Fetch a single product by ID
 * 
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function fetchProductById(id) {
  return fetchJson(`${API_BASE}/products/${id}`);
}

/**
 * Fetch all unique categories from products
 * 
 * @returns {Promise<string[]>} Sorted array of category names
 */
export async function fetchCategories() {
  const products = await fetchJson(`${API_BASE}/products`);
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
}
