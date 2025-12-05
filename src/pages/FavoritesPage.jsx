import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { fetchProductById } from '../api/products';
import { ProductGrid } from '../components';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadFavorites() {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          favorites.map((id) => fetchProductById(id).catch(() => null))
        );
        
        if (!cancelled) {
          // Filter out any failed fetches
          setProducts(results.filter(Boolean));
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load favorites');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [favorites]);

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Favorites</h1>

      {loading && (
        <p className="text-gray-600">Loading favorites…</p>
      )}

      {error && (
        <p className="text-red-600" role="alert">{error}</p>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't saved any favorites yet.</p>
          <Link 
            to="/" 
            className="text-blue-600 hover:underline"
          >
            Browse products →
          </Link>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductGrid products={products} />
      )}
    </main>
  );
}
