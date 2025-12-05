import { ProductCard } from './ProductCard';

export function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div 
      className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      role="list"
      aria-label="Products"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
