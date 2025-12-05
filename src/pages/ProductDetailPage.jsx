import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useFavorites } from '../context/FavoritesContext';

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-gray-600">Loading product…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-red-600" role="alert">{error}</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to catalog
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-gray-600">Product not found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to catalog
        </Link>
      </main>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline text-sm">
        ← Back to catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.brand}</p>
          
          <p className="text-3xl font-bold text-gray-900 mt-4">
            {formatPrice(product.price)}
          </p>

          <div className="flex items-center gap-3 mt-4">
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                product.inStock
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            
            <span className="text-sm text-gray-500">
              ★ {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-gray-700 mt-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => toggleFavorite(product.id)}
            className={`mt-8 px-6 py-3 rounded-lg font-medium transition-colors ${
              favorite
                ? 'bg-red-50 border border-red-300 text-red-600 hover:bg-red-100'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            aria-pressed={favorite}
          >
            {favorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
          </button>
        </div>
      </div>
    </main>
  );
}
