import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductById } from '../api/products';

/**
 * Hook for fetching paginated product list
 * @param {Object} params - Same params as fetchProducts
 * @returns {{ products: Array, total: number, totalPages: number, loading: boolean, error: string|null }}
 */
export function useProducts(params) {
  const [data, setData] = useState({ products: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchProducts(params);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load products');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [
    params.search,
    params.category,
    params.inStock,
    params.sort,
    params.order,
    params.page,
    params.limit
  ]);

  return { ...data, loading, error };
}

/**
 * Hook for fetching a single product
 * @param {string} id - Product ID
 * @returns {{ product: Object|null, loading: boolean, error: string|null }}
 */
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchProductById(id);
        if (!cancelled) {
          setProduct(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load product');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}
