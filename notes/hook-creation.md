# Step 3: Custom Hooks

## What we're building
Two hooks:
1. `useDebounce` - delays value updates (for search input)
2. `useProducts` - fetches products with loading/error states

## useDebounce

Need this because typing in search fires onChange on every keystroke. Without debounce, we'd hit the API 10+ times just typing "headphones". 

Debounce waits until user stops typing (300ms default), then updates.

```
user types: h-e-a-d → wait 300ms → fire API with "head"
```

Super simple hook - just useState + useEffect with a timeout.

## useProducts

Wraps our `fetchProducts` API call with:
- loading state (show spinner)
- error state (show error message)
- cancellation (if params change mid-request, ignore stale response)

The cancellation bit is important - without it:
1. User searches "head"
2. Request fires
3. User changes to "phone" 
4. New request fires
5. If "head" response comes back AFTER "phone" response, we'd show wrong results

React 18 way: use a `cancelled` flag in useEffect cleanup.

## Files to create
- `src/hooks/useDebounce.js`
- `src/hooks/useProducts.js`
